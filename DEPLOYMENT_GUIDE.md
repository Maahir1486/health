# Deployment Guide for Vite React App

To fulfill the criteria for your Review 1, you need to deploy the React front-end application so it's publicly accessible. We recommend using **Vercel** or **Netlify** since they are free and automatically support Vite.

## Method 1: Deploy to Vercel (Recommended)

1. Push your code to a GitHub repository.
2. Go to [Vercel.com](https://vercel.com/) and sign up with your GitHub account.
3. Click on **"Add New..."** and select **"Project"**.
4. Import your newly created GitHub repository.
5. Vercel will auto-detect that it is a **Vite** project. 
    - The build command will be `npm run build`
    - The output directory will be `dist`
6. Click **Deploy**.
7. Once finished, Vercel will provide you with a live URL (e.g., `https://wellnest-health.vercel.app`).
8. Paste this link into your LinkedIn article!

## Method 2: Deploy to Netlify

1. Push your code to GitHub.
2. Go to [Netlify.com](https://www.netlify.com/) and log in with GitHub.
3. Click **"Add new site"** -> **"Import an existing project"**.
4. Authorize Netlify to access your GitHub and select your repository.
5. Set the Build Command to `npm run build` and Publish Directory to `dist`.
6. Go to **"Advanced build settings"** (if needed) but usually, Netlify auto-detects Vite.
7. Click **Deploy site**.
8. Go to "Site settings" to rename your URL if you want something cleaner.
9. Copy your URL and paste it into the LinkedIn article!

Good luck with your review!
