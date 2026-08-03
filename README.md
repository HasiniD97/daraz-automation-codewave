# 🛒 Daraz E-Commerce Automation Test Suite (Playwright)

![Playwright](https://img.shields.io/badge/Playwright-E2E%20Testing-green?style=for-the-badge&logo=playwright)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge&logo=node.js)

An end-to-end (E2E) automated testing suite built with **Playwright** and **JavaScript** for validating core user flows on the **Daraz** e-commerce platform. Built using the **Page Object Model (POM)** pattern as part of the **Codewave QA Bootcamp — Week 3 Assignment**.

---

## 📌 Test Coverage & Specification Matrix

### 🔐 1. Login & Language (`login.spec.js`)
* **TC-01:** Successful login with valid credentials
* **TC-02:** Multi-language UI (English/Sinhala)
* **TC-17:** Switch language to Sinhala and back to English

### 🏠 2. Homepage (`home.spec.js`)
* **TC-10:** Homepage loads with correct title and URL
* **TC-11:** Key header elements visible (search, login, cart, language)
* **TC-12:** Guest cart badge is empty or zero
* **TC-13:** Logo navigates back to homepage from catalog

### 🔑 3. Authentication (`auth.spec.js`)
* **TC-14:** Login modal shows email and password fields
* **TC-15:** Invalid credentials do not log user in
* **TC-16:** Logout returns user to guest state

### 🔍 4. Search (`search.spec.js`)
* **TC-03:** Product search by keyword
* **TC-04:** Search auto-suggestion visibility
* **TC-05:** Price range filter (Min/Max)
* **TC-06:** Brand filter on search results
* **TC-18:** Search URL contains query parameter
* **TC-19:** Search results display product listing items
* **TC-20:** Invalid search shows zero results
* **TC-21:** Suggestion list includes typed keyword
* **TC-22:** Run consecutive searches with different keywords

### 📦 5. Product Details (`product.spec.js`)
* **TC-23:** Product page shows Add to Cart button
* **TC-24:** Navigating to product updates URL to `/products/`
* **TC-25:** Product page shows Buy Now button

### 🛒 6. Cart (`cart.spec.js`)
* **TC-07:** Add to cart and badge update
* **TC-08:** Cart persistence after reload
* **TC-09:** Remove item and badge update
* **TC-26:** Cart badge increases after adding another product

---

## 📂 Project Directory Structure

```text
DarazAutomationCodewave/
├── .github/                  # GitHub Actions CI workflows
├── common/                   # Global constants and selectors
│   └── constants.js
├── data/                     # External JSON test data
│   ├── products.json
│   └── user.json
├── env/                      # Environment settings
├── pages/                    # Page Object Models (POM)
│   ├── common/
│   │   └── SearchBar.js      # Global search bar component
│   ├── home/
│   │   └── HomePage.js       # Main homepage POM
│   ├── products/
│   │   ├── ProductsPage.js   # Product listing page POM
│   │   └── SingleProductPage.js # Product details page POM
│   ├── user/
│   │   ├── CartPage.js       # Shopping cart POM
│   │   ├── LoginPage.js      # Login and account POM
│   │   └── SettingPage.js    # User settings POM
│   └── BasePage.js           # Base Page Object abstraction
├── playwright/.auth/         # Generated browser auth session states
│   └── user.json
├── util/                     # Test utilities & loggers
│   ├── helper.js             # Shared test helpers
│   └── loggers.js            # Custom execution logger
├──tests/
├── smoke/
└── specs/
    ├── auth.setup.js         # Global authentication setup
    ├── auth.spec.js
    ├── cart.spec.js
    ├── home.spec.js
    ├── login.spec.js
    ├── product.spec.js
    └── search.spec.js
├── .gitignore                # Git exclusion configuration
├── package.json              # Project dependencies and scripts
└── playwright.config.js      # Playwright test configuration
```

---

## 🚀 Getting Started

### **Prerequisites**
* **Node.js**: `v18.0.0` or higher
* **Git**: Installed on your system

### **1. Clone the Repository**
```bash
git clone https://github.com/HasiniD97/DarazAutomationCodewave.git
cd DarazAutomationCodewave
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Install Playwright Browsers**
```bash
npx playwright install
```

---

## 🧪 Running the Tests

### **Run All Tests (Headless Mode)**
```bash
npx playwright test
```

### **Run Tests in Interactive UI / Headed Mode**
```bash
npx playwright test --headed
```

### **Run Specific Spec File**
```bash
# Run Cart Test Suite
npx playwright test tests/specs/cart.spec.js

# Run Search Test Suite
npx playwright test tests/specs/search.spec.js
```

### **View HTML Execution Report**
```bash
npx playwright show-report
```

---

## 👤 Author & Submission Information

* **Author:** Hasini ([@HasiniD97](https://github.com/HasiniD97))
* **Project:** Codewave QA Bootcamp — Week 3 Assignment
