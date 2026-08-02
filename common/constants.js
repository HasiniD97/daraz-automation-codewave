const BASE_URL = process.env.BASE_URL || 'https://www.daraz.lk';

const SELECTORS = {
  loginTrigger: '#anonLogin',
  accountTrigger: '#myAccountTrigger',
  languageSwitch: '#topActionSwitchLang',
  dialogClose: '.next-dialog-close',
  loginError: '.nextera-feedback-error, .next-feedback-error, [class*="error"]',
  searchInput: 'Search in Daraz',
  searchSuggestList : '[class*="suggest-list"]',
  flashSaleText : '#js_flashSale',
  brandCheckbox: '.ant-checkbox-wrapper',
  addToCartButton : 'Add to Cart',
  buyNowButton : 'Buy Now',

  //Cart
  cartBadge: '#topActionHeader svg',
  cartCount: '#topActionCartNumber',

  //Daraz Logo
  darazLogo: '.lzd-logo-content',


  //display filtered products detail 
  filterDetail : '.ant-tag',

  //product page
  productCard : '[data-qa-locator="product-item"]',

};

const ROUTES = {
  home: '/',
  catalog: '/catalog/',
};

const TIMEOUTS = {
  default: 15000,
  navigation: 30000,
};

module.exports = { BASE_URL, SELECTORS, TIMEOUTS };
