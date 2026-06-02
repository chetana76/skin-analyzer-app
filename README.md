# 🔍 Skin Analyzer App

A modern web application for analyzing skin health using advanced computer vision and machine learning techniques. Built with **React** and **Vite** for optimal performance and user experience.

## Features

- 📸 **Image Upload & Analysis** - Upload skin images for instant analysis
- 🤖 **AI-Powered Detection** - Machine learning models for skin condition recognition
- 📊 **Detailed Reports** - Comprehensive analysis results with visualizations
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Vite-powered development with instant HMR
- 🎨 **Modern UI** - Clean and intuitive user interface

## Tech Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: CSS/Tailwind CSS
- **Package Manager**: npm
- **Linting**: ESLint
- **Node Version**: 18+

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chetana76/skin-analyzer-app.git
   cd skin-analyzer-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env with your configuration
   ```

## Development

### Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

## Project Structure

```
skin-analyzer-app/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── assets/         # Images and static assets
│   ├── styles/         # Global and component styles
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── public/             # Public assets
├── dist/               # Production build output
├── .env                # Environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML template
└── README.md           # This file
```

## Usage

1. **Upload an Image**
   - Click the upload button or drag & drop a skin image
   - Supported formats: JPG, PNG, WebP

2. **View Analysis Results**
   - Wait for the AI model to process the image
   - Review detailed analysis and recommendations

3. **Download Report**
   - Export results as PDF or image
   - Share with healthcare professionals

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Configuration

### ESLint Configuration

The project uses ESLint for code quality. To customize rules, edit `eslint.config.js`

### Vite Configuration

For custom Vite settings, modify `vite.config.js`

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Skin Analyzer
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting for optimal bundle size
- Image optimization and lazy loading
- CSS-in-JS optimization
- React development tools for profiling

## Troubleshooting

### Build Issues

If you encounter build errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use

Change the dev port in `vite.config.js`:

```javascript
export default {
  server: {
    port: 3000
  }
}
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/chetana76/skin-analyzer-app/issues)
- Email: chetanabailur@example.com

## Changelog

### Version 1.0.0
- Initial release with core analysis features
- React + Vite setup
- Basic UI/UX implementation

## Author

**Chetan A Bailur**
- GitHub: [@chetana76](https://github.com/chetana76)

## Acknowledgments

- React and Vite communities
- ESLint team for code quality tools
- Contributors and testers
