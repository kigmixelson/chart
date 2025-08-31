// Import CSS for Vite build process
import './style.css';
import './index-Qi_VvB8y.css';

// D3.js is loaded via CDN in index.html
// import * as d3 from 'd3';

class SaymonMetricsChart {
    constructor() {
        this.data = [];
        this.currentChartType = 'line';
        this.margin = { top: 40, right: 40, bottom: 60, left: 60 };
        this.width = 800;
        this.height = 500;
        this.color = d3.scaleOrdinal(d3.schemeCategory10);
        this.strokeWidth = 2;
        this.pointSize = 6;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateApiUrl();
        this.generateSampleData();
        this.createChart();
    }

    generateSampleData() {
        // Generate sample data for demonstration
        this.data = [];
        const fromTime = parseInt(document.getElementById('fromTimestamp').value);
        const toTime = parseInt(document.getElementById('toTimestamp').value);
        const metrics = document.getElementById('metrics').value.split(',').map(m => m.trim());
        
        const timeStep = (toTime - fromTime) / 20; // 20 data points
        
        for (let i = 0; i < 20; i++) {
            const timestamp = fromTime + (i * timeStep);
            const dataPoint = {
                timestamp: timestamp,
                time: new Date(timestamp)
            };
            
            metrics.forEach((metric, index) => {
                dataPoint[metric] = Math.random() * 1000 + 100; // Random values
            });
            
            this.data.push(dataPoint);
        }
    }

    setupEventListeners() {
        // Load data button
        d3.select('#loadData').on('click', () => {
            this.loadMetricsData();
        });

        // Test API button
        d3.select('#testApi').on('click', () => {
            this.testApiConnection();
        });

        // Chart type selector
        d3.select('#chartType').on('change', (event) => {
            this.currentChartType = event.target.value;
            this.createChart();
        });

        // Time range selector
        d3.select('#timeRange').on('change', (event) => {
            this.updateTimeRange(event.target.value);
        });

        // Update API URL when inputs change
        ['objectId', 'fromTimestamp', 'toTimestamp', 'downsample', 'metrics', 'authToken'].forEach(id => {
            d3.select(`#${id}`).on('input', () => {
                this.updateApiUrl();
            });
        });
    }

    updateTimeRange(range) {
        const now = Date.now();
        let fromTime, toTime = now;

        switch (range) {
            case '1h':
                fromTime = now - (60 * 60 * 1000); // 1 hour ago
                break;
            case '1d':
                fromTime = now - (24 * 60 * 60 * 1000); // 1 day ago
                break;
            case '1w':
                fromTime = now - (7 * 24 * 60 * 60 * 1000); // 1 week ago
                break;
            case '1m':
                fromTime = now - (30 * 24 * 60 * 60 * 1000); // 1 month ago
                break;
            case 'custom':
            default:
                return; // Don't change timestamps for custom
        }

        document.getElementById('fromTimestamp').value = fromTime;
        document.getElementById('toTimestamp').value = toTime;
        this.updateApiUrl();
    }

    updateApiUrl() {
        const objectId = document.getElementById('objectId').value;
        const fromTime = document.getElementById('fromTimestamp').value;
        const toTime = document.getElementById('toTimestamp').value;
        const downsample = document.getElementById('downsample').value;
        const metrics = document.getElementById('metrics').value.split(',').map(m => m.trim());
        const authToken = document.getElementById('authToken').value;
        
        const metricsParams = metrics.map(metric => `metrics%5B%5D=${encodeURIComponent(metric)}`).join('&');
        const apiUrl = `https://bccdemo.cpult.ru/node/api/objects/${objectId}/history?from=${fromTime}&to=${toTime}&downsample=${downsample}&${metricsParams}&auth-token=${authToken}`;
        
        document.getElementById('apiUrl').innerHTML = `<code>${apiUrl}</code>`;
    }

    async loadMetricsData() {
        const objectId = document.getElementById('objectId').value;
        const fromTime = document.getElementById('fromTimestamp').value;
        const toTime = document.getElementById('toTimestamp').value;
        const downsample = document.getElementById('downsample').value;
        const metrics = document.getElementById('metrics').value.split(',').map(m => m.trim());
        const authToken = document.getElementById('authToken').value;
        
        if (!objectId || !fromTime || !toTime || !downsample || metrics.length === 0) {
            alert('Please fill in all required fields');
            return;
        }

        if (!authToken) {
            alert('Please enter the authentication token');
            return;
        }

        const metricsParams = metrics.map(metric => `metrics%5B%5D=${encodeURIComponent(metric)}`).join('&');
        const apiUrl = `https://bccdemo.cpult.ru/node/api/objects/${objectId}/history?from=${fromTime}&to=${toTime}&downsample=${downsample}&${metricsParams}&auth-token=${authToken}`;
        
        try {
            console.log('Loading data from:', apiUrl);
            
            // Show loading indicator
            const loadButton = document.getElementById('loadData');
            const originalText = loadButton.textContent;
            loadButton.textContent = 'Loading...';
            loadButton.disabled = true;
            
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const rawData = await response.json();
            console.log('Raw API response:', rawData);
            
            // Transform the data to the expected format
            this.data = this.transformApiData(rawData);
            console.log('Transformed data:', this.data);
            
            this.createChart();
        } catch (error) {
            console.error('Error loading metrics data:', error);
            alert(`Error loading metrics data: ${error.message}. Check console for details.`);
        } finally {
            // Restore button
            const loadButton = document.getElementById('loadData');
            loadButton.textContent = originalText;
            loadButton.disabled = false;
        }
    }

    transformApiData(rawData) {
        const transformedData = [];
        
        if (!Array.isArray(rawData) || rawData.length === 0) {
            console.warn('No data received from API');
            return [];
        }
        
        // Get all unique timestamps from all metrics
        const allTimestamps = new Set();
        rawData.forEach(metricData => {
            if (metricData.dps && Array.isArray(metricData.dps)) {
                metricData.dps.forEach(([timestamp]) => {
                    allTimestamps.add(timestamp);
                });
            }
        });
        
        // Sort timestamps
        const sortedTimestamps = Array.from(allTimestamps).sort((a, b) => a - b);
        
        // Create data points for each timestamp
        sortedTimestamps.forEach(timestamp => {
            const dataPoint = {
                timestamp: timestamp,
                time: new Date(timestamp)
            };
            
            // Add values for each metric
            rawData.forEach(metricData => {
                const metricName = metricData.metric;
                const dpsEntry = metricData.dps.find(([ts]) => ts === timestamp);
                if (dpsEntry) {
                    dataPoint[metricName] = dpsEntry[1];
                }
            });
            
            transformedData.push(dataPoint);
        });
        
        // Display data summary
        console.log(`Transformed ${transformedData.length} data points`);
        if (transformedData.length > 0) {
            console.log('Sample data point:', transformedData[0]);
            console.log('Available metrics:', Object.keys(transformedData[0]).filter(key => key !== 'timestamp' && key !== 'time'));
        }
        
        return transformedData;
    }

    async testApiConnection() {
        const objectId = document.getElementById('objectId').value;
        const fromTime = document.getElementById('fromTimestamp').value;
        const toTime = document.getElementById('toTimestamp').value;
        const downsample = document.getElementById('downsample').value;
        const metrics = document.getElementById('metrics').value.split(',').map(m => m.trim());
        const authToken = document.getElementById('authToken').value;
        
        if (!objectId || !fromTime || !toTime || !downsample || metrics.length === 0 || !authToken) {
            alert('Please fill in all required fields');
            return;
        }

        const metricsParams = metrics.map(metric => `metrics%5B%5D=${encodeURIComponent(metric)}`).join('&');
        const apiUrl = `https://bccdemo.cpult.ru/node/api/objects/${objectId}/history?from=${fromTime}&to=${toTime}&downsample=${downsample}&${metricsParams}&auth-token=${authToken}`;
        
        try {
            console.log('Testing API connection to:', apiUrl);
            
            const testButton = document.getElementById('testApi');
            const originalText = testButton.textContent;
            testButton.textContent = 'Testing...';
            testButton.disabled = true;
            
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const rawData = await response.json();
            console.log('Raw API response:', rawData);
            
            // Display response info
            const responseInfo = {
                status: response.status,
                statusText: response.statusText,
                dataType: Array.isArray(rawData) ? 'Array' : typeof rawData,
                dataLength: Array.isArray(rawData) ? rawData.length : 'N/A',
                sampleData: Array.isArray(rawData) && rawData.length > 0 ? rawData[0] : rawData
            };
            
            console.log('Response info:', responseInfo);
            alert(`API Test Successful!\nStatus: ${responseInfo.status}\nData Type: ${responseInfo.dataType}\nData Length: ${responseInfo.dataLength}\n\nCheck console for detailed response.`);
            
        } catch (error) {
            console.error('API Test Error:', error);
            alert(`API Test Failed: ${error.message}\n\nThis might be due to CORS restrictions. Check console for details.`);
        } finally {
            const testButton = document.getElementById('testApi');
            testButton.textContent = originalText;
            testButton.disabled = false;
        }
    }

    createChart() {
        const chartContainer = d3.select('#chart');
        chartContainer.html('');

        const svg = chartContainer
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', `0 0 ${this.width} ${this.height}`);

        const chartGroup = svg.append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        const chartWidth = this.width - this.margin.left - this.margin.right;
        const chartHeight = this.height - this.margin.top - this.margin.bottom;

        switch (this.currentChartType) {
            case 'line':
                this.createLineChart(chartGroup, chartWidth, chartHeight);
                break;
            case 'bar':
                this.createBarChart(chartGroup, chartWidth, chartHeight);
                break;
        }

        this.createLegend();
    }

    createLineChart(chartGroup, width, height) {
        const metrics = document.getElementById('metrics').value.split(',').map(m => m.trim());
        
        const xScale = d3.scaleTime()
            .domain(d3.extent(this.data, d => d.time))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => Math.max(...metrics.map(m => d[m] || 0)))])
            .range([height, 0]);

        // Add axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        chartGroup.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);

        chartGroup.append('g')
            .attr('class', 'axis')
            .call(yAxis);

        // Add grid
        chartGroup.append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(''));

        chartGroup.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(''));

        // Create lines for each metric
        metrics.forEach((metric, index) => {
            const line = d3.line()
                .x(d => xScale(d.time))
                .y(d => yScale(d[metric] || 0))
                .curve(d3.curveMonotoneX);

            // Add line path
            chartGroup.append('path')
                .datum(this.data)
                .attr('class', 'line-path')
                .attr('fill', 'none')
                .attr('stroke', this.color(index))
                .attr('stroke-width', this.strokeWidth)
                .attr('d', line);

            // Add data points
            chartGroup.selectAll(`.data-point-${index}`)
                .data(this.data)
                .enter()
                .append('circle')
                .attr('class', `data-point data-point-${index}`)
                .attr('cx', d => xScale(d.time))
                .attr('cy', d => yScale(d[metric] || 0))
                .attr('r', this.pointSize)
                .attr('fill', this.color(index))
                .attr('stroke', 'white')
                .attr('stroke-width', 2)
                .on('mouseover', (event, d) => this.showTooltip(event, d, metric))
                .on('mouseout', () => this.hideTooltip());
        });
    }

    createBarChart(chartGroup, width, height) {
        const metrics = document.getElementById('metrics').value.split(',').map(m => m.trim());
        
        const xScale = d3.scaleBand()
            .domain(this.data.map((d, i) => i))
            .range([0, width])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => Math.max(...metrics.map(m => d[m] || 0)))])
            .range([height, 0]);

        // Add axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        chartGroup.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);

        chartGroup.append('g')
            .attr('class', 'axis')
            .call(yAxis);

        // Add grid
        chartGroup.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(''));

        // Add bars for each metric
        metrics.forEach((metric, metricIndex) => {
            chartGroup.selectAll(`.bar-${metricIndex}`)
                .data(this.data)
                .enter()
                .append('rect')
                .attr('class', `bar bar-${metricIndex}`)
                .attr('x', (d, i) => xScale(i) + (xScale.bandwidth() / metrics.length) * metricIndex)
                .attr('y', d => yScale(d[metric] || 0))
                .attr('width', xScale.bandwidth() / metrics.length)
                .attr('height', d => height - yScale(d[metric] || 0))
                .attr('fill', this.color(metricIndex))
                .on('mouseover', (event, d) => this.showTooltip(event, d, metric))
                .on('mouseout', () => this.hideTooltip());
        });
    }

    showTooltip(event, data, metric) {
        const tooltip = d3.select('#tooltip');
        
        tooltip
            .style('opacity', 1)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
            .html(`
                <strong>${metric}</strong><br>
                Time: ${data.time.toLocaleString()}<br>
                Value: ${(data[metric] || 0).toFixed(2)}
            `);
    }

    hideTooltip() {
        d3.select('#tooltip').style('opacity', 0);
    }

    createLegend() {
        const legend = d3.select('#legend');
        legend.html('');

        const metrics = document.getElementById('metrics').value.split(',').map(m => m.trim());
        
        metrics.forEach((metric, index) => {
            legend.append('div')
                .attr('class', 'legend-item')
                .html(`
                    <div class="legend-color" style="background-color: ${this.color(index)}"></div>
                    <span>${metric}</span>
                `);
        });
    }
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    try {
        new SaymonMetricsChart();
    } catch (error) {
        console.error('Error initializing chart:', error);
        // Fallback initialization
        setTimeout(() => {
            try {
                console.log('Retrying chart initialization...');
                new SaymonMetricsChart();
            } catch (retryError) {
                console.error('Retry failed:', retryError);
            }
        }, 1000);
    }
});

// Additional fallback for when DOMContentLoaded might have already fired
if (document.readyState === 'loading') {
    // Document still loading
    console.log('Document still loading, waiting for DOMContentLoaded');
} else {
    // Document already loaded
    console.log('Document already loaded, initializing immediately');
    try {
        new SaymonMetricsChart();
    } catch (error) {
        console.error('Immediate initialization failed:', error);
    }
}
