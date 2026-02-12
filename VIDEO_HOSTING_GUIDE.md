# Video Hosting Guide for ROSO Esports Website

## Issue
The hero background video on the homepage is currently not displaying because Google Drive direct links are blocked by most modern browsers for security reasons.

## Solutions

### Option 1: Host Video in Repository (Recommended for smaller videos)
If your video file is under 50MB, you can host it directly in the repository:

1. Create an `assets/videos/` directory
2. Add your video file (e.g., `hero-background.mp4`)
3. Update `index.html` line 96 to:
   ```html
   <source src="assets/videos/hero-background.mp4" type="video/mp4">
   ```
4. Update the fullscreen overlay video source at line 121 similarly

**Note:** Git has file size limits, so this works best for compressed/optimized videos.

### Option 2: Use GitHub Releases
For larger video files:

1. Go to your repository's Releases page
2. Create a new release and upload your video file
3. Copy the direct download URL
4. Update the video source in `index.html`

### Option 3: Use a Video CDN (Recommended for production)
For the best performance and reliability:

**Free Options:**
- **Cloudflare R2** - Free tier available, excellent performance
- **Bunny.net** - Pay-as-you-go pricing, very affordable
- **BackBlaze B2** - Free tier includes 10GB storage

**Steps:**
1. Sign up for a CDN service
2. Upload your video
3. Get the public URL
4. Update both video sources in `index.html` (lines 96 and 121)

### Option 4: Use Vimeo or YouTube
If you don't mind the branding:

1. Upload to Vimeo or YouTube
2. Get the embed code
3. You'll need to modify the hero section to use an iframe instead of a video element

## Current Fallback
Until the video is properly hosted, the site displays a stylish gradient background fallback, so the site still looks professional.

## Video Optimization Tips
- Use H.264 codec for maximum browser compatibility
- Keep file size under 10MB if possible for faster loading
- Consider 720p or 1080p resolution (4K is usually overkill for background videos)
- Aim for 24-30 fps (no need for 60fps on background videos)
- Use tools like HandBrake or FFmpeg to optimize
