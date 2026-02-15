// phoneEmailService.js

import { waitForPhoneEmail } from "./phoneEmailSdk.js";

/**
 * Send OTP to the provided phone number
 * @param {string} phoneNumber - The phone number to send OTP to
 * @returns {Promise<Object>} Resolves with the OTP response
 */
export async function sendOTP(phoneNumber) {
  const phoneEmail = await waitForPhoneEmail();
  return new Promise((resolve, reject) => {
    phoneEmail.startPhoneVerification({
      phoneNumber: phoneNumber,
      countryCode: "+91",
      onSuccess: resolve,
      onError: reject
    });
  });
}

/**
 * Verify the OTP entered by the user
 * @param {string} otp - The OTP code to verify
 * @returns {Promise<Object>} Resolves with the verification response
 */
export async function verifyOTP(otp) {
  const phoneEmail = await waitForPhoneEmail();
  return new Promise((resolve, reject) => {
    phoneEmail.verifyOTP({
      otp,
      onSuccess: resolve,
      onError: reject
    });
  });
}
