
# SAYMON Metrics Chart Application

A web-based chart application for visualizing metrics data from the SAYMON monitoring system.

## Features

- **Real-time Data Fetching**: Connects to the SAYMON API to fetch actual metrics data
- **Interactive Charts**: Line, bar, and dots chart visualizations using D3.js
- **Configurable Parameters**: Customize object ID, time range, metrics, and downsample settings
- **Authentication**: Secure API access using authentication tokens
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:5173`

## Configuration

### Required Parameters

- **Object ID**: The SAYMON object identifier (e.g., `67cb1f1f120ab073c5adb8a2`)
- **Authentication Token**: Your SAYMON API authentication token
- **Time Range**: From and to timestamps in milliseconds
- **Metrics**: Comma-separated list of metrics to fetch (e.g., `ifHCInOctets,ifHCOutOctets`)
  - **Standard format**: `metricName` (uses default object ID)
  - **Object-specific format**: `{{objectId:metricName}}` (uses specified object ID)
- **Downsample**: Data aggregation interval (e.g., `5m-avg`, `1h-avg`)

### Metric Parameter Formats

The application supports two formats for specifying metrics:

#### Standard Format
```
Metrics: ifHCInOctets,ifHCOutOctets
```
- Uses the default object ID from the Object ID field
- All metrics are fetched from the same object

#### Object-Specific Format
```
Metrics: {{67cb1f1f120ab073c5adb8a2:ifHCInOctets}},{{67d6b40c120ab073c5ae9a2b:upper_bound==freeMemory}}
```
- Each metric can specify its own object ID
- Format: `{{objectId:metricName}}`
- Allows fetching metrics from multiple objects in a single chart

### Example Configuration

```
Object ID: 67cb1f1f120ab073c5adb8a2
Auth Token: 285c4fd9-6335-41eb-b516-189eb7482d19
From: 1756497678991
To: 1756592718991
Metrics: ifHCInOctets,ifHCOutOctets
Downsample: 5m-avg
```

#### Multi-Object Example
```
Object ID: 67cb1f1f120ab073c5adb8a2 (default)
Auth Token: 285c4fd9-6335-41eb-b516-189eb7482d19
From: 1756497678991
To: 1756592718991
Metrics: {{67cb1f1f120ab073c5adb8a2:ifHCInOctets}},{{67d6b40c120ab073c5ae9a2b:upper_bound==freeMemory}}
Downsample: 5m-avg
```

## API Endpoint

The application connects to the SAYMON API endpoint:
```
https://bccdemo.cpult.ru/node/api/objects/{objectId}/history
```

### Query Parameters

- `from`: Start timestamp (milliseconds)
- `to`: End timestamp (milliseconds)
- `downsample`: Aggregation interval
- `metrics[]`: Array of metric names
- `auth-token`: Authentication token

## Chart Types

The application supports three different chart types:

### Line Chart
- **Best for**: Time series data with trends and patterns
- **Features**: Connected data points with smooth curves
- **Use case**: Network traffic, system performance over time

### Bar Chart  
- **Best for**: Comparing values across time periods
- **Features**: Vertical bars for each data point
- **Use case**: Daily/weekly summaries, comparative analysis

### Dots Chart (Scatter Plot)
- **Best for**: Individual data points and correlation analysis
- **Features**: Scatter plot with individual data points
- **Use case**: Spot analysis, outlier detection, data distribution

## Usage

1. **Test API Connection**: Click "Test API Connection" to verify your settings
2. **Load Data**: Click "Load Metrics Data" to fetch and display the chart
3. **Switch Chart Types**: Use the dropdown to switch between line, bar, and dots charts
4. **Adjust Time Range**: Use the time range selector for quick time period changes

## Troubleshooting

### CORS Issues

If you encounter CORS errors, you may need to:
- Use a CORS proxy
- Run the application from a server that allows cross-origin requests
- Contact your SAYMON administrator to enable CORS for your domain

### Authentication Errors

- Verify your authentication token is correct
- Ensure the token has permission to access the specified object
- Check if the token has expired

### Data Issues

- Verify the object ID exists in your SAYMON system
- Check that the specified metrics are available for the object
- Ensure the time range contains data

## Development

### Project Structure

```
chart/
├── index.html          # Main application with full UI
├── widget.html         # Embeddable widget version
├── standalone.html     # Standalone version with API testing
├── main.js            # Chart application logic (for build)
├── style.css          # Main stylesheet
├── index-Qi_VvB8y.css # Additional stylesheet for compatibility
├── build.js           # Build entry point for CSS processing
├── package.json       # Dependencies and scripts
├── vite.config.js     # Vite configuration
└── dist/              # Built files (created after build)
    ├── index.html
    ├── widget.html
    ├── standalone.html
    └── style.css
```

### Key Dependencies

- **D3.js**: Chart visualization library
- **Vite**: Build tool and development server

### Building for Production

#### Option 1: Using Vite (requires Node.js)
```bash
npm install
npm run build
```

#### Option 2: Simple Build (no Node.js required)
```bash
./build.sh
```

Both methods will create a `dist/` directory with all the necessary files:
- `index.html` - Main application
- `widget.html` - Embeddable widget
- `standalone.html` - Standalone version
- All CSS and JavaScript files
- Documentation files

## Application Versions

The project includes three different versions of the chart application:

### Main Application (`index.html`)
- **Full UI**: Complete interface with configuration panels
- **Interactive Controls**: Time range selector, chart type switcher
- **Real-time Updates**: API URL generation and data loading
- **Best for**: Development, testing, and full-featured usage

### Widget (`widget.html`)
- **Embeddable**: Designed for embedding in other applications
- **URL Parameters**: Configure via URL parameters
- **Auto-reload**: Automatic data refresh based on time period
- **Best for**: Dashboard integration, monitoring displays

### Standalone (`standalone.html`)
- **API Testing**: Built-in API connection testing
- **Authentication**: Full authentication token support
- **CORS Handling**: Built-in CORS error handling
- **Best for**: Standalone usage, API debugging

### Widget Usage Examples

The widget can be embedded using URL parameters:

```html
<!-- Line chart for last day -->
<iframe src="widget.html?objectId=67cb1f1f120ab073c5adb8a2&metrics=ifHCInOctets,ifHCOutOctets&chartType=line&period=day"></iframe>

<!-- Bar chart for last week -->
<iframe src="widget.html?objectId=67cb1f1f120ab073c5adb8a2&metrics=ifHCInOctets,ifHCOutOctets&chartType=bar&period=week"></iframe>

<!-- Dots chart for last hour -->
<iframe src="widget.html?objectId=67cb1f1f120ab073c5adb8a2&metrics=ifHCInOctets,ifHCOutOctets&chartType=dots&period=hour"></iframe>

<!-- Multi-object chart with different metrics from different objects -->
<iframe src="widget.html?objectId=67cb1f1f120ab073c5adb8a2&metrics={{67cb1f1f120ab073c5adb8a2:ifHCInOctets}},{{67d6b40c120ab073c5ae9a2b:upper_bound==freeMemory}}&chartType=line&period=day"></iframe>
```

#### Widget Parameters

- `objectId`: SAYMON object identifier (default for metrics without object ID)
- `metrics`: Comma-separated metric names
  - Standard format: `metricName` (uses default object ID)
  - Object-specific format: `{{objectId:metricName}}` (uses specified object ID)
- `chartType`: `line`, `bar`, or `dots`
- `period`: `hour`, `day`, `week`, or `month`
- `authToken`: Authentication token (optional)
- `width`: Widget width in pixels (optional)
- `height`: Widget height in pixels (optional)
- `name`: Custom chart title (optional)

## API Response Format

The SAYMON API returns data in the following format:

```json
[
  {
    "metric": "ifHCInOctets",
    "tags": {"entity": "obj67cb1f1f120ab073c5adb8a2"},
    "aggregateTags": [],
    "dps": [
      [1756497900000, 3.309192823E9],
      [1756498200000, 3.309554845E9]
    ]
  }
]
```

The application transforms this data into a format suitable for D3.js visualization.

## License

MIT License - see LICENSE file for details.
