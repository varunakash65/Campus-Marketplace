# 🎓 UniTrade — Campus Marketplace

A modern, fully-featured second-hand marketplace for college students to **buy and sell** books, electronics, notes, calculators, and other student essentials — all within their campus community.

---

## 📸 Project Overview

| Feature | Status |
|---|---|
| Product Listings with Cards | ✅ |
| Search & Category Filters | ✅ |
| Add / Edit / Delete Products | ✅ |
| Product Detail Modal | ✅ |
| Indian Rupee (₹ INR) Pricing | ✅ |
| Student Authentication (Login / Signup) | ✅ |
| Student Dashboard & Profile | ✅ |
| My Products (owner-only listings) | ✅ |
| Responsive Mobile Design | ✅ |
| LocalStorage Persistence | ✅ |

---

## 🗂️ Project Structure

```
Campus-Marketplace/
├── index.html          # Main application HTML
├── css/
│   └── style.css       # All styles (purple/blue modern theme)
├── js/
│   └── app.js          # Application logic (vanilla JS)
└── README.md           # This file
```

---

## 🚀 Getting Started

1. Clone or download this repository.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge).
3. No build steps, no npm, no frameworks — it just works.

> **Tip:** For the best experience, use a browser with ES2020+ support (all modern browsers qualify).

---

## 🔐 Student Authentication System

### How It Works

UniTrade uses a **client-side authentication prototype** backed by browser `localStorage`. It is designed as a learning project to demonstrate authentication flows.

#### Flow Diagram

```
Not logged in                   Logged in
─────────────                   ──────────
[Login] [Sign Up]  →  Login  →  [👤 Alex Morgan ▾] [Logout]
                               ↓
                         Student Dashboard
                         ├─ My Products tab
                         └─ Student Profile tab
```

### Demo Account (1-Click Login)

| Field | Value |
|---|---|
| **Email** | `alex.m@campus.edu` |
| **Password** | `student123` |

Click the **"Demo Account →"** shortcut in the Login modal to log in instantly.

Alex Morgan already owns two listings:
- 📘 *Stewart Calculus 8th Edition* — ₹850
- 🧮 *TI-84 Plus Graphing Calculator* — ₹3,200

You can immediately test **Edit**, **Delete**, and **Dashboard** features with this account.

---

### Signing Up as a New Student

1. Click **Sign Up** in the navbar.
2. Fill in:
   - **Full Name** — your display name
   - **College Email** — used as your unique account identifier
   - **Department / Year** — e.g. "CSE — 3rd Year"
   - **Phone / WhatsApp** — shown to buyers when you post
   - **Campus Meetup Location** — your preferred spot
   - **Password** — minimum 6 characters
   - **Confirm Password**
3. Click **Create My Account**.

After signup you are automatically logged in and taken to your dashboard.

---

### Student Dashboard

After logging in, click **Dashboard** in the navbar (or your name pill) to access:

| Section | Description |
|---|---|
| **Profile Banner** | Avatar initials, name, email, department, campus location |
| **Metrics Row** | Active listings count · Portfolio value in ₹ · Meetup status |
| **My Products tab** | Only your own listings; Edit & Delete buttons visible |
| **Student Profile tab** | Edit your name, department, phone, and campus location |

---

### Navbar Auth States

| State | Navbar shows |
|---|---|
| **Logged out** | `Log In` button · `Sign Up` button |
| **Logged in** | Avatar pill with your initials and name · `Logout` button |

---

### Product Ownership Rules

- When you post a product, your email is stored as `sellerEmail`.
- Only the product's owner sees **Edit** and **Delete** buttons on the card.
- Other students see **View Details** and **Save** only.
- Attempting to sell while logged out shows a prompt to log in first.

---

## ⚠️ Security Disclaimer (Educational Prototype)

> This project uses **browser LocalStorage** for authentication — this is **NOT secure** for a real application.

| This prototype does | A real app should use |
|---|---|
| SHA-256 hash with a fixed salt (Web Crypto API) | Server-side `bcrypt` or `Argon2` with per-user random salts |
| Session stored in `localStorage` | `HttpOnly` + `Secure` session cookies |
| Client-side validation only | Server-side validation on every request |
| Plain HTTP (file://) | HTTPS with a valid TLS certificate |
| No real accounts | Verified .edu email, OTP, or SSO |

**Passwords are NOT stored in plain text** — they are hashed with SHA-256 before saving — but this is still not production-grade. Never use this codebase for a real authentication system.

---

## 🛒 Marketplace Features

### Product Cards

Each card shows:
- Product image (or category placeholder)
- Title, price (₹ INR), seller name, category badge
- Condition indicator (New / Like New / Good / Fair)
- "Your Listing" banner (if you own it)
- Action buttons: View Details · Save · Edit · Delete (owner only)

### Adding a Product

Click **+ Sell an Item** (or **+ Post New Item** in the dashboard).

Required fields:
- **Title** — product name
- **Category** — Books, Electronics, Stationery, Notes, Clothing, Sports, Furniture, Other
- **Condition** — New / Like New / Good / Fair
- **Price (₹ INR)** — numeric value
- **Description** — at least 10 characters
- **Seller Name & Contact** — pre-filled from your profile when logged in
- **Campus Location** — meetup spot

Optional:
- **Image URL** — paste any direct image link

### Search & Filter

- **Search bar** — real-time search by title, description, seller, or category
- **Category buttons** — filter by a specific category
- **Sort dropdown** — Newest First, Price: Low→High, Price: High→Low, Alphabetical

### Product Details Modal

Click **View Details** on any card to open a full detail view with:
- Large image, all product metadata
- Seller contact and campus meetup location
- "Contact Seller" link (WhatsApp / phone)

---

## 💰 Indian Rupee (₹ INR) Pricing

All prices use `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`:

| Raw Value | Displayed As |
|---|---|
| `850` | `₹850.00` |
| `12500` | `₹12,500.00` |
| `199999` | `₹1,99,999.00` |

Indian lakh/crore grouping is applied automatically.

---

## 🎨 Design System

| Element | Value |
|---|---|
| Primary colour | Purple `#7c3aed` |
| Accent colour | Blue `#2563eb` |
| Background | White `#ffffff` / Light grey `#f8fafc` |
| Font | Inter (Google Fonts) |
| Border radius | 12px (cards) · 16px (modals) |
| Shadows | Layered box-shadow for depth |

---

## 🧰 Technology Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements) |
| Styling | CSS3 (custom properties, flexbox, grid, animations) |
| Logic | Vanilla JavaScript (ES2020+, Web Crypto API) |
| Storage | `localStorage` (no backend required) |
| Icons | SVG inline icons |
| Fonts | Google Fonts — Inter |

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| ≥ 1024px | 3-column product grid, full navbar |
| 768px – 1023px | 2-column grid, condensed navbar |
| < 768px | Single-column, hamburger-style stacked nav |

---

## 🧪 Tested Features (50/50 Validation Checks)

All 10 auth features + bonus INR, security, and element ID checks passed a custom Python validation script covering:

- Login / Signup modals and form validation
- Logout and session clearing
- Student Dashboard structure and metrics
- Logged-in name display in navbar and dashboard
- My Products ownership filtering (`sellerEmail`)
- Edit/Delete restricted to product owner
- Student Profile view and edit
- Navbar auth-state toggling (logged out ↔ logged in)
- SHA-256 Web Crypto password hashing
- INR `en-IN` currency formatting
- 218 static `getElementById` IDs verified present in HTML

---

## 📄 Licence

This project is an educational prototype built for learning purposes. Use freely for personal projects, college assignments, or as a reference implementation.

---

*Built with ❤️ for the campus community.*
