# Comprehensive Analytics Dashboard

A modern, responsive analytics dashboard built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- Real-time data visualization
- Drag-and-drop widget customization
- Responsive design
- Dark/Light mode
- Performance optimized
- Accessibility compliant
- Comprehensive testing

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React DnD
- Recharts
- Jest & React Testing Library
- Cypress

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and add your API keys:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
   NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
   NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_alphavantage_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── features/           # Feature-based modules
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── store/              # Redux store
│   ├── styles/             # Global styles
│   └── types/              # TypeScript types
├── public/                 # Static assets
├── tests/                  # Test files
└── cypress/               # E2E tests
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Testing

- Unit tests: `npm run test`
- E2E tests: `npm run test:e2e`
- Component tests: `npm run test:components`

## Performance Optimization

- Image optimization with Next.js
- Code splitting
- Lazy loading
- Memoization
- Bundle analysis

## Accessibility

- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
