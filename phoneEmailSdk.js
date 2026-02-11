export function getPhoneEmail() {
  return window.phoneEmail;
}

//timeout function to wait for the SDK to load
export function waitForPhoneEmail() {
  return new Promise((resolve, reject) => {
    const maxAttempts = 50; // 5 seconds
    let attempts = 0;

    const checkSDK = () => {
      if (window.phoneEmail) {
        resolve(window.phoneEmail);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkSDK, 100);
      } else {
        reject(new Error("Phone.Email SDK failed to load"));
      }
    };

    checkSDK();
  });
}
