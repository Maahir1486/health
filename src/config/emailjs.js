/**
 * EmailJS Configuration
 * ─────────────────────
 * 1. Go to https://www.emailjs.com/ and create a free account.
 * 2. Add a Gmail service  → copy the Service ID.
 * 3. Create an Email Template with these variables:
 *      {{to_email}}  – recipient address
 *      {{otp}}       – the 6-digit code
 *      {{admin_name}} – name shown in email body
 * 4. Copy the Template ID and your Public Key (Account → API Keys).
 * 5. Paste them below.
 */

export const EMAILJS_CONFIG = {
  SERVICE_ID:  'your_service_id',   // e.g. 'service_abc123'
  TEMPLATE_ID: 'your_template_id',  // e.g. 'template_xyz456'
  PUBLIC_KEY:  'your_public_key',   // e.g. 'aBcDeFgHiJkLmNoPq'
};

/**
 * Pre-authorised admin email addresses (hardcoded fallback).
 * Dynamically registered admins are stored in localStorage.
 */
export const AUTHORIZED_ADMIN_EMAILS = [
  // 'pkumar@admin.edu',  ← remove or keep as fallback
];

/**
 * Secret key required during admin sign-up.
 * Change this to something strong before deploying.
 */
export const ADMIN_SECRET_KEY = 'wellnest@admin2024';
