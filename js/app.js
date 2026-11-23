/**
 * UniTrade Campus Marketplace - Application Logic
 * Pure Vanilla JavaScript & LocalStorage
 * Featuring Student Authentication, LocalStorage persistence & Indian Rupee formatting
 */

// =============================================================================
// 1. CONSTANTS, STORAGE KEYS & INITIAL SEED DATA
// =============================================================================

const STORAGE_KEY = 'unitrade_campus_products_inr';
const SAVED_KEY = 'unitrade_saved_products_inr';
const USERS_STORAGE_KEY = 'unitrade_students';
const CURRENT_USER_KEY = 'unitrade_current_student';

/**
 * 10 Realistic Campus Starter Products in Indian Rupees (₹ INR)
 * With realistic seller student emails
 */
const SAMPLE_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Stewart Calculus: Early Transcendentals (9th Edition)',
    category: 'Textbooks',
    price: 450,
    condition: 'Like New',
    location: 'Science Library 2nd Floor',
    sellerName: 'Alex Morgan',
    sellerEmail: 'alex.m@campus.edu',
    sellerContact: 'alex.m@campus.edu',
    description: 'Hardcover in near-mint condition! No highlighting, no dog-eared pages. Used for MATH 101/102. Includes unused student access study guide card.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    isUserListing: true,
    createdAt: Date.now() - 3600000 * 5 // 5 hours ago
  },
  {
    id: 'prod-2',
    title: 'Texas Instruments TI-84 Plus CE Color Graphing Calculator',
    category: 'Calculators',
    price: 3500,
    condition: 'Good',
    location: 'Student Union Dining Hall',
    sellerName: 'Alex Morgan',
    sellerEmail: 'alex.m@campus.edu',
    sellerContact: 'alex.m@campus.edu',
    description: 'Rose gold colorway. Rechargeable battery holds charge for weeks. Comes with original slide cover and mini-USB charging cord. Perfect for Stats, Calc, and Chemistry.',
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800&q=80',
    isUserListing: true,
    createdAt: Date.now() - 3600000 * 24 // 1 day ago
  },
  {
    id: 'prod-3',
    title: 'Apple iPad (9th Gen) 64GB Space Gray + Apple Pencil',
    category: 'Electronics',
    price: 16500,
    condition: 'Like New',
    location: 'Engineering Quad & Tech Hub',
    sellerName: 'David Chen',
    sellerEmail: 'david.c@campus.edu',
    sellerContact: 'david.c@campus.edu',
    description: 'Upgrading for graduation. Screen protector installed since day 1 with zero scratches. Includes 1st gen Apple Pencil, magnetic folio case, and 20W USB-C charger.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    isUserListing: false,
    createdAt: Date.now() - 3600000 * 48 // 2 days ago
  },
  {
    id: 'prod-4',
    title: 'Organic Chemistry I & II Comprehensive Handwritten Notes + Reaction Guide',
    category: 'Notes & Study',
    price: 250,
    condition: 'Brand New',
    location: 'Chemistry Building Lobby',
    sellerName: 'Sarah Jenkins',
    sellerEmail: 'sarah.j@campus.edu',
    sellerContact: 'sarah.j@campus.edu',
    description: 'Color-coded mechanism summaries, reaction flowcharts, and exam prep cheatsheets. Scored an A+ in CHEM 220. Printed & spiral-bound copy included.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    isUserListing: false,
    createdAt: Date.now() - 3600000 * 12 // 12 hours ago
  },
  {
    id: 'prod-5',
    title: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
    category: 'Electronics',
    price: 9500,
    condition: 'Good',
    location: 'West Campus Dorm Commons',
    sellerName: 'Jordan Kelly',
    sellerEmail: 'jordan.k@campus.edu',
    sellerContact: 'jordan.k@campus.edu',
    description: 'Lifesaver for studying in noisy dorm lounges or the library. Active noise cancelling works perfectly. Ear pads clean and in great shape. Includes hard travel case.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    isUserListing: false,
    createdAt: Date.now() - 3600000 * 30
  },
  {
    id: 'prod-6',
    title: 'Ergonomic Mesh Desk Chair with Adjustable Lumbar Support',
    category: 'Dorm Essentials',
    price: 1800,
    condition: 'Like New',
    location: 'North Tower Dorms - Room 412',
    sellerName: 'Marcus Vance',
    sellerEmail: 'marcus.v@campus.edu',
    sellerContact: 'marcus.v@campus.edu',
    description: 'Way better than the standard stiff wooden chairs provided by dorms. Breathable mesh, smooth rolling casters, tilt lock. Moving to unfurnished apartment.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    isUserListing: false,
    createdAt: Date.now() - 3600000 * 70
  },
  {
    id: 'prod-7',
    title: 'Casio fx-991EX ClassWiz Advanced Scientific Calculator',
    category: 'Calculators',
    price: 850,
    condition: 'Brand New',
    location: 'Engineering Building B',
    sellerName: 'Rachel Wong',
    sellerEmail: 'rachel.w@campus.edu',
    sellerContact: 'rachel.w@campus.edu',
    description: 'Bought an extra one by mistake before classes started. High-resolution LCD, solar powered with battery backup. Approved for all college exams.',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
    isUserListing: false,
    createdAt: Date.now() - 3600000 * 6
  },
  {
    id: 'prod-8',
    title: 'Fundamentals of Physics (11th Extended Ed) - Halliday & Resnick',
    category: 'Textbooks',
    price: 600,
    condition: 'Good',
    location: 'Physics Hall Study Room',
    sellerName: 'Sam Patel',
    sellerEmail: 'sam.p@campus.edu',
    sellerContact: 'sam.p@campus.edu',
    description: 'Essential text for PHYS 201/202. Hardcover, corners slightly bumped but spine is solid and pages are clean. Saved me during midterm problem sets.',
    image: 'https://images.unsplash.com/photo-1532012164546-f432f2e37b73?auto=format&fit=crop&w=800&q=80',
    isUserListing: false,
    createdAt: Date.now() - 3600000 * 85
  },
  {
    id: 'prod-9',
    title: 'Compact Dorm Mini Refrigerator with Freezer (1.7 Cu. Ft.)',
    category: 'Dorm Essentials',
    price: 3800,
    condition: 'Like New',
    location: 'East Quad Residence Hall',
    sellerName: 'Elena Rostova',
    sellerEmail: 'elena.r@campus.edu',
    sellerContact: 'elena.r@campus.edu',
    description: 'Super quiet compressor, perfect for bedside or under a raised dorm bed. Cleaned thoroughly and defrosted. Keeps drinks ice cold.',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    isUserListing: false,
    createdAt: Date.now() - 3600000 * 20
  },
  {
    id: 'prod-10',
    title: 'White Cotton Chemistry Lab Coat (Unisex Medium) + Splash Goggles',
    category: 'Other',
    price: 350,
    condition: 'Like New',
    location: 'Bio-Med Science Atrium',
    sellerName: 'Tyler Scott',
    sellerEmail: 'tyler.s@campus.edu',
    sellerContact: 'tyler.s@campus.edu',
    description: '100% thick cotton, knee-length, washed and ironed. Includes ANSI-certified chemical splash safety goggles. Required for all campus chemistry labs.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    isUserListing: false,
    createdAt: Date.now() - 3600000 * 15
  }
];

// =============================================================================
// 2. STATE MANAGEMENT & AUTHENTICATION
// =============================================================================

const state = {
  products: [],
  savedIds: [],
  users: [],
  currentUser: null,
  currentCategory: 'All',
  searchQuery: '',
  sortBy: 'newest',
  currentView: 'explore', // 'explore' | 'my-listings' | 'saved'
  activeProductForModal: null,
  productToDeleteId: null,
  currentUploadedImage: ''
};

/**
 * Salted SHA-256 password hash using standard Web Crypto API.
 * Keeps passwords from being stored in plain text in LocalStorage.
 * Prototype note: Production marketplaces require secure server-side bcrypt/Argon2.
 */
async function hashPassword(password) {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + ':unitrade_campus_salt_2026');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    console.error('Crypto hashing failed, using fallback hash:', err);
    // Simple numeric fallback in non-crypto environments
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      hash = ((hash << 5) - hash) + password.charCodeAt(i);
      hash |= 0;
    }
    return 'fallback_' + Math.abs(hash).toString(16);
  }
}

/**
 * Initialize Student Users & Current Auth Session
 */
async function initAuthStorage() {
  try {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!storedUsers || storedUsers === '[]') {
      const demoHash = await hashPassword('student123');
      const defaultUsers = [
        {
          id: 'user-demo-1',
          name: 'Alex Morgan',
          email: 'alex.m@campus.edu',
          passwordHash: demoHash,
          department: 'Mathematics, 3rd Year',
          contact: 'alex.m@campus.edu',
          location: 'Science Block & North Hostel',
          createdAt: Date.now() - 3600000 * 24 * 30
        }
      ];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
      state.users = defaultUsers;
    } else {
      state.users = JSON.parse(storedUsers);
    }

    const current = localStorage.getItem(CURRENT_USER_KEY);
    if (current) {
      state.currentUser = JSON.parse(current);
    } else {
      state.currentUser = null;
    }
  } catch (err) {
    console.error('Error initializing auth storage:', err);
    state.users = [];
    state.currentUser = null;
  }
}

/**
 * Initialize products & saved bookmarks storage
 */
function initStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored || stored === '[]') {
      state.products = [...SAMPLE_PRODUCTS];
      saveProducts(state.products);
    } else {
      state.products = JSON.parse(stored);
      // Ensure products have sellerEmail mapping for backwards compatibility
      state.products.forEach(p => {
        if (!p.sellerEmail) {
          p.sellerEmail = p.isUserListing ? 'alex.m@campus.edu' : 'student@campus.edu';
        }
      });
    }

    const saved = localStorage.getItem(SAVED_KEY);
    state.savedIds = saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error('Error initializing storage:', err);
    state.products = [...SAMPLE_PRODUCTS];
    state.savedIds = [];
  }
}

/**
 * Persist products to LocalStorage
 */
function saveProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    state.products = products;
    updateCounters();
  } catch (err) {
    console.error('Failed to save products to localStorage:', err);
    showToast('Failed to save to local storage (storage limit exceeded)', 'error');
  }
}

/**
 * Persist saved bookmark IDs to LocalStorage
 */
function saveBookmarks(savedIds) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
    state.savedIds = savedIds;
    updateCounters();
  } catch (err) {
    console.error('Failed to save bookmarks:', err);
  }
}

/**
 * Check if the currently logged-in student owns this product listing
 */
function isProductOwner(product) {
  if (!state.currentUser || !product) return false;
  if (product.sellerEmail && state.currentUser.email) {
    return product.sellerEmail.toLowerCase() === state.currentUser.email.toLowerCase();
  }
  return false;
}

/**
 * Toggle bookmark/saved status for a product
 */
function toggleSaveProduct(productId) {
  const index = state.savedIds.indexOf(productId);
  let saved = false;

  if (index > -1) {
    state.savedIds.splice(index, 1);
    saved = false;
    showToast('Removed from saved bookmarks', 'info');
  } else {
    state.savedIds.push(productId);
    saved = true;
    showToast('Added to saved bookmarks!', 'success');
  }

  saveBookmarks(state.savedIds);
  renderCurrentView();

  if (state.activeProductForModal && state.activeProductForModal.id === productId) {
    updateDetailsBookmarkButton(saved);
  }

  return saved;
}

// =============================================================================
// 3. STUDENT AUTHENTICATION FLOWS (LOGIN, SIGNUP, LOGOUT, PROFILE)
// =============================================================================

/**
 * Log in student with email and password
 */
async function loginStudent(email, password) {
  email = (email || '').trim().toLowerCase();
  password = (password || '').trim();

  const errorEl = document.getElementById('login-error-alert');
  if (errorEl) errorEl.style.display = 'none';

  if (!email || !password) {
    showAuthError('login-error-alert', 'Please enter both your college email and password.');
    return false;
  }

  const user = state.users.find(u => u.email.toLowerCase() === email);
  if (!user) {
    showAuthError('login-error-alert', 'No student account found with this email. Check spelling or Sign Up.');
    return false;
  }

  const inputHash = await hashPassword(password);
  if (user.passwordHash !== inputHash) {
    showAuthError('login-error-alert', 'Incorrect password. Please try again.');
    return false;
  }

  // Session user object (excluding password hash)
  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    department: user.department || 'Student',
    contact: user.contact || user.email,
    location: user.location || 'Main Campus',
    createdAt: user.createdAt
  };

  state.currentUser = sessionUser;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));

  updateAuthUI();
  updateCounters();
  closeLoginModal();
  showToast(`Welcome back, ${sessionUser.name}!`, 'success');

  // Switch to Student Dashboard
  switchView('my-listings');
  return true;
}

/**
 * Register a new student account
 */
async function signupStudent(name, email, password, confirmPassword, dept, contact, location) {
  name = (name || '').trim();
  email = (email || '').trim().toLowerCase();
  password = (password || '').trim();
  confirmPassword = (confirmPassword || '').trim();
  dept = (dept || '').trim();
  contact = (contact || '').trim();
  location = (location || '').trim();

  const errorEl = document.getElementById('signup-error-alert');
  if (errorEl) errorEl.style.display = 'none';

  if (!name || name.length < 2) {
    showAuthError('signup-error-alert', 'Please enter your full name (at least 2 characters).');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showAuthError('signup-error-alert', 'Please enter a valid college email address.');
    return false;
  }

  const existing = state.users.find(u => u.email.toLowerCase() === email);
  if (existing) {
    showAuthError('signup-error-alert', 'An account is already registered with this email. Please log in.');
    return false;
  }

  if (!password || password.length < 6) {
    showAuthError('signup-error-alert', 'Password must be at least 6 characters long.');
    return false;
  }

  if (password !== confirmPassword) {
    showAuthError('signup-error-alert', 'Passwords do not match. Please re-enter.');
    return false;
  }

  const passwordHash = await hashPassword(password);

  const newUser = {
    id: 'user-' + Date.now(),
    name,
    email,
    passwordHash,
    department: dept || 'College Student',
    contact: contact || email,
    location: location || 'Campus',
    createdAt: Date.now()
  };

  state.users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(state.users));

  const sessionUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    department: newUser.department,
    contact: newUser.contact,
    location: newUser.location,
    createdAt: newUser.createdAt
  };

  state.currentUser = sessionUser;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));

  updateAuthUI();
  updateCounters();
  closeSignupModal();
  showToast(`Account created! Welcome, ${sessionUser.name}.`, 'success');

  switchView('my-listings');
  return true;
}

/**
 * Logout current student
 */
function logoutStudent() {
  state.currentUser = null;
  localStorage.removeItem(CURRENT_USER_KEY);
  updateAuthUI();
  updateCounters();
  renderCurrentView();
  showToast('You have been logged out.', 'info');
  switchView('explore');
}

/**
 * Update student profile info
 */
function updateStudentProfile(name, dept, contact, location) {
  if (!state.currentUser) return;

  name = (name || '').trim();
  dept = (dept || '').trim();
  contact = (contact || '').trim();
  location = (location || '').trim();

  if (!name || name.length < 2) {
    showToast('Name must be at least 2 characters.', 'error');
    return;
  }

  state.currentUser.name = name;
  state.currentUser.department = dept;
  state.currentUser.contact = contact;
  state.currentUser.location = location;

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(state.currentUser));

  const uIndex = state.users.findIndex(u => u.email.toLowerCase() === state.currentUser.email.toLowerCase());
  if (uIndex > -1) {
    state.users[uIndex].name = name;
    state.users[uIndex].department = dept;
    state.users[uIndex].contact = contact;
    state.users[uIndex].location = location;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(state.users));
  }

  // Update sellerName & contact on products owned by this student
  let updatedAny = false;
  state.products.forEach(p => {
    if (isProductOwner(p)) {
      p.sellerName = name;
      if (contact) p.sellerContact = contact;
      if (location && (!p.location || p.location === 'Campus')) p.location = location;
      updatedAny = true;
    }
  });

  if (updatedAny) {
    saveProducts(state.products);
  }

  updateAuthUI();
  renderMyListingsView();
  showToast('Profile updated successfully!', 'success');
}

function showAuthError(alertId, message) {
  const alertEl = document.getElementById(alertId);
  if (alertEl) {
    alertEl.textContent = message;
    alertEl.style.display = 'block';
  }
}

/**
 * Update UI for authenticated vs logged-out state
 */
function updateAuthUI() {
  const loggedOutNav = document.getElementById('nav-auth-logged-out');
  const loggedInNav = document.getElementById('nav-auth-logged-in');
  const userAvatar = document.getElementById('nav-user-avatar');
  const userName = document.getElementById('nav-user-name');

  if (state.currentUser) {
    if (loggedOutNav) loggedOutNav.style.display = 'none';
    if (loggedInNav) loggedInNav.style.display = 'flex';

    const initials = (state.currentUser.name || 'Student')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');

    if (userAvatar) userAvatar.textContent = initials || 'ST';
    if (userName) userName.textContent = state.currentUser.name || 'Student';
  } else {
    if (loggedOutNav) loggedOutNav.style.display = 'flex';
    if (loggedInNav) loggedInNav.style.display = 'none';
  }
}

// =============================================================================
// 4. UI RENDERING & CURRENCY FORMATTING
// =============================================================================

/**
 * Currency formatter using JavaScript Intl.NumberFormat for Indian Rupees (₹ INR)
 * Formats numbers according to the Indian numbering system (e.g. ₹450, ₹16,500)
 */
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR'
});

function formatPrice(num) {
  const parsed = parseFloat(num) || 0;
  return inrFormatter.format(parsed);
}

/**
 * Relative time formatter for human-readable display
 */
function formatTimeAgo(timestamp) {
  if (!timestamp) return 'Recently';
  const diffMinutes = Math.floor((Date.now() - timestamp) / 60000);
  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getCategoryBadgeClass(category) {
  switch (category) {
    case 'Textbooks': return 'cat-tag-textbooks';
    case 'Calculators': return 'cat-tag-calculators';
    case 'Electronics': return 'cat-tag-electronics';
    case 'Notes & Study': return 'cat-tag-notes';
    case 'Dorm Essentials': return 'cat-tag-dorm';
    default: return 'cat-tag-other';
  }
}

function getConditionClass(condition) {
  switch (condition) {
    case 'Brand New': return 'cond-brand-new';
    case 'Like New': return 'cond-like-new';
    case 'Good': return 'cond-good';
    case 'Fair': return 'cond-fair';
    default: return 'cond-good';
  }
}

function getFilteredAndSortedProducts() {
  let list = [...state.products];

  // 1. Category filter
  if (state.currentCategory && state.currentCategory !== 'All') {
    list = list.filter(item => item.category === state.currentCategory);
  }

  // 2. Search query filter
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.trim().toLowerCase();
    list = list.filter(item => {
      const matchTitle = (item.title || '').toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      const matchLoc = (item.location || '').toLowerCase().includes(q);
      const matchCat = (item.category || '').toLowerCase().includes(q);
      return matchTitle || matchDesc || matchLoc || matchCat;
    });
  }

  // 3. Sort
  list.sort((a, b) => {
    switch (state.sortBy) {
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'title-az':
        return (a.title || '').localeCompare(b.title || '');
      case 'newest':
      default:
        return (b.createdAt || 0) - (a.createdAt || 0);
    }
  });

  return list;
}

/**
 * Generate HTML string for an individual product card
 */
function createProductCardHTML(product) {
  const isSaved = state.savedIds.includes(product.id);
  const isOwner = isProductOwner(product);
  const catClass = getCategoryBadgeClass(product.category);
  const condClass = getConditionClass(product.condition);
  const initials = (product.sellerName || 'Student')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');

  const safeImage = product.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="card-media">
        <img 
          src="${escapeHTML(safeImage)}" 
          alt="${escapeHTML(product.title)}" 
          loading="lazy"
          onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';"
        >
        <div class="card-media-overlay"></div>

        <div class="card-top-badges">
          <span class="category-tag ${catClass}">${escapeHTML(product.category)}</span>
          <button 
            type="button" 
            class="btn-card-save ${isSaved ? 'saved' : ''}" 
            data-action="toggle-save" 
            data-product-id="${product.id}"
            title="${isSaved ? 'Remove from saved' : 'Save for later'}"
            aria-label="${isSaved ? 'Remove from saved' : 'Save for later'}"
          >
            <svg viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>

        ${isOwner ? `<span class="user-badge-corner">Your Listing</span>` : ''}

        <div class="card-bottom-badges">
          <span class="condition-pill ${condClass}">${escapeHTML(product.condition)}</span>
        </div>
      </div>

      <div class="card-content">
        <div class="card-header-row">
          <span class="card-price">${formatPrice(product.price)}</span>
          <span class="card-location" title="${escapeHTML(product.location)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${escapeHTML(product.location)}
          </span>
        </div>

        <h3 class="card-title" title="${escapeHTML(product.title)}">${escapeHTML(product.title)}</h3>
        <p class="card-description">${escapeHTML(product.description)}</p>

        <div class="card-footer-meta">
          <div class="card-seller-info">
            <div class="seller-mini-avatar">${escapeHTML(initials || 'ST')}</div>
            <span class="seller-mini-name" title="${escapeHTML(product.sellerName)}">${escapeHTML(product.sellerName || 'Student')}</span>
          </div>
          <span class="card-post-time">${formatTimeAgo(product.createdAt)}</span>
        </div>

        <div class="card-actions-row">
          <button type="button" class="btn btn-card-details" data-action="view-details" data-product-id="${product.id}">
            View Details
          </button>
          ${isOwner ? `
            <button type="button" class="btn btn-card-owner-edit" data-action="edit-product" data-product-id="${product.id}" title="Edit this listing">
              Edit
            </button>
            <button type="button" class="btn btn-card-owner-del" data-action="delete-product" data-product-id="${product.id}" title="Delete this listing">
              Delete
            </button>
          ` : ''}
        </div>
      </div>
    </article>
  `;
}

/**
 * Render the main Explore marketplace view
 */
function renderMarketplaceView() {
  const container = document.getElementById('product-grid');
  const emptyState = document.getElementById('empty-state');
  const resultsCount = document.getElementById('results-count');
  const resultsHeading = document.getElementById('results-heading');
  const activeFilterBadge = document.getElementById('active-filter-badge');
  const activeFilterText = document.getElementById('active-filter-text');
  const searchBanner = document.getElementById('search-feedback-banner');
  const searchQueryText = document.getElementById('search-query-text');

  if (!container) return;

  const filtered = getFilteredAndSortedProducts();

  if (state.currentCategory !== 'All') {
    resultsHeading.textContent = `${state.currentCategory} on Campus`;
    activeFilterBadge.style.display = 'inline-flex';
    activeFilterText.textContent = `Category: ${state.currentCategory}`;
  } else {
    resultsHeading.textContent = 'Explore Campus Deals';
    activeFilterBadge.style.display = 'none';
  }

  if (state.searchQuery.trim()) {
    searchBanner.style.display = 'flex';
    searchQueryText.textContent = state.searchQuery.trim();
  } else {
    searchBanner.style.display = 'none';
  }

  resultsCount.textContent = `Showing ${filtered.length} of ${state.products.length} items`;

  if (filtered.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'block';
    const emptyDesc = document.getElementById('empty-state-desc');
    if (state.searchQuery) {
      emptyDesc.textContent = `No listings found matching "${state.searchQuery}". Try different keywords or reset your filters.`;
    } else if (state.currentCategory !== 'All') {
      emptyDesc.textContent = `No listings currently available under "${state.currentCategory}". Be the first to post an item in this category!`;
    } else {
      emptyDesc.textContent = 'No products found. Be the first student to post an item!';
    }
  } else {
    emptyState.style.display = 'none';
    container.innerHTML = filtered.map(createProductCardHTML).join('');
  }
}

/**
 * Render Student Dashboard & "My Products" View
 */
function renderMyListingsView() {
  const grid = document.getElementById('my-listings-grid');
  const activeCountEl = document.getElementById('metric-active-count');
  const totalValueEl = document.getElementById('metric-total-value');
  const badgeCountEl = document.getElementById('dashboard-items-badge');

  // If student is logged out, prompt login
  if (!state.currentUser) {
    if (activeCountEl) activeCountEl.textContent = '0';
    if (totalValueEl) totalValueEl.textContent = '₹0';
    if (badgeCountEl) badgeCountEl.textContent = '0 items';

    if (grid) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; margin: 1.5rem auto; max-width: 520px;">
          <div class="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3 class="empty-state-title">Student Login Required</h3>
          <p class="empty-state-desc">Please log in or create an account with your college email to view your personal dashboard, manage listed items, and edit your profile.</p>
          <div class="empty-state-actions">
            <button type="button" class="btn btn-primary" id="dash-login-prompt-btn">Log In</button>
            <button type="button" class="btn btn-secondary" id="dash-signup-prompt-btn">Sign Up</button>
          </div>
        </div>
      `;
      document.getElementById('dash-login-prompt-btn')?.addEventListener('click', openLoginModal);
      document.getElementById('dash-signup-prompt-btn')?.addEventListener('click', openSignupModal);
    }
    return;
  }

  // Update Student Profile Banner Details
  const user = state.currentUser;
  const initials = (user.name || 'Student')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');

  const dashAvatar = document.getElementById('dash-student-avatar');
  const dashName = document.getElementById('dash-student-name');
  const dashEmail = document.getElementById('dash-student-email');
  const dashDept = document.getElementById('dash-student-dept');
  const dashLocation = document.getElementById('dash-student-location');

  if (dashAvatar) dashAvatar.textContent = initials || 'ST';
  if (dashName) dashName.textContent = user.name;
  if (dashEmail) dashEmail.textContent = user.email;
  if (dashDept) dashDept.textContent = user.department || 'College Student';
  if (dashLocation) dashLocation.textContent = user.location || 'Campus';

  // Populate Profile Form inputs
  const pName = document.getElementById('profile-name-input');
  const pEmail = document.getElementById('profile-email-input');
  const pDept = document.getElementById('profile-dept-input');
  const pContact = document.getElementById('profile-contact-input');
  const pLocation = document.getElementById('profile-location-input');

  if (pName) pName.value = user.name || '';
  if (pEmail) pEmail.value = user.email || '';
  if (pDept) pDept.value = user.department || '';
  if (pContact) pContact.value = user.contact || '';
  if (pLocation) pLocation.value = user.location || '';

  // Filter listings owned by this student
  const myListings = state.products.filter(p => isProductOwner(p));

  const activeCount = myListings.length;
  const totalVal = myListings.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

  if (activeCountEl) activeCountEl.textContent = activeCount;
  if (totalValueEl) totalValueEl.textContent = formatPrice(totalVal);
  if (badgeCountEl) badgeCountEl.textContent = `${activeCount} ${activeCount === 1 ? 'item' : 'items'}`;

  if (!grid) return;

  if (myListings.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; margin: 1rem auto;">
        <div class="empty-state-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h3 class="empty-state-title">You don't have any active listings yet</h3>
        <p class="empty-state-desc">Turn your old textbooks, unused calculators, or dorm gear into extra cash on campus!</p>
        <button type="button" class="btn btn-primary" id="empty-dashboard-post-btn">+ Post Your First Listing</button>
      </div>
    `;

    document.getElementById('empty-dashboard-post-btn')?.addEventListener('click', () => openProductModal('add'));
  } else {
    grid.innerHTML = myListings.map(createProductCardHTML).join('');
  }
}

/**
 * Render "Saved Bookmarks" View
 */
function renderSavedView() {
  const grid = document.getElementById('saved-listings-grid');
  if (!grid) return;

  const savedListings = state.products.filter(p => state.savedIds.includes(p.id));

  if (savedListings.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; margin: 1rem auto;">
        <div class="empty-state-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h3 class="empty-state-title">No saved items</h3>
        <p class="empty-state-desc">Click the bookmark icon on any product card to save items you want to keep track of.</p>
        <button type="button" class="btn btn-secondary" id="empty-saved-browse-btn">Browse All Products</button>
      </div>
    `;
    const btn = document.getElementById('empty-saved-browse-btn');
    if (btn) btn.addEventListener('click', () => switchView('explore'));
  } else {
    grid.innerHTML = savedListings.map(createProductCardHTML).join('');
  }
}

/**
 * Master render dispatcher
 */
function renderCurrentView() {
  if (state.currentView === 'explore') {
    renderMarketplaceView();
  } else if (state.currentView === 'my-listings') {
    renderMyListingsView();
  } else if (state.currentView === 'saved') {
    renderSavedView();
  }
}

/**
 * Update badge counters in the navigation header
 */
function updateCounters() {
  const myListingsCount = state.products.filter(p => isProductOwner(p)).length;
  const savedCount = state.savedIds.length;

  const myCounter = document.getElementById('my-listings-counter');
  if (myCounter) myCounter.textContent = myListingsCount;

  const savedCounter = document.getElementById('saved-counter');
  if (savedCounter) savedCounter.textContent = savedCount;
}

/**
 * Switch top-level view tabs (Explore, Dashboard, Saved)
 */
function switchView(viewName) {
  state.currentView = viewName;

  const heroSection = document.getElementById('hero-section');
  const marketplaceSection = document.getElementById('marketplace-section');
  const myListingsView = document.getElementById('my-listings-view');
  const savedView = document.getElementById('saved-view');
  const howItWorksSection = document.getElementById('how-it-works');

  const navExplore = document.getElementById('nav-explore-btn');
  const navMyListings = document.getElementById('nav-my-listings-btn');
  const navSaved = document.getElementById('nav-saved-btn');

  [navExplore, navMyListings, navSaved].forEach(btn => btn && btn.classList.remove('active'));

  if (viewName === 'explore') {
    if (heroSection) heroSection.style.display = 'block';
    if (marketplaceSection) marketplaceSection.style.display = 'block';
    if (howItWorksSection) howItWorksSection.style.display = 'block';
    if (myListingsView) myListingsView.style.display = 'none';
    if (savedView) savedView.style.display = 'none';
    if (navExplore) navExplore.classList.add('active');
    renderMarketplaceView();
  } else if (viewName === 'my-listings') {
    if (heroSection) heroSection.style.display = 'none';
    if (marketplaceSection) marketplaceSection.style.display = 'none';
    if (howItWorksSection) howItWorksSection.style.display = 'none';
    if (myListingsView) myListingsView.style.display = 'block';
    if (savedView) savedView.style.display = 'none';
    if (navMyListings) navMyListings.classList.add('active');
    renderMyListingsView();
  } else if (viewName === 'saved') {
    if (heroSection) heroSection.style.display = 'none';
    if (marketplaceSection) marketplaceSection.style.display = 'none';
    if (howItWorksSection) howItWorksSection.style.display = 'none';
    if (myListingsView) myListingsView.style.display = 'none';
    if (savedView) savedView.style.display = 'block';
    if (navSaved) navSaved.classList.add('active');
    renderSavedView();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMobileMenu();
}

/**
 * Switch Dashboard Tabs ("My Products" vs "Student Profile")
 */
function switchDashboardTab(tabName) {
  const tabProductsBtn = document.getElementById('dash-tab-products-btn');
  const tabProfileBtn = document.getElementById('dash-tab-profile-btn');
  const paneProducts = document.getElementById('dash-pane-products');
  const paneProfile = document.getElementById('dash-pane-profile');

  if (tabName === 'products') {
    tabProductsBtn?.classList.add('active');
    tabProfileBtn?.classList.remove('active');
    if (paneProducts) paneProducts.style.display = 'block';
    if (paneProfile) paneProfile.style.display = 'none';
  } else {
    tabProductsBtn?.classList.remove('active');
    tabProfileBtn?.classList.add('active');
    if (paneProducts) paneProducts.style.display = 'none';
    if (paneProfile) paneProfile.style.display = 'block';
  }
}

// =============================================================================
// 5. AUTH MODALS MANAGEMENT (LOGIN & SIGNUP)
// =============================================================================

function isAnyModalOpen() {
  return document.querySelector('.modal-backdrop.active') !== null;
}

function openLoginModal() {
  closeSignupModal();
  const modal = document.getElementById('login-modal');
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error-alert');
  if (form) form.reset();
  if (errorEl) errorEl.style.display = 'none';
  resetFormErrors();

  if (modal) {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
  }
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
    if (!isAnyModalOpen()) document.body.style.overflow = '';
  }, 250);
}

function openSignupModal() {
  closeLoginModal();
  const modal = document.getElementById('signup-modal');
  const form = document.getElementById('signup-form');
  const errorEl = document.getElementById('signup-error-alert');
  if (form) form.reset();
  if (errorEl) errorEl.style.display = 'none';
  resetFormErrors();

  if (modal) {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
  }
}

function closeSignupModal() {
  const modal = document.getElementById('signup-modal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
    if (!isAnyModalOpen()) document.body.style.overflow = '';
  }, 250);
}

function togglePasswordVisibility(inputId, toggleBtnId) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(toggleBtnId);
  if (!input || !btn) return;

  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
    btn.title = 'Hide password';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
    btn.title = 'Show password';
  }
}

// =============================================================================
// 6. ADD / EDIT PRODUCT MODAL & FORM LOGIC
// =============================================================================

function openProductModal(mode = 'add', productId = null) {
  // If user is not logged in, prompt to log in first
  if (!state.currentUser && mode === 'add') {
    showToast('Please log in with your student account to post products.', 'info');
    openLoginModal();
    return;
  }

  const modal = document.getElementById('product-modal');
  const form = document.getElementById('product-form');
  const titleEl = document.getElementById('modal-form-title');
  const subtitleEl = document.getElementById('modal-form-subtitle');
  const submitBtnText = document.getElementById('submit-btn-text');
  const editIdInput = document.getElementById('form-edit-id');

  if (!modal || !form) return;

  resetFormErrors();
  form.reset();
  form.scrollTop = 0;
  resetImageTabs();
  state.currentUploadedImage = '';

  if (mode === 'edit' && productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product || !isProductOwner(product)) {
      showToast('You can only edit your own listings.', 'error');
      return;
    }

    titleEl.textContent = 'Edit Product Listing';
    subtitleEl.textContent = 'Update the details for your campus listing.';
    submitBtnText.textContent = 'Save Changes';
    editIdInput.value = product.id;

    document.getElementById('form-title').value = product.title || '';
    document.getElementById('form-category').value = product.category || '';
    document.getElementById('form-price').value = product.price || '';
    document.getElementById('form-condition').value = product.condition || 'Like New';
    document.getElementById('form-location').value = product.location || '';
    document.getElementById('form-seller-name').value = product.sellerName || '';
    document.getElementById('form-seller-contact').value = product.sellerContact || '';
    document.getElementById('form-description').value = product.description || '';

    if (product.image) {
      state.currentUploadedImage = product.image;
      document.getElementById('form-image-url').value = product.image;
      showImagePreview(product.image);
    }
  } else {
    titleEl.textContent = 'List an Item for Sale';
    subtitleEl.textContent = 'Fill in the details below to list your item on the campus marketplace.';
    submitBtnText.textContent = 'Publish Listing';
    editIdInput.value = '';

    // Auto pre-fill seller info from currently logged in student
    if (state.currentUser) {
      document.getElementById('form-seller-name').value = state.currentUser.name || '';
      document.getElementById('form-seller-contact').value = state.currentUser.contact || state.currentUser.email;
      if (state.currentUser.location) {
        document.getElementById('form-location').value = state.currentUser.location;
      }
    }

    // Default stock preset image
    const firstPreset = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
    state.currentUploadedImage = firstPreset;
    document.getElementById('form-image-url').value = firstPreset;
    showImagePreview(firstPreset);
  }

  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('active'), 10);
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
    if (!isAnyModalOpen()) document.body.style.overflow = '';
  }, 250);
}

function validateProductForm() {
  let isValid = true;
  resetFormErrors();

  const title = document.getElementById('form-title').value.trim();
  const category = document.getElementById('form-category').value;
  const price = document.getElementById('form-price').value.trim();
  const location = document.getElementById('form-location').value.trim();
  const sellerName = document.getElementById('form-seller-name').value.trim();
  const sellerContact = document.getElementById('form-seller-contact').value.trim();
  const description = document.getElementById('form-description').value.trim();
  const image = state.currentUploadedImage || document.getElementById('form-image-url').value.trim();

  if (!title || title.length < 4) {
    showFieldError('form-title', 'error-title');
    isValid = false;
  }

  if (!category) {
    showFieldError('form-category', 'error-category');
    isValid = false;
  }

  const numPrice = parseFloat(price);
  if (price === '' || isNaN(numPrice) || numPrice < 0) {
    showFieldError('form-price', 'error-price');
    isValid = false;
  }

  if (!location) {
    showFieldError('form-location', 'error-location');
    isValid = false;
  }

  if (!sellerName) {
    showFieldError('form-seller-name', 'error-seller-name');
    isValid = false;
  }

  if (!sellerContact) {
    showFieldError('form-seller-contact', 'error-seller-contact');
    isValid = false;
  }

  if (!description || description.length < 15) {
    showFieldError('form-description', 'error-description');
    isValid = false;
  }

  if (!image) {
    const errImg = document.getElementById('error-image');
    if (errImg) errImg.classList.add('show');
    isValid = false;
  }

  if (!isValid) {
    const firstInvalid = document.querySelector('#product-form .is-invalid, #product-form .field-error.show');
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (firstInvalid.focus) firstInvalid.focus();
    }
  }

  return isValid;
}

function showFieldError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.add('is-invalid');
  if (error) error.classList.add('show');
}

function resetFormErrors() {
  document.querySelectorAll('.form-control.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  document.querySelectorAll('.field-error.show').forEach(el => el.classList.remove('show'));
}

function handleProductFormSubmit(e) {
  e.preventDefault();

  if (!validateProductForm()) {
    return;
  }

  const editId = document.getElementById('form-edit-id').value;
  const title = document.getElementById('form-title').value.trim();
  const category = document.getElementById('form-category').value;
  const price = parseFloat(document.getElementById('form-price').value.trim());
  const condition = document.getElementById('form-condition').value;
  const location = document.getElementById('form-location').value.trim();
  const sellerName = document.getElementById('form-seller-name').value.trim();
  const sellerContact = document.getElementById('form-seller-contact').value.trim();
  const description = document.getElementById('form-description').value.trim();
  const image = state.currentUploadedImage || document.getElementById('form-image-url').value.trim();

  if (editId) {
    const index = state.products.findIndex(p => p.id === editId);
    if (index > -1) {
      if (!isProductOwner(state.products[index])) {
        showToast('You can only edit your own listings.', 'error');
        return;
      }

      state.products[index] = {
        ...state.products[index],
        title,
        category,
        price,
        condition,
        location,
        sellerName,
        sellerContact,
        description,
        image
      };
      saveProducts(state.products);
      showToast('Listing updated successfully!', 'success');

      if (state.activeProductForModal && state.activeProductForModal.id === editId) {
        state.activeProductForModal = state.products[index];
        populateDetailsModal(state.products[index]);
      }
    }
  } else {
    const userEmail = state.currentUser ? state.currentUser.email : 'alex.m@campus.edu';
    const newProduct = {
      id: 'prod-' + Date.now(),
      title,
      category,
      price,
      condition,
      location,
      sellerName,
      sellerEmail: userEmail,
      sellerContact,
      description,
      image,
      isUserListing: true,
      createdAt: Date.now()
    };

    state.products.unshift(newProduct);
    saveProducts(state.products);
    showToast('Your item has been published on campus!', 'success');
  }

  closeProductModal();
  renderCurrentView();
}

function showImagePreview(src) {
  const wrapper = document.getElementById('image-preview-wrapper');
  const img = document.getElementById('form-img-preview');
  const errImg = document.getElementById('error-image');

  if (wrapper && img && src) {
    img.src = src;
    wrapper.classList.add('has-preview');
    if (errImg) errImg.classList.remove('show');
  }
}

function clearImagePreview() {
  const wrapper = document.getElementById('image-preview-wrapper');
  const img = document.getElementById('form-img-preview');
  const fileInput = document.getElementById('form-image-file');
  const urlInput = document.getElementById('form-image-url');

  if (wrapper) wrapper.classList.remove('has-preview');
  if (img) img.src = '';
  if (fileInput) fileInput.value = '';
  if (urlInput) urlInput.value = '';
  state.currentUploadedImage = '';
}

function switchImageTab(tabName) {
  document.querySelectorAll('.img-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.imgTab === tabName);
  });

  const paneUrl = document.getElementById('img-pane-url');
  const paneUpload = document.getElementById('img-pane-upload');
  const panePresets = document.getElementById('img-pane-presets');

  if (paneUrl) paneUrl.classList.toggle('active', tabName === 'url');
  if (paneUpload) paneUpload.classList.toggle('active', tabName === 'upload');
  if (panePresets) panePresets.classList.toggle('active', tabName === 'presets');
}

function resetImageTabs() {
  switchImageTab('url');
  clearImagePreview();
}

function handleFileUpload(file) {
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showToast('Please upload an image file (PNG, JPG, WebP)', 'error');
    return;
  }

  if (file.size > 4 * 1024 * 1024) {
    showToast('Image size exceeds 4MB. Please choose a smaller photo.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    state.currentUploadedImage = dataUrl;
    showImagePreview(dataUrl);
    showToast('Image uploaded successfully', 'info');
  };
  reader.onerror = function() {
    showToast('Failed to read image file', 'error');
  };
  reader.readAsDataURL(file);
}

// =============================================================================
// 7. PRODUCT DETAILS MODAL
// =============================================================================

function openDetailsModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.activeProductForModal = product;
  populateDetailsModal(product);

  const modal = document.getElementById('details-modal');
  if (modal) {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
  }
}

function populateDetailsModal(product) {
  document.getElementById('details-image').src = product.image;
  document.getElementById('details-category-badge').textContent = product.category;
  document.getElementById('details-condition-badge').textContent = product.condition;
  document.getElementById('details-category-text').textContent = product.category;
  document.getElementById('details-date-text').textContent = `Posted ${formatTimeAgo(product.createdAt)}`;
  document.getElementById('details-title').textContent = product.title;
  document.getElementById('details-price').textContent = formatPrice(product.price);
  document.getElementById('details-condition-text').textContent = product.condition;
  document.getElementById('details-location-text').textContent = product.location;
  document.getElementById('details-description').textContent = product.description;

  const initials = (product.sellerName || 'Student')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
  document.getElementById('details-seller-avatar').textContent = initials || 'ST';
  document.getElementById('details-seller-name').textContent = product.sellerName || 'Student';

  // Owner controls (only shown if current student owns this listing)
  const isOwner = isProductOwner(product);
  const ownerBadge = document.getElementById('details-owner-badge');
  const ownerActions = document.getElementById('details-owner-actions');

  if (isOwner) {
    if (ownerBadge) ownerBadge.style.display = 'block';
    if (ownerActions) ownerActions.style.display = 'flex';
  } else {
    if (ownerBadge) ownerBadge.style.display = 'none';
    if (ownerActions) ownerActions.style.display = 'none';
  }

  const isSaved = state.savedIds.includes(product.id);
  updateDetailsBookmarkButton(isSaved);
}

function updateDetailsBookmarkButton(isSaved) {
  const bookmarkBtnText = document.getElementById('details-bookmark-text');
  if (bookmarkBtnText) {
    bookmarkBtnText.textContent = isSaved ? 'Saved in Bookmarks' : 'Save Item';
  }
}

function closeDetailsModal() {
  const modal = document.getElementById('details-modal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
    if (!isAnyModalOpen()) document.body.style.overflow = '';
  }, 250);
}

// =============================================================================
// 8. CONTACT SELLER MODAL
// =============================================================================

function openContactModal() {
  const product = state.activeProductForModal;
  if (!product) return;

  const modal = document.getElementById('contact-modal');
  const nameEl = document.getElementById('contact-product-name');
  const priceEl = document.getElementById('contact-product-price');
  const valEl = document.getElementById('contact-value-display');
  const templateEl = document.getElementById('template-message-text');
  const directLink = document.getElementById('contact-direct-link');

  if (!modal) return;

  if (nameEl) nameEl.textContent = product.title;
  if (priceEl) priceEl.textContent = formatPrice(product.price);
  if (valEl) valEl.textContent = product.sellerContact || 'campus.student@college.edu';

  const defaultTemplate = `Hi ${product.sellerName || 'there'}! I saw your "${product.title}" listed on UniTrade for ${formatPrice(product.price)}. Is it still available? I can meet at ${product.location || 'the campus library'}!`;
  if (templateEl) templateEl.textContent = `"${defaultTemplate}"`;

  if (directLink) {
    const contact = (product.sellerContact || '').trim();
    if (contact.includes('@')) {
      directLink.href = `mailto:${contact}?subject=${encodeURIComponent('Inquiry: ' + product.title + ' on UniTrade')}&body=${encodeURIComponent(defaultTemplate)}`;
      directLink.textContent = 'Send Email to Seller';
    } else {
      directLink.href = `tel:${contact.replace(/[^0-9+]/g, '')}`;
      directLink.textContent = 'Call / Message Seller';
    }
  }

  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('active'), 10);
}

function closeContactModal() {
  const modal = document.getElementById('contact-modal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 250);
}

// =============================================================================
// 9. DELETE PRODUCT MODAL & FLOW
// =============================================================================

function openDeleteModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  if (!isProductOwner(product)) {
    showToast('You can only delete your own listings.', 'error');
    return;
  }

  state.productToDeleteId = productId;
  const titleEl = document.getElementById('delete-product-title');
  if (titleEl) titleEl.textContent = `"${product.title}"`;

  const modal = document.getElementById('delete-modal');
  if (modal) {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
  }
}

function closeDeleteModal() {
  const modal = document.getElementById('delete-modal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
    if (!isAnyModalOpen()) document.body.style.overflow = '';
  }, 250);
}

function confirmDeleteProduct() {
  if (!state.productToDeleteId) return;

  const id = state.productToDeleteId;
  const product = state.products.find(p => p.id === id);

  if (!product || !isProductOwner(product)) {
    showToast('You can only delete your own listings.', 'error');
    closeDeleteModal();
    return;
  }

  state.products = state.products.filter(p => p.id !== id);
  state.savedIds = state.savedIds.filter(savedId => savedId !== id);

  saveProducts(state.products);
  saveBookmarks(state.savedIds);

  closeDeleteModal();
  closeDetailsModal();
  renderCurrentView();

  showToast('Listing deleted successfully', 'info');
  state.productToDeleteId = null;
}

// =============================================================================
// 10. TOAST NOTIFICATION SYSTEM
// =============================================================================

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconSVG = '';
  if (type === 'success') {
    iconSVG = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'error') {
    iconSVG = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  } else {
    iconSVG = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    ${iconSVG}
    <span>${escapeHTML(message)}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

// =============================================================================
// 11. EVENT LISTENERS & SETUP
// =============================================================================

function setupEventListeners() {
  // --- View Switching Buttons ---
  document.getElementById('logo-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('explore');
  });

  document.getElementById('nav-explore-btn')?.addEventListener('click', () => switchView('explore'));

  document.getElementById('nav-my-listings-btn')?.addEventListener('click', () => {
    if (!state.currentUser) {
      showToast('Please log in with your student account to access your dashboard.', 'info');
      openLoginModal();
    } else {
      switchView('my-listings');
    }
  });

  document.getElementById('nav-saved-btn')?.addEventListener('click', () => switchView('saved'));

  document.getElementById('dashboard-back-btn')?.addEventListener('click', () => switchView('explore'));
  document.getElementById('saved-back-btn')?.addEventListener('click', () => switchView('explore'));
  document.getElementById('footer-link-explore')?.addEventListener('click', (e) => { e.preventDefault(); switchView('explore'); });
  document.getElementById('footer-link-mylistings')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!state.currentUser) {
      showToast('Please log in to access your dashboard.', 'info');
      openLoginModal();
    } else {
      switchView('my-listings');
    }
  });

  // --- Auth Controls in Navbar & Dashboard ---
  document.getElementById('nav-login-btn')?.addEventListener('click', openLoginModal);
  document.getElementById('nav-signup-btn')?.addEventListener('click', openSignupModal);
  document.getElementById('nav-user-profile-btn')?.addEventListener('click', () => switchView('my-listings'));
  document.getElementById('nav-logout-btn')?.addEventListener('click', logoutStudent);
  document.getElementById('dash-logout-btn')?.addEventListener('click', logoutStudent);

  // --- Auth Modal Switches & Close Actions ---
  document.getElementById('close-login-modal-btn')?.addEventListener('click', closeLoginModal);
  document.getElementById('close-signup-modal-btn')?.addEventListener('click', closeSignupModal);
  document.getElementById('switch-to-signup-btn')?.addEventListener('click', openSignupModal);
  document.getElementById('switch-to-login-btn')?.addEventListener('click', openLoginModal);

  // --- Show / Hide Password Toggles ---
  document.getElementById('toggle-login-password')?.addEventListener('click', () => {
    togglePasswordVisibility('login-password', 'toggle-login-password');
  });

  document.getElementById('toggle-signup-password')?.addEventListener('click', () => {
    togglePasswordVisibility('signup-password', 'toggle-signup-password');
  });

  // --- 1-Click Demo Login Button ---
  document.getElementById('demo-login-btn')?.addEventListener('click', () => {
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');
    if (emailInput) emailInput.value = 'alex.m@campus.edu';
    if (passInput) passInput.value = 'student123';
    loginStudent('alex.m@campus.edu', 'student123');
  });

  // --- Login & Signup Form Submissions ---
  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email')?.value;
    const pass = document.getElementById('login-password')?.value;
    loginStudent(email, pass);
  });

  document.getElementById('signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name')?.value;
    const email = document.getElementById('signup-email')?.value;
    const pass = document.getElementById('signup-password')?.value;
    const confirm = document.getElementById('signup-confirm-password')?.value;
    const dept = document.getElementById('signup-dept')?.value;
    const contact = document.getElementById('signup-contact')?.value;
    const loc = document.getElementById('signup-location')?.value;
    signupStudent(name, email, pass, confirm, dept, contact, loc);
  });

  // --- Dashboard Tab Switching ---
  document.getElementById('dash-tab-products-btn')?.addEventListener('click', () => switchDashboardTab('products'));
  document.getElementById('dash-tab-profile-btn')?.addEventListener('click', () => switchDashboardTab('profile'));

  // --- Profile Edit Form Submission ---
  document.getElementById('profile-edit-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('profile-name-input')?.value;
    const dept = document.getElementById('profile-dept-input')?.value;
    const contact = document.getElementById('profile-contact-input')?.value;
    const loc = document.getElementById('profile-location-input')?.value;
    updateStudentProfile(name, dept, contact, loc);
  });

  // --- Add Product Buttons ---
  document.getElementById('open-add-product-btn')?.addEventListener('click', () => openProductModal('add'));
  document.getElementById('dashboard-add-product-btn')?.addEventListener('click', () => openProductModal('add'));
  document.getElementById('empty-post-btn')?.addEventListener('click', () => openProductModal('add'));
  document.getElementById('footer-link-sell')?.addEventListener('click', (e) => {
    e.preventDefault();
    openProductModal('add');
  });

  // --- Form Modal Actions ---
  document.getElementById('close-form-modal-btn')?.addEventListener('click', closeProductModal);
  document.getElementById('cancel-form-btn')?.addEventListener('click', closeProductModal);
  document.getElementById('product-form')?.addEventListener('submit', handleProductFormSubmit);

  // --- Image Tabs & Preset Buttons ---
  document.querySelectorAll('.img-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchImageTab(btn.dataset.imgTab));
  });

  const urlInput = document.getElementById('form-image-url');
  if (urlInput) {
    urlInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      state.currentUploadedImage = val;
      if (val) showImagePreview(val);
      else clearImagePreview();
    });
  }

  document.querySelectorAll('.preset-thumb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.preset-thumb-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const url = btn.dataset.url;
      state.currentUploadedImage = url;
      if (urlInput) urlInput.value = url;
      showImagePreview(url);
    });
  });

  document.getElementById('btn-remove-preview')?.addEventListener('click', clearImagePreview);

  const dropArea = document.getElementById('file-drop-area');
  const fileInput = document.getElementById('form-image-file');

  if (dropArea && fileInput) {
    dropArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileUpload(e.target.files[0]);
      }
    });

    ['dragenter', 'dragover'].forEach(name => {
      dropArea.addEventListener(name, (e) => {
        e.preventDefault();
        dropArea.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      dropArea.addEventListener(name, (e) => {
        e.preventDefault();
        dropArea.classList.remove('drag-over');
      });
    });

    dropArea.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    });
  }

  // --- Synchronized Search Inputs ---
  const navSearch = document.getElementById('nav-search-input');
  const navClear = document.getElementById('nav-search-clear');
  const mobileSearch = document.getElementById('mobile-search-input');
  const mobileClear = document.getElementById('mobile-search-clear');
  const heroSearch = document.getElementById('hero-search-input');
  const heroCategory = document.getElementById('hero-category-dropdown');
  const heroSearchBtn = document.getElementById('hero-search-btn');

  function updateSearchQuery(query) {
    state.searchQuery = query;
    if (navSearch) navSearch.value = query;
    if (mobileSearch) mobileSearch.value = query;
    if (heroSearch) heroSearch.value = query;

    if (navClear) navClear.style.display = query ? 'flex' : 'none';
    if (mobileClear) mobileClear.style.display = query ? 'flex' : 'none';

    renderCurrentView();
  }

  let searchDebounceTimer = null;
  function handleSearchInput(e) {
    clearTimeout(searchDebounceTimer);
    const val = e.target.value;
    searchDebounceTimer = setTimeout(() => {
      updateSearchQuery(val);
    }, 150);
  }

  if (navSearch) {
    navSearch.addEventListener('input', handleSearchInput);
    navSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        document.getElementById('marketplace-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  if (mobileSearch) {
    mobileSearch.addEventListener('input', handleSearchInput);
    mobileSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        document.getElementById('marketplace-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  if (heroSearch) {
    heroSearch.addEventListener('input', handleSearchInput);
    heroSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        heroSearchBtn?.click();
      }
    });
  }

  if (navClear) {
    navClear.addEventListener('click', () => {
      updateSearchQuery('');
      navSearch?.focus();
    });
  }

  if (mobileClear) {
    mobileClear.addEventListener('click', () => {
      updateSearchQuery('');
      mobileSearch?.focus();
    });
  }

  document.getElementById('clear-search-link')?.addEventListener('click', () => {
    updateSearchQuery('');
  });

  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      const q = heroSearch ? heroSearch.value : '';
      const cat = heroCategory ? heroCategory.value : 'All';
      setCategoryFilter(cat);
      updateSearchQuery(q);
      document.getElementById('marketplace-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- Category Filter Pills ---
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.dataset.category;
      setCategoryFilter(cat);
    });
  });

  document.querySelectorAll('.footer-cat-link').forEach(link => {
    link.addEventListener('click', () => {
      const cat = link.dataset.category;
      switchView('explore');
      setCategoryFilter(cat);
      document.getElementById('marketplace-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.getElementById('clear-active-filter-btn')?.addEventListener('click', () => {
    setCategoryFilter('All');
  });

  document.getElementById('empty-reset-btn')?.addEventListener('click', () => {
    updateSearchQuery('');
    setCategoryFilter('All');
  });

  // --- Sort Dropdown ---
  const sortDropdown = document.getElementById('sort-dropdown');
  if (sortDropdown) {
    sortDropdown.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderCurrentView();
    });
  }

  // --- Product Card Action Delegations ---
  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;
    const productId = target.dataset.productId;
    if (!productId) return;

    switch (action) {
      case 'view-details':
        openDetailsModal(productId);
        break;
      case 'toggle-save':
        toggleSaveProduct(productId);
        break;
      case 'edit-product':
        openProductModal('edit', productId);
        break;
      case 'delete-product':
        openDeleteModal(productId);
        break;
    }
  });

  // --- Product Details Modal Actions ---
  document.getElementById('close-details-btn')?.addEventListener('click', closeDetailsModal);

  document.getElementById('details-contact-btn')?.addEventListener('click', () => {
    openContactModal();
  });

  document.getElementById('details-bookmark-btn')?.addEventListener('click', () => {
    if (state.activeProductForModal) {
      toggleSaveProduct(state.activeProductForModal.id);
    }
  });

  document.getElementById('details-share-btn')?.addEventListener('click', () => {
    if (state.activeProductForModal) {
      copyToClipboard(window.location.href);
      showToast('Listing link copied to clipboard!', 'info');
    }
  });

  document.getElementById('details-edit-btn')?.addEventListener('click', () => {
    if (state.activeProductForModal) {
      const id = state.activeProductForModal.id;
      closeDetailsModal();
      openProductModal('edit', id);
    }
  });

  document.getElementById('details-delete-btn')?.addEventListener('click', () => {
    if (state.activeProductForModal) {
      const id = state.activeProductForModal.id;
      openDeleteModal(id);
    }
  });

  // --- Contact Modal Actions ---
  document.getElementById('close-contact-modal-btn')?.addEventListener('click', closeContactModal);

  document.getElementById('btn-copy-contact')?.addEventListener('click', () => {
    if (state.activeProductForModal) {
      copyToClipboard(state.activeProductForModal.sellerContact);
      showToast('Seller contact info copied!', 'success');
    }
  });

  document.getElementById('btn-copy-template')?.addEventListener('click', () => {
    if (state.activeProductForModal) {
      const p = state.activeProductForModal;
      const text = `Hi ${p.sellerName || 'there'}! I saw your "${p.title}" listed on UniTrade for ${formatPrice(p.price)}. Is it still available? I can meet at ${p.location || 'the campus library'}!`;
      copyToClipboard(text);
      showToast('Message template copied to clipboard!', 'success');
    }
  });

  // --- Delete Modal Actions ---
  document.getElementById('cancel-delete-btn')?.addEventListener('click', closeDeleteModal);
  document.getElementById('confirm-delete-btn')?.addEventListener('click', confirmDeleteProduct);

  // --- Backdrop Modal Dismissal ---
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        if (backdrop.id === 'product-modal') closeProductModal();
        else if (backdrop.id === 'details-modal') closeDetailsModal();
        else if (backdrop.id === 'contact-modal') closeContactModal();
        else if (backdrop.id === 'delete-modal') closeDeleteModal();
        else if (backdrop.id === 'login-modal') closeLoginModal();
        else if (backdrop.id === 'signup-modal') closeSignupModal();
      }
    });
  });

  // --- Escape Key to Close Modals in reverse stacking order ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (document.getElementById('signup-modal')?.classList.contains('active')) {
        closeSignupModal();
      } else if (document.getElementById('login-modal')?.classList.contains('active')) {
        closeLoginModal();
      } else if (document.getElementById('delete-modal')?.classList.contains('active')) {
        closeDeleteModal();
      } else if (document.getElementById('contact-modal')?.classList.contains('active')) {
        closeContactModal();
      } else if (document.getElementById('product-modal')?.classList.contains('active')) {
        closeProductModal();
      } else if (document.getElementById('details-modal')?.classList.contains('active')) {
        closeDetailsModal();
      }
    }
  });

  // --- Mobile Hamburger Menu ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // --- Navbar shadow on scroll ---
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
  }, { passive: true });
}

function setCategoryFilter(category) {
  state.currentCategory = category;

  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.category === category);
  });

  const heroCat = document.getElementById('hero-category-dropdown');
  if (heroCat) heroCat.value = category;

  renderCurrentView();
}

function closeMobileMenu() {
  const navMenu = document.getElementById('nav-menu');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  if (navMenu) navMenu.classList.remove('open');
  if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(tempInput);
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// =============================================================================
// 12. APP BOOTSTRAP
// =============================================================================

document.addEventListener('DOMContentLoaded', async () => {
  await initAuthStorage();
  initStorage();
  setupEventListeners();
  updateAuthUI();
  updateCounters();
  renderCurrentView();
  console.log('UniTrade Campus Marketplace with Student Authentication initialized successfully.');
});
