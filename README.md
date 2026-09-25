# Muneeb — Linux Desktop Security Portfolio

Complete GitHub Pages edition of the portfolio, preserving all five pages, desktop styling, terminal navigation, dock, window controls, appearance preference, project filters, and AI topic explorer.

## Publish at YOUR_USERNAME.github.io

1. Create a repository named exactly `YOUR_USERNAME.github.io` in your GitHub account. Replace `YOUR_USERNAME` with your actual GitHub username. A public repository supports GitHub Pages on the free plan.
2. Extract this ZIP and place its **contents** at the repository root. `index.html` must be at the root, not inside an extra folder. Include `.github/workflows/pages.yml` and `.nojekyll` (these may be hidden in your file manager).
3. In the repository, open **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**.
4. Commit/push the files to `main`. If you uploaded them before selecting the Pages source, open **Actions → Publish portfolio to GitHub Pages → Run workflow**.
5. Wait for the workflow to finish. GitHub will show the published URL in Settings → Pages and in the workflow deployment.

If the repository already has a website, back it up and review the replacement before overwriting files.

## Publish under a project repository

The same files also work in a repository such as `security-portfolio`, at `https://YOUR_USERNAME.github.io/security-portfolio/`. Internal links and terminal navigation support either location without code changes.

## Uploading without the workflow

For a browser-only upload, upload the visible site files and folders to `main`, then select **Settings → Pages → Deploy from a branch → main → /(root)**. If the workflow is present, use GitHub Actions instead to avoid two publishing methods. Do not upload the ZIP itself as the website; extract it first.

## Local preview

From this folder run:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/. Use a web server instead of opening HTML directly.

## Files

- `index.html`: desktop homepage
- `expertise/index.html`: security expertise
- `projects/index.html`: planned lab projects
- `ai-security/index.html`: searchable AI security knowledge map
- `about/index.html`: background and cloud certifications
- `styles.css`, `desktop.css`: shared design
- `app.js`, `desktop.js`: navigation, searches, filters, and desktop interactions
- `.github/workflows/pages.yml`: GitHub Pages publishing workflow

## Editing and updates

Edit page text in its HTML file and push to `main` to publish. Project entries are explicitly marked as planned labs; update those labels only when the work is completed. The terminal supports `help`, `ls`, `whoami`, `clear`, `home`, `expertise`, `projects`, `ai`, and `about`. The navigation menu opens with Ctrl/Cmd+K. Appearance is a local browser preference; there is no backend or login.

The previous private Sites URL remains separate. Standard GitHub Pages publishing makes this portfolio publicly accessible.

## GitHub documentation

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
