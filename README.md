# Restaurant Management Dashboard

A modern, full-featured restaurant management system built with Next.js, TypeScript, and React. This dashboard helps manage orders, inventory, and analytics for restaurant operations.

## Features

- **Authentication System** - Secure login and registration for users
- **Order Management** - Create, view, and manage restaurant orders
- **Inventory Tracking** - Monitor stock levels and receive low-stock alerts
- **Analytics Dashboard** - View revenue charts and top-selling items
- **Admin Panel** - Administrative controls and system management
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Project Structure

```
frontend/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication routes group
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # Dashboard routes group
│   │   ├── admin/                # Admin page
│   │   ├── analytics/            # Analytics dashboard
│   │   ├── inventory/            # Inventory management
│   │   ├── orders/               # Orders management
│   │   │   ├── new/              # Create new order
│   │   │   └── [id]/             # Order details
│   │   └── layout.tsx            # Dashboard layout
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── analytics/
│   │   ├── RevenueChart.tsx      # Revenue visualization
│   │   ├── StatsCard.tsx         # Statistics card
│   │   └── TopItemsTable.tsx     # Top items display
│   ├── inventory/
│   │   ├── InventoryTable.tsx    # Inventory list
│   │   └── LowStockAlert.tsx     # Stock alerts
│   ├── orders/
│   │   ├── OrderForm.tsx         # Order creation form
│   │   ├── OrderTable.tsx        # Orders list
│   │   └── StatusDropdown.tsx    # Status selector
│   ├── layout/
│   │   ├── Navbar.tsx            # Top navigation
│   │   └── Sidebar.tsx           # Side navigation
│   └── ui/                       # UI components
│       ├── Badge.tsx             # Badge component
│       ├── Button.tsx            # Button component
│       ├── Input.tsx             # Input field
│       └── Modal.tsx             # Modal dialog
├── context/                      # React Context for state
│   └── AuthContext.tsx           # Authentication state
├── hooks/                        # Custom React hooks
│   ├── useAnalytics.ts          # Analytics data hook
│   ├── useInventory.ts          # Inventory data hook
│   └── useOrders.ts             # Orders data hook
├── lib/                          # Utility functions
│   ├── auth.ts                  # Authentication utilities
│   └── axios.ts                 # Axios configuration
├── services/                     # API services
│   ├── analytics.service.ts     # Analytics API calls
│   ├── auth.service.ts          # Authentication API
│   ├── inventory.service.ts     # Inventory API
│   └── order.service.ts         # Orders API
├── types/                        # TypeScript types
│   ├── api.ts                   # API response types
│   └── index.ts                 # Shared types
├── public/                       # Static assets
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── eslint.config.mjs            # ESLint configuration
└── postcss.config.mjs           # PostCSS configuration
```

## Tech Stack

- **Framework**: Next.js 14+ (React 19)
- **Language**: TypeScript
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Styling**: CSS (Global styles + component-level)
- **Routing**: Next.js App Router with dynamic routes

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kamalbudhathoki/restaurant-frontend.git
cd restaurant-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables by creating `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

The app will automatically reload as you edit files thanks to Next.js hot module reloading.

## Build for Production

```bash
npm run build
npm start
```

## Key Components

### Authentication
- Login and registration pages in `(auth)` folder
- `AuthContext` manages user authentication state
- Protected routes ensure authorized access

### Dashboard
- Multi-section dashboard with admin, analytics, inventory, and orders
- Responsive sidebar navigation
- Top navigation bar for user actions

### Orders Management
- View all orders in a table format
- Create new orders with form
- View order details by ID
- Update order status with dropdown

### Inventory
- Track all inventory items
- Low stock alert system
- Real-time inventory updates

### Analytics
- Revenue chart visualization
- Key statistics cards
- Top-selling items table
- Data-driven insights

## Development Guide

### Creating New Components

Components should be placed in the appropriate folder within `components/`:

```typescript
// components/orders/NewComponent.tsx
export default function NewComponent() {
  return <div>Component content</div>
}
```

### Adding New Services

API services follow a consistent pattern in the `services/` folder:

```typescript
// services/example.service.ts
import axios from '@/lib/axios'

export const exampleService = {
  getAll: async () => {
    const response = await axios.get('/api/example')
    return response.data
  },
  
  getById: async (id: string) => {
    const response = await axios.get(`/api/example/${id}`)
    return response.data
  }
}
```

### Using Custom Hooks

Custom hooks in `hooks/` encapsulate component logic:

```typescript
// Usage in components
import { useOrders } from '@/hooks/useOrders'

export default function OrderList() {
  const { orders, loading } = useOrders()
  // Component logic
}
```

## API Integration

The application communicates with a backend API (typically running on `http://localhost:5000`).

Axios is configured in `lib/axios.ts` with:
- Base URL from environment variables
- Request/response interceptors
- Error handling

## Styling

The project uses CSS with:
- Global styles in `app/globals.css`
- Component-level styling
- Responsive design patterns

## Future Enhancements

- [ ] Add search and filtering to tables
- [ ] Implement pagination for large datasets
- [ ] Add export functionality (CSV, PDF)
- [ ] Implement real-time notifications
- [ ] Add user role-based access control
- [ ] Implement data validation on forms
- [ ] Add dark mode support
- [ ] Setup unit and integration tests

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@restaurantdashboard.com or open an issue on GitHub.
