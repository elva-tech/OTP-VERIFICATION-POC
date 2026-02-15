// ==========================================
// 🔹 IMPORTS
// ==========================================

import { generateUserId } from "./uidService.js";


// ==========================================
// 🔹 HELPER FUNCTION
// ==========================================

function saveSession(userId, type, value) {
  localStorage.setItem("userId", userId);
  localStorage.setItem("authType", type);
  localStorage.setItem("authValue", value);
}

function displaySuccess(title, label, value, userId) {
  document.getElementById("result").innerHTML = `
    <h3 style="color: green;">${title}</h3>
    <p><strong>${label}:</strong> ${value}</p>
    <p><strong>User ID:</strong> ${userId}</p>
  `;
}


// ==========================================
// 🔹 PHONE OTP CALLBACK
// ==========================================

window.phoneEmailListener = async (userObj) => {

  try {
    const response = await fetch(userObj.user_json_url);
    const userData = await response.json();

    const phoneNumber =
      userData.user_country_code + " " + userData.user_phone_number;

    const userId = generateUserId();

    saveSession(userId, "phone", phoneNumber);

    displaySuccess(
      "Phone Verification Successful",
      "Phone Number",
      phoneNumber,
      userId
    );

  } catch (error) {
    document.getElementById("result").innerHTML =
      `<p style="color:red;">Phone verification failed.</p>`;
  }
};


// ==========================================
// 🔹 EMAIL OTP CALLBACK
// ==========================================

window.phoneEmailReceiver = async (userObj) => {

  try {
    const response = await fetch(userObj.user_json_url);
    const userData = await response.json();

    const email = userData.user_email_id;

    const userId = generateUserId();

    saveSession(userId, "email", email);

    displaySuccess(
      "Email Verification Successful",
      "Email",
      email,
      userId
    );

  } catch (error) {
    document.getElementById("result").innerHTML =
      `<p style="color:red;">Email verification failed.</p>`;
  }
};



