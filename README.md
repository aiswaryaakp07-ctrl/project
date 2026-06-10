# Class Distraction Detector Demo

A simple demo website that uses a Teachable Machine image model to classify attention states in class:

- `low distracted`
- `medium distracted`
- `highly distracted`

## Setup (local)

1. Place your exported Teachable Machine model files in `my_model/` next to `project.html`.
   - `model.json`
   - `metadata.json`
   - `weights.bin` (if present)
2. Run a local static server to allow webcam access and fetches. Examples:

```bash
npx http-server .
# or
npx serve .
```

3. Open `http://localhost:8080` (or the port shown by the server) and click **Start Camera**.

## GitHub Pages deployment

To publish this demo on GitHub Pages:

1. Create a GitHub repository and push the contents of this project folder to it.
2. Ensure `index.html` is present at the repository root (this project includes an `index.html` that redirects to `project.html`).
3. In your repository settings → Pages, choose the branch to serve from (`main` or `master`) and the root folder `/`.
4. Save settings; your site will be published at `https://<your-username>.github.io/<repo>/`.

Notes:
- GitHub Pages serves static files; ensure `project.html` and `my_model/` are committed if you want to host a local model (publishing large model weights may hit size limits).
- If you prefer hosting only the page and loading a remote Teachable Machine model, set `URL` in `script.js` to the published model URL.

## Troubleshooting

- If the page shows a 404 on GitHub Pages, confirm `index.html` exists at repository root and casing matches exactly.
- If the webcam doesn't start, open the page from `http://localhost` (not `file://`) and allow camera permissions in the browser.
- Use the **Check Model URL** / **Test Model** button to verify `model.json` is reachable.

## License

This demo is provided as-is for educational use.
