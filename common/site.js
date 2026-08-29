/** Sri Lanka storefront — all automation targets this host only. */
const DARAZ_HOST = 'daraz.lk';

const DARAZ_URL_PATTERN = new RegExp(
  `https?://(www\\.)?${DARAZ_HOST.replace('.', '\\.')}`,
  'i',
);

function getDarazBaseUrl() {
  return process.env.BASE_URL || `https://www.${DARAZ_HOST}`;
}

module.exports = {
  DARAZ_HOST,
  getDarazBaseUrl,
  DARAZ_URL_PATTERN,
};
