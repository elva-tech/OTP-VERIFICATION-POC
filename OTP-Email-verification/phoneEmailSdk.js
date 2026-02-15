// Configuration constants
const SDK_LOAD_CONFIG = {
  MAX_ATTEMPTS: 50,      // Maximum polling attempts
  POLL_INTERVAL: 100,    // Milliseconds between polls (5 seconds total: 50 * 100)
  TIME_LIMIT: 5000       // 5 seconds timeout
};

/**
 * Get the Phone.Email SDK from window object
 * @returns {Object|null} The Phone.Email SDK or null if not loaded
 */
export function getPhoneEmail() {
  return window.phoneEmail;
}

/**
 * Wait for the Phone.Email SDK to load with polling
 * @returns {Promise<Object>} Resolves with the loaded SDK object
 * @throws {Error} If SDK fails to load within the timeout period
 */
export function waitForPhoneEmail() {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    let timeoutId;

    const checkSDK = () => {
      if (window.phoneEmail) {
        resolve(window.phoneEmail);
      } else if (attempts < SDK_LOAD_CONFIG.MAX_ATTEMPTS) {
        attempts++;
        timeoutId = setTimeout(checkSDK, SDK_LOAD_CONFIG.POLL_INTERVAL);
      } else {
        reject(new Error(
          `Phone.Email SDK failed to load after ${attempts} attempts (${SDK_LOAD_CONFIG.TIME_LIMIT}ms)`
        ));
      }
    };

    checkSDK();

    // Set an absolute timeout limit
    const absoluteTimeout = setTimeout(() => {
      reject(new Error("Phone.Email SDK load timeout exceeded"));
    }, SDK_LOAD_CONFIG.TIME_LIMIT + 1000);

    // Cleanup on success or error
    const promise = new Promise(() => checkSDK()).catch(() => {
      clearTimeout(timeoutId);
      clearTimeout(absoluteTimeout);
    });
  });
}
