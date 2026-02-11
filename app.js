import { generateUserId } from "./uidService.js";

// Phone.Email listener callback
window.phoneEmailListener = async (userObj) => {
  const user_json_url = userObj.user_json_url;

  try {
    // Fetch user details from the verified JSON URL
    const response = await fetch(user_json_url);
    const userData = await response.json();

    const user_country_code = userData.user_country_code;
    const user_phone_number = userData.user_phone_number;

    const userId = generateUserId();

    const resultHtml = `
      <h3 style="color: green;">Phone Verification Successful!</h3>
      <p><strong>Phone Number:</strong> ${user_country_code} ${user_phone_number} ✓ Already Verified</p>
      <p><strong>OTP:</strong> Verified securely at your phone (not exposed for security reasons)</p>
      <p><strong>Generated User ID:</strong> ${userId}</p>
    `;

    document.getElementById("result").innerHTML = resultHtml;

    console.log("Verified Phone Number:", user_phone_number);
    console.log("Generated User ID:", userId);
  } catch (err) {
    console.error("Error fetching user data:", err);
    document.getElementById("result").innerHTML = `<p style="color: red;">Error retrieving user data. Check console for details.</p>`;
  }
};
