# Personal Finance Tracker

A full-stack personal finance application designed to track income, expenses, and budgets with real-time insights and data visualization. Users can monitor spending habits, analyze trends, and stay within budget using interactive charts on the dashboard.

## Features
- Add, edit, and delete income & expense transactions
- Categorize transactions for detailed financial tracking
- Create and manage category-based budgetd
- Budget tracking with:
    - Percentage used
    - Remaining / over-budget indicators
    - Visual progress bars
- All-time financial overview:
    - Total income
    - Total expenses
    - Net balance
- Data visualization:
    - Income & expense breakdown (pie charts)
    - Spending trends over time (line & bar charts)
- Weekly and monthly expense tracking
- Expense comparison (current vs previous week & month)
- Secure authentication with JWT via headers for seamless use across devices and browsers
- User-specific data isolation
- Responsive UI with thoughtful and light animations to improve UX 

## Setup Locally
1. Clone the repo: 
```bash
git clone https://github.com/BrandonLeone1/Financial-Tracker.git
```
2. Navigate to the project folder:
```bash
cd Financial-Tracker
```
3. Install all dependencies: 
```bash
npm install
```
4. Create a .env file and add MONGO_URI=YOUR_STRING and JWT_SECRET=YOUR_SECRET: 

5. Run the backend:
```bash
node backend/server.js
```

5. Run the frontend:
```bash
cd frontend
npm run dev
```
6. Usage:
Navigate to http://localhost:5173 in your browser. Sign in to track your finances

## Built With
- Frontend
    - React
    - React-Router
    - Recharts
    - Tailwind CSS
    - Framer Motion
- Backend
    - Node.js
    - Express
    - MongoDB (Mongoose)
    - (JWT Authentication via headers)
    - bcrypt

## Key concepts / What This Project Demonstrates
- Building a full-stack application with a custom REST API
- Secure authentication using JWT and header authentication
- Aggregating data with MongoDB pipelines
- Optimizing performance -> refactoring from inefficient code to O(n) data mapping
- Handling derived financial metrics (percent used, totals, comparisons, deltas, etc.)
- Managing complex UI state across the dashboard and data visualizations
- Creating responsive UI animated lightly and thoughtfully to improve UX and provide feedback
- Structuring scalable backend routes and user-isolated data

## Notable Technical Decisions
- MongoDB Aggregation Pipelines for computing totals and grouped + summed financial data
- Derived state chosen over stored values to avoid inconsistencies
- Rate limiting on API routes to prevent abuse
- Optimized lookups using maps instead of nested for loops
- Centralized budget + transacrtion relationship logic on backend

## Challenges
- Synchronizing budget data with aggregated transaction totals
- Preventing NaN / various edge-case crashes in percent calculations
- Handlind date-based queries properly for weekly/monthly analytics
- Structuring efficient aggregation pipelines for multiple endpoints
- Managing UI complexity across dashboards, charts, and multiple pages

## Future Improvements
- Recurring transactions (salary, monthly subscriptions, etc)
- Budget alerts and notifications when reaching limit
- Ability to export data and charts (PDF)
- Multi-currency support
- Improved filtering allowing for specific categories only within transactions