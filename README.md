# OBS Overlay Widget

A collection of highly customizable widgets for OBS Studio streaming and recording, built with Vue 3, TypeScript, and Vite.

## Features

- **Time and Date Display**: Customizable formats for showing current time and date
- **Text Display**: Show fixed text or API-returned content with custom styling
- **Image Display**: Display local or remote images with customization options
- **Split View Interface**: Configuration panel on the left, real-time preview on the right
- **Transparent Background**: All widgets have transparent backgrounds suitable for OBS overlay
- **URL Generation**: Automatically generates sharable URLs with encoded configuration
- **Pure Preview Mode**: Open generated URLs to display only the widget with transparent background

## Widget Types

1. **Clock Widget**: Display current time with customizable format, style, and effects
2. **Date Widget**: Show current date with customizable format, style, and effects
3. **Text Widget**: Display text with customizable styles including gradients, shadows, and fonts
4. **Image Widget**: Show images with customizable size, effects, and positioning

## Usage

1. Select a widget type from the dropdown
2. Configure the widget using the control panel on the left
3. See real-time preview on the right
4. Copy the generated URL to use in OBS Studio as a Browser Source

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

If you encounter TypeScript errors related to undefined properties, make sure that:

1. All widget components handle possible undefined configuration properties
2. Default values are provided for all configuration options
3. Use proper null checking (e.g., `props.config.property || defaultValue`)

## Integration with OBS Studio

1. Run this application on a web server or locally
2. Configure your widget using the configuration interface
3. Copy the generated URL
4. In OBS Studio:
   - Add a "Browser Source" to your scene
   - Paste the URL into the Browser Source URL field
   - Set width and height according to your needs
   - Check "Shutdown source when not visible" for better performance
