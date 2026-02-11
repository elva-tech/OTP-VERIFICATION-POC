// phoneEmailService.js

import { getPhoneEmail } from "./phoneEmailSdk.js";

export function sendOTP(phoneNumber) {
  return new Promise((resolve, reject) => {
    const phoneEmail = getPhoneEmail();
    if (!phoneEmail) {
      reject(new Error("Phone.Email SDK not loaded"));
      return;
    }
    phoneEmail.startPhoneVerification({
      phoneNumber: phoneNumber,
      countryCode: "+91",
      onSuccess: resolve,
      onError: reject
    });
  });
}

export function verifyOTP(otp) {
  return new Promise((resolve, reject) => {
    const phoneEmail = getPhoneEmail();
    if (!phoneEmail) {
      reject(new Error("Phone.Email SDK not loaded"));
      return;
    }
    phoneEmail.verifyOTP({
      otp,
      onSuccess: resolve,
      onError: reject
    });
  });
}
