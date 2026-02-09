# roso

## Adding the Hero Background Video

The home page hero section supports a background video. Because the video file is larger than GitHub's 25 MB limit, this project uses **[Git Large File Storage (LFS)](https://git-lfs.github.com/)** to track video files.

### Steps to add the video

1. **Install Git LFS** (one-time setup):
   ```bash
   git lfs install
   ```

2. **Place your video file** in the project root as `hero-video.mp4`.

3. **Commit and push** as usual — Git LFS will handle the large file automatically:
   ```bash
   git add hero-video.mp4
   git commit -m "Add hero background video"
   git push
   ```

The `.gitattributes` file already tracks `*.mp4`, `*.webm`, `*.mov`, and `*.avi` via LFS, so any video file you add will be stored correctly.
