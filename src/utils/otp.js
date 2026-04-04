import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

/** Generate a cryptographically-random 6-digit OTP string */
export const generateOTP = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(100000 + (array[0] % 900000));
};

/**
 * sendOTPEmail(toEmail)
 * Sends the OTP to the given email address via EmailJS.
 * Returns: { success: true, otp: '123456' } | { success: false, message: '...' }
 */
export const sendOTPEmail = async (toEmail) => {
  const otp = generateOTP();

  const templateParams = {
    to_email:   toEmail,
    otp,
    admin_name: 'Admin',
  };

  try {
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    return { success: true, otp };
  } catch (err) {
    console.error('EmailJS error:', err);
    return { success: false, message: 'Failed to send OTP. Check EmailJS configuration.' };
  }
};
