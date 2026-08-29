const { TIMEOUTS } = require('../common/constants');

/**
 * Prefer Playwright auto-waiting and expect() over fixed sleeps.
 * Use these helpers when the UI needs an explicit readiness signal.
 */
async function waitForPageReady(page, options = {}) {
  const timeout = options.timeout ?? TIMEOUTS.navigation;
  await page.waitForLoadState('load', { timeout });
  if (options.networkIdle) {
    await page.waitForLoadState('networkidle', { timeout });
  }
}

async function waitForLocatorState(locator, state = 'visible', options = {}) {
  const timeout = options.timeout ?? TIMEOUTS.default;
  await locator.waitFor({ state, timeout });
}

module.exports = {
  waitForPageReady,
  waitForLocatorState,
};
