# Social Media Sentiment Analysis for Product Feedback

A modern web application for analyzing customer sentiment from social media and product reviews. Extract insights from feedback data, track sentiment trends, and identify key problem areas to improve product decisions.

## Features

- **Sentiment Analysis** - Analyze sentiment from customer reviews and social media feedback
- **CSV Data Upload** - Easily import feedback data from CSV files
- **Visual Analytics** - Interactive charts and dashboards for sentiment insights
- **Weekly Trends** - Track sentiment changes over time with trend analysis
- **Problem Identification** - Automatically identify and categorize common issues from feedback
- **Report Export** - Generate and export analysis reports
- **User Authentication** - Secure login and role-based access (Admin & User roles)
- **Admin Dashboard** - Comprehensive administration panel for system management

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Package Manager**: Bun

## Getting Started

### Prerequisites
- Node.js 16+ or Bun installed
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gagan1dev/social-media-sentiment-analysis-for-product-feedback-.git
cd vibe-analyzer-20-main
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run build:dev` - Build in development mode
- `bun run lint` - Run ESLint checks
- `bun run preview` - Preview production build locally

## Project Structure

```
src/
├── components/     # React components (Charts, Upload, Analysis, etc.)
├── pages/         # Page components (Dashboard, Admin, Login, etc.)
├── auth/          # Authentication logic and protected routes
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
└── lib/           # Utility functions
```

## Authentication

The application includes:
- **Login System** - User and admin authentication
- **Role-based Access** - Different permissions for users and admins
- **Protected Routes** - Secure pages requiring authentication

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature suggestions.

## License

This project is open source and available under the MIT License.

## Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[Setup Guide](docs/SETUP.md)** - Installation and configuration
- **[Architecture](docs/ARCHITECTURE.md)** - Project structure and design patterns
- **[Features](docs/FEATURES.md)** - Detailed feature documentation
- **[API Reference](docs/API_REFERENCE.md)** - Component and API documentation
- **[Contributing](docs/CONTRIBUTING.md)** - How to contribute to the project

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
