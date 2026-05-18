# E-Commerce Frontend

A modern, responsive e-commerce frontend built with React, Vite, and Tailwind CSS.

## Features

- 🛍️ Product browsing and search
- 🛒 Shopping cart functionality
- 🔐 User authentication (login/register)
- 📦 Order management and tracking
- 💳 Checkout process
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🎨 Beautiful UI with Tailwind CSS

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **React Router 7** - Routing
- **Axios** - HTTP client
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js 22+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd E_Commerce

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build locally
npm run preview
```

### Linting

```bash
# Check for linting errors
npm run lint
```

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# API endpoint for backend
VITE_API_URL=http://localhost:3000
```

See `.env.example` for all available variables.

## Project Structure

```
src/
├── Components/        # Reusable components
├── Pages/            # Page components
│   ├── home/        # Home page
│   ├── auth/        # Login/Register
│   ├── checkout/    # Checkout flow
│   ├── orders/      # Orders page
│   └── TrackingPage # Order tracking
├── contexts/        # React contexts (Auth)
├── utils/           # Utility functions
├── api.jsx          # Axios configuration
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

## API Integration

The frontend communicates with the backend API. Key endpoints:

- `GET /api/products` - Fetch products
- `GET /api/cart-items` - Get cart items
- `POST /api/cart-items` - Add to cart
- `GET /api/orders` - Fetch user orders
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

See the backend documentation for full API details.

## Performance Optimization

- Lazy loading routes with React Router
- Code splitting with dynamic imports
- Minified CSS and JavaScript in production
- Optimized images
- Efficient state management with React Context

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
