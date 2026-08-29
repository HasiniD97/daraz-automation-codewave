const users = require('../data/user.json');
const products = require('../data/products.json');

/**
 * Resolves credentials from environment variables first (CI/local secrets),
 * then falls back to JSON test data.
 */
function getValidUser() {
  return {
    email: process.env.TEST_USER_EMAIL || users.valid.email,
    password: process.env.TEST_USER_PASSWORD || users.valid.password,
    displayName: process.env.TEST_USER_DISPLAY_NAME || users.valid.displayName,
    language: users.valid.language,
  };
}

function getInvalidUser() {
  return {
    email: process.env.TEST_INVALID_USER_EMAIL || users.invalid.email,
    password: process.env.TEST_INVALID_USER_PASSWORD || users.invalid.password,
  };
}

function getProduct(category) {
  const product = products[category];
  if (!product) {
    throw new Error(`Unknown product category "${category}". Check data/products.json.`);
  }
  return product;
}

function getAllProducts() {
  return products;
}

module.exports = {
  getValidUser,
  getInvalidUser,
  getProduct,
  getAllProducts,
};
