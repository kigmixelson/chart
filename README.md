
# SAYMON Metrics Chart Application

A web-based chart application for visualizing metrics data from the SAYMON monitoring system.

## Features

- **Real-time Data Fetching**: Connects to the SAYMON API to fetch actual metrics data
- **Interactive Charts**: Line and bar chart visualizations using D3.js
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
- **Downsample**: Data aggregation interval (e.g., `5m-avg`, `1h-avg`)

### Example Configuration

```
Object ID: 67cb1f1f120ab073c5adb8a2
Auth Token: 285c4fd9-6335-41eb-b516-189eb7482d19
From: 1756497678991
To: 1756592718991
Metrics: ifHCInOctets,ifHCOutOctets
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

## Usage

1. **Test API Connection**: Click "Test API Connection" to verify your settings
2. **Load Data**: Click "Load Metrics Data" to fetch and display the chart
3. **Switch Chart Types**: Use the dropdown to switch between line and bar charts
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
├── index.html          # Main HTML file
├── main.js            # Chart application logic
├── style.css          # Main stylesheet
├── package.json       # Dependencies and scripts
└── vite.config.js     # Vite configuration
```

### Key Dependencies

- **D3.js**: Chart visualization library
- **Vite**: Build tool and development server

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

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
