# Merchant Dashboard - Project Status & Requirements

## 📋 Project Overview
A modern, theme-aware financial dashboard application built with React, TypeScript, and Vite. The application features a clean UI with light/dark theme support, routing, and a component-based architecture.

---

## ✅ What Has Been Completed

### 1. **Project Foundation & Setup**
- ✅ React + TypeScript + Vite project initialized
- ✅ `lucide-react` library installed for icons
- ✅ `react-router-dom` installed and configured for routing
- ✅ ESLint and TypeScript configurations set up

### 2. **Theme System**
- ✅ CSS variables defined in `src/index.css` using `data-theme` attribute
- ✅ Light and dark theme color schemes implemented:
  - **Light Theme**: `--bg: #EBEDF1`, `--sidebar: #D4D8DF`, `--card: #FFFFFF`, etc.
  - **Dark Theme**: `--bg: #0B0B0B`, `--sidebar: #1E1E1F`, `--card: #393741`, etc.
- ✅ Theme toggle component created with switch UI ("Light Mood" toggle)
- ✅ Theme state management in GlobalLayout with automatic `data-theme` application
- ✅ All components use CSS variables for theme-aware styling

### 3. **Folder Structure & Architecture**
- ✅ Organized component structure:
  ```
  src/
  ├── components/UI/          # Reusable UI components
  │   ├── Sidebar/
  │   │   ├── configs/         # Component-specific configs
  │   │   ├── Sidebar.tsx
  │   │   └── Sidebar.module.css
  │   ├── Header/
  │   │   ├── configs/
  │   │   ├── Header.tsx
  │   │   └── Header.module.css
  │   ├── ThemeToggle/
  │   └── SvgIcon/
  ├── pages/                   # Route components
  │   ├── Dashboard/
  │   └── Merchants/
  ├── layout/                  # Layout components
  └── assets/                  # Icons and images
      ├── icons/
      └── images/
  ```

### 4. **Global Layout**
- ✅ `GlobalLayout` component created with:
  - Sidebar on the left
  - Header at the top
  - Main content area using React Router's `Outlet`
- ✅ Unified background surface: Sidebar, Header, and route components share the same `var(--bg)` background
- ✅ Layout uses CSS modules for styling

### 5. **Sidebar Component**
- ✅ Navigation sidebar with:
  - Logo branding ("Zaant" with blue circular icon)
  - Menu items with icons from `lucide-react`
  - Active route highlighting
  - Theme toggle at the bottom
- ✅ Only two menu items configured:
  - **Dashboard** (`/`) - LayoutDashboard icon
  - **Merchants** (`/merchants`) - Users icon
- ✅ Configs organized in `configs/menuItems.ts` with proper exports
- ✅ Uses `NavLink` from react-router-dom for navigation

### 6. **Header Component**
- ✅ Top header with:
  - Dynamic page title (updates based on route)
  - Upgrade button
  - Notification icon (Bell)
  - Profile icon (User)
- ✅ Route-to-title mapping in `configs/routeTitles.ts`
- ✅ Responsive layout with flexbox

### 7. **Routing Setup**
- ✅ React Router configured in `App.tsx`
- ✅ Two routes implemented:
  - `/` → Dashboard page
  - `/merchants` → Merchants page
- ✅ Nested routing structure with GlobalLayout as parent route

### 8. **Page Components**
- ✅ Dashboard page component created (placeholder content)
- ✅ Merchants page component created (placeholder content)
- ✅ Both pages use CSS modules for styling

### 9. **Configuration Management**
- ✅ Configs folder pattern established:
  - Each component has its own `configs/` folder
  - Configs exported via `index.ts` files
  - TypeScript types properly exported
- ✅ Sidebar menu items config: `Sidebar/configs/menuItems.ts`
- ✅ Header route titles config: `Header/configs/routeTitles.ts`

### 10. **Styling Standards**
- ✅ CSS Modules used for all components
- ✅ Theme variables used throughout (`var(--bg)`, `var(--card)`, etc.)
- ✅ Consistent styling patterns
- ✅ Smooth theme transitions

---

## 🎯 What Needs to Be Achieved

### 1. **Dashboard Page Content** (`/`)
The Dashboard page should display financial forecasting data with multiple card-based components:

#### **Cash Runway Card**
- Title: "Cash Runway"
- Timeframe selector dropdown: "Last 6 Months" (with down arrow icon)
- Line chart with:
  - Light blue shaded area below the line
  - Data points for 6 months (Jan to Jun)
  - Y-axis range: 0 to 30
  - Tooltip on hover showing values (e.g., "$20,000.00 Jul 7")
- Chart library needed (consider: Recharts, Chart.js, or similar)

#### **Cash Forecast Card**
- Title: "Cash Forecast"
- Timeframe selector dropdown: "Last 6 Months"
- Line chart with:
  - Shaded area transitioning from green (Jan-Mar) to orange (Apr-Jun)
  - Y-axis range: 0 to 30
  - Tooltip showing forecast values (e.g., "$20,000.00 Forecast: Jul 7")

#### **What-if Analysis Card**
- Title: "What-if Analysis"
- Input controls:
  - "Change in revenue": Segmented control with "-" and "+" buttons, displaying "2%" in the middle
  - "Head count": Input field displaying "100"
- Action button: Blue "Confirm" button
- Result display: "Projected net income (loss)" with calculated value "$34,456.00"

#### **Company Valuation Card**
- Title: "Company Valuation" (white text on dark red-to-black gradient background)
- Metrics displayed in white text:
  - "EBITDA": "84,365"
  - "Net Income": "$26,565,305.56"
- Gradient background styling

#### **Adjustable KPI Card**
- Title: "Adjustable KPI"
- Dropdown/expandable indicator (down arrow icon)
- Should allow selection of different KPIs

### 2. **Merchants Page Content** (`/merchants`)
- Merchant list/table view
- Merchant details
- Add/Edit merchant functionality
- Search and filter capabilities
- (Specific requirements to be defined based on design)

### 3. **Component Development**
- Create reusable Card component for dashboard cards
- Create Chart components (or integrate charting library)
- Create Input components (segmented control, number input)
- Create Button components with variants
- Create Dropdown/Select components

### 4. **Data Management**
- Set up state management (consider: Context API, Zustand, or Redux)
- Create mock data for charts and financial metrics
- Implement data fetching structure (API integration ready)

### 5. **Additional Features**
- Notification dropdown/modal (when bell icon is clicked)
- Profile dropdown/modal (when profile icon is clicked)
- Responsive design for mobile/tablet
- Loading states
- Error handling
- Form validation for What-if Analysis inputs

### 6. **Styling Enhancements**
- Ensure all cards use `var(--card)` background
- Implement gradient backgrounds where needed
- Add hover states and transitions
- Ensure accessibility (ARIA labels, keyboard navigation)

### 7. **Testing & Quality**
- Component testing
- Integration testing
- E2E testing (optional)
- Code quality checks

---

## 🛠️ Technical Stack

### Current Stack
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.12.0
- **Icons**: Lucide React 0.562.0
- **Styling**: CSS Modules
- **Linting**: ESLint

### Recommended Additions
- **Charts**: Recharts or Chart.js
- **State Management**: Zustand or Context API
- **Form Handling**: React Hook Form (if needed)
- **Date Handling**: date-fns or Day.js

---

## 📝 Development Guidelines

### Component Structure
1. Each component should have:
   - Component file (`.tsx`)
   - CSS Module file (`.module.css`)
   - Index file (`index.ts`) for exports
   - Configs folder (if needed) with `index.ts` export

### Styling Rules
1. Always use CSS Modules (`.module.css`)
2. Use theme variables from root CSS (`var(--bg)`, `var(--card)`, etc.)
3. Maintain consistent spacing and typography
4. Ensure theme transitions are smooth

### Configuration Management
1. Component-specific configs go in `component/configs/` folder
2. Export all configs via `configs/index.ts`
3. Export types alongside configs

### Code Organization
1. Keep components focused and reusable
2. Use TypeScript interfaces for props
3. Follow React best practices (hooks, functional components)
4. Maintain clean folder structure

---

## 🎨 Design Reference

The application should match the provided design image showing:
- Clean, modern financial dashboard UI
- Light grey and white color scheme (with dark theme support)
- Card-based layout for dashboard content
- Colorful data visualizations
- Professional, user-friendly interface

---

## 🚀 Next Steps

1. **Immediate Priority**: Build Dashboard page with all 5 card components
2. **Chart Integration**: Choose and integrate charting library
3. **Component Library**: Create reusable UI components (Card, Button, Input, etc.)
4. **Data Layer**: Set up mock data and state management
5. **Merchants Page**: Design and implement merchants functionality
6. **Polish**: Add interactions, animations, and final styling touches

---

## 📌 Notes

- All components should be theme-aware
- Maintain the unified background surface (sidebar, header, content)
- Cards within route components should use `var(--card)` background
- Follow the established configs folder pattern for any new component configs
- Keep the codebase modular and maintainable

