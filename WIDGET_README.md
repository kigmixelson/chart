# SAYMON Metrics Widget

A lightweight, embeddable widget for displaying SAYMON metrics charts. The widget gets all configuration from URL parameters and automatically loads and displays the chart without any user interface controls.

## Usage

Simply open `widget.html` with URL parameters to configure the chart:

```
widget.html?objectId=67cb1f1f120ab073c5adb8a2&from=1756497678991&to=1756592718991&metrics=ifHCInOctets,ifHCOutOctets
```

## URL Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `objectId` | No | `67cb1f1f120ab073c5adb8a2` | SAYMON object ID |
| `from` | No | `1756497678991` | Start timestamp (milliseconds) |
| `to` | No | `1756592718991` | End timestamp (milliseconds) |
| `metrics` | No | `ifHCInOctets,ifHCOutOctets` | Comma-separated list of metrics |
| `authToken` | No | None | Authentication token (optional when embedded in authorized page) |
| `downsample` | No | `5m-avg` | Data aggregation interval |
| `chartType` | No | `line` | Chart type (`line` or `bar`) |
| `width` | No | `window.innerWidth` | Widget width in pixels |
| `height` | No | `window.innerHeight` | Widget height in pixels |

## Examples

### Basic Line Chart
```
widget.html?objectId=67cb1f1f120ab073c5adb8a2&metrics=ifHCInOctets,ifHCOutOctets
```

### Bar Chart with Custom Time Range
```
widget.html?objectId=67cb1f1f120ab073c5adb8a2&from=1756497678991&to=1756592718991&chartType=bar&downsample=1h-avg
```

### Custom Size Widget
```
widget.html?objectId=67cb1f1f120ab073c5adb8a2&width=800&height=400&metrics=ifHCInOctets
```

### Multiple Metrics
```
widget.html?objectId=67cb1f1f120ab073c5adb8a2&metrics=ifHCInOctets,ifHCOutOctets,ifInErrors,ifOutErrors
```

## Embedding

### As an iframe
```html
<iframe src="widget.html?objectId=67cb1f1f120ab073c5adb8a2&width=800&height=400" 
        width="800" height="400" 
        frameborder="0">
</iframe>
```

### As a div with JavaScript
```html
<div id="chart-widget"></div>
<script>
    const iframe = document.createElement('iframe');
    iframe.src = 'widget.html?objectId=67cb1f1f120ab073c5adb8a2&width=800&height=400';
    iframe.width = '800';
    iframe.height = '400';
    iframe.frameBorder = '0';
    document.getElementById('chart-widget').appendChild(iframe);
</script>
```

## Features

- **Automatic Loading**: No user interaction required
- **Responsive Design**: Adapts to container size
- **Interactive Tooltips**: Hover for detailed information
- **Legend**: Shows metric names and colors
- **Error Handling**: Displays error messages if data loading fails
- **Clean Design**: Minimal UI, focused on data visualization

## Chart Types

### Line Chart (default)
- Smooth curved lines connecting data points
- Interactive data points on hover
- Grid lines for better readability

### Bar Chart
- Vertical bars for each time period
- Multiple metrics shown as grouped bars
- Hover effects for detailed values

## API Integration

The widget connects to the SAYMON API endpoint:
```
https://bccdemo.cpult.ru/node/api/objects/{objectId}/history
```

### Query Parameters Sent to API
- `from`: Start timestamp
- `to`: End timestamp  
- `downsample`: Aggregation interval
- `metrics[]`: Array of metric names
- `auth-token`: Authentication token (if provided)

## Error Handling

The widget handles various error scenarios:
- **Network Errors**: Displays connection error messages
- **API Errors**: Shows HTTP status and error details
- **No Data**: Displays "No data available" message
- **Invalid Parameters**: Uses default values for missing parameters

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Authentication Scenarios

### Scenario 1: Standalone Widget with Token
When using the widget independently, provide the auth token:
```
widget.html?objectId=67cb1f1f120ab073c5adb8a2&authToken=your-token-here
```

### Scenario 2: Embedded in Authorized Page
When embedding in a page that already handles authentication, omit the auth token:
```
widget.html?objectId=67cb1f1f120ab073c5adb8a2
```
The parent application should handle authentication (cookies, headers, etc.)

## CORS Considerations

If you encounter CORS errors when embedding the widget:
1. Host the widget on the same domain as the parent page
2. Use a CORS proxy for the API calls
3. Configure the SAYMON server to allow cross-origin requests

## Customization

The widget uses CSS custom properties that can be overridden:

```css
/* Custom colors */
:root {
    --chart-background: rgba(255, 255, 255, 0.95);
    --chart-border-radius: 8px;
    --chart-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
```

## Security Notes

- The authentication token is optional and only sent if provided in URL
- When embedded in an authorized page, authentication can be handled by the parent application
- Consider using server-side proxy for sensitive tokens
- Validate all URL parameters on the server side
- Use HTTPS for production deployments
