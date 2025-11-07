# Vercel Deployment Setup

## Important: Root Directory Configuration

For CSS and JavaScript files to load correctly on Vercel, you **must** configure the Root Directory in your Vercel project settings:

### Steps:
1. Go to your Vercel project dashboard
2. Click on **Settings**
3. Go to **General** → **Root Directory**
4. Set the Root Directory to: `public`
5. Save and redeploy

Alternatively, if your repository root is `Clxak.-main`, set it to: `Clxak.-main/public`

## File Structure
- All HTML files reference CSS as `/css/filename.css`
- All HTML files reference JS as `/js/filename.js`
- The `vercel.json` is in the project root
- The `public` folder contains all static files

## Authentication System

The site uses a **non-bypassable login system**:
- Login form is on the home page (`/`)
- Uses `sessionStorage` for tab-specific authentication
- **Authentication expires when the tab is closed** (sessionStorage behavior)
- URL does not change after login - content is shown/hidden dynamically
- Protected pages (`/games`, `/tools`) check authentication and redirect to `/` if not authenticated
- Password: `unhiin@clxak.com`

## After Configuration
1. Push your changes to GitHub
2. Vercel will automatically redeploy
3. CSS and JavaScript should now load correctly
4. Test the login system - it should require login on every new tab

