# 📊 Interactive Chart App


A modern, interactive SVG-based chart web application built with D3.js. Create beautiful, responsive charts with real-time data manipulation and customization options.

## ✨ Features

- **Multiple Chart Types**: Line, Bar, Scatter, Area, and Pie charts
- **Interactive Elements**: Hover tooltips, clickable data points, and responsive design
- **Real-time Data Manipulation**: Add data points, randomize data, and configure data ranges
- **Customizable Styling**: Color schemes, stroke widths, and point sizes
- **Modern UI**: Beautiful gradient design with glassmorphism effects
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the files locally, navigate to the project directory
   cd /path/to/chart-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 📋 Usage

### Chart Controls

- **Chart Type Selector**: Switch between different chart types (Line, Bar, Scatter, Area, Pie)
- **Add Data Point**: Dynamically add new data points to the chart
- **Randomize Data**: Generate new random data for the current chart

### Data Configuration

- **Number of Points**: Set how many data points to generate (1-50)
- **Min/Max Values**: Configure the range for random data generation
- **Update Chart**: Apply new data configuration

### Styling Options

- **Color Scheme**: Choose from different D3 color palettes
- **Stroke Width**: Adjust line thickness (1-10)
- **Point Size**: Modify scatter plot point sizes (2-20)

### Interactive Features

- **Hover Tooltips**: See detailed information when hovering over data points
- **Responsive Charts**: Charts automatically resize and adapt to different screen sizes
- **Smooth Animations**: All interactions include smooth transitions and animations

## 🛠️ Technical Details

### Built With
- **D3.js**: Powerful data visualization library for SVG-based charts
- **Vite**: Fast build tool and development server
- **Modern CSS**: CSS Grid, Flexbox, and advanced styling techniques
- **ES6 Modules**: Modern JavaScript with import/export syntax

### Chart Types

1. **Line Chart**: Smooth curved lines connecting data points
2. **Bar Chart**: Vertical bars with customizable colors
3. **Scatter Plot**: Individual data points with hover interactions
4. **Area Chart**: Filled area under the line with transparency
5. **Pie Chart**: Circular chart with labels and hover effects

### File Structure
```
chart-app/
├── index.html          # Main HTML file
├── style.css           # Modern CSS styles
├── main.js             # D3.js chart implementation
├── package.json        # Project dependencies
└── README.md           # This file
```

## 🎨 Customization

### Adding New Chart Types
To add a new chart type:

1. Add the option to the HTML select element
2. Create a new method in the `InteractiveChart` class (e.g., `createNewChartType`)
3. Add the case to the switch statement in `createChart()`

### Styling Customization
The CSS uses CSS custom properties and modern features:
- Glassmorphism effects with `backdrop-filter`
- Smooth animations with `transition`
- Responsive design with CSS Grid and Flexbox

### Data Format
The application expects data in this format:
```javascript
{
  x: number,      // X-axis value
  y: number,      // Y-axis value
  label: string   // Display label
}
```

## 🌟 Advanced Features

### Responsive Design
- Charts automatically resize based on container size
- Mobile-friendly interface with touch interactions
- Adaptive layout for different screen sizes

### Performance Optimizations
- Efficient D3.js rendering with proper data binding
- Smooth animations without performance impact
- Optimized SVG generation

### Accessibility
- Keyboard navigation support
- Screen reader friendly tooltips
- High contrast color schemes

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Development Tips
- Use browser dev tools to inspect SVG elements
- Modify CSS variables for quick styling changes
- Check console for any D3.js warnings or errors

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Feel free to enhance the application by:
- Adding new chart types
- Improving the UI/UX
- Adding more interactive features
- Optimizing performance

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy creating beautiful, interactive charts! 🎉**
