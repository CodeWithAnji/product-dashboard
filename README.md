**Product Dashboard**

A fully responsives product-dashboard built with **React**, **Vite**, and **TailwindCSS**.  
It allows users to **view, search, add, edit,** and **delete** products with smooth transitions and a modern UI

---

**1. Setup Instructions**

**i. Clone the repository**
  
   git clone https://github.com/CodeWithAnji/product-dashboard.git
   cd product-dashboard
   
**ii. Install dependencies**

npm install

**iii. Run in development mode**

npm run dev

The app will be available at http://localhost:5173.

**iv. Build for production**

npm run build

**v. Preview production build**

npm run preview

**2 Libraries Used**

**React.js** – UI library for building components.

**Vite** – Lightning-fast bundler and dev server.

**TailwindCSS **– Utility-first CSS for responsive design.

**tailwindcss-animate** – Prebuilt animations for transitions.

**Radix UI (@radix-ui/react-dialog, @radix-ui/react-toast)** – Accessible dialog and toast components.

**TanStack React Query**– Data fetching, caching, and mutations.

**clsx, class-variance-authority**– Conditional class management.

**3. Approach**

**i. Responsive Design:** Mobile layoutand table view on desktops and card view on smaller screens.Flexbox and  grid used for adaptive layouts.

**ii. Modern UI/UX:** Used gradient colors with mooth hover, focus, and transition animations and Dialog animations for a polished feel.

**iii. Data Management:** React Query handles product fetching, pagination, search, and cache updates. Add, edit, and delete actions update the UI optimistically.

**iv. Component-Based Structure:**

**App.jsx** → Layout and routing of main dashboard.

**ProductTable.jsx**→ Responsive table and card-based listing.

**ProductDialog.jsx** → Reusable dialog for add/edit actions.

**Button.jsx** → Reusable styled button with variants.
 
