# Unlocked4U Media: Static Website

Pure HTML/CSS/JS. No build step. `index.html` is in the root.

## Before launch
1. `assets/js/config.js`: set `email` and the four channel links (all four currently use the supplied URL; change each one individually: history, facts, sports, travel).
2. Search all files for `YOUR-DOMAIN.com` (canonical, Open Graph, `sitemap.xml`, `robots.txt`) and replace with your domain.
3. Fill placeholders in `privacy.html` / `terms.html` (`[COMPANY LEGAL NAME]`, `[CONTACT EMAIL]`, etc.) and have them legally reviewed.

## Deploy: Cloudflare Pages (easiest on Android)
1. Cloudflare dashboard > Workers & Pages > Create > Pages > **Upload assets**.
2. Name the project, then upload the **unzipped** site files (or the ZIP; `index.html` must sit at the root, not inside a subfolder). Click Deploy.

## Deploy: Workers Static Assets
Uploading a ZIP into the online Worker code editor does **not** deploy a static site. Use Wrangler (a computer or a cloud IDE) or Git-connected builds:
1. `npx wrangler deploy` from this folder, using the **example** `wrangler.jsonc` (ready to use for a new static-only Worker; rename `name`).
2. **Existing Worker:** do not replace its config or code. Copy only the `"assets": { "directory": "..." }` block into your existing config, keep your `main` entry and bindings, and put the site in a folder (e.g. `./public`, then set `directory` to it). Requests matching a static file are served from assets; others reach your Worker code (add `"run_worker_first": true` if the Worker must handle everything first). Deploy with `npx wrangler deploy`.
3. For a clean 404 page add `"not_found_handling": "404-page"` inside `assets`. Ensure `wrangler.jsonc`, `README.md` are not in the asset folder if you don't want them public.

## Custom domain
Cloudflare dashboard > your Pages project (or Worker) > **Custom domains** > Set up a domain. If the domain's DNS is on Cloudflare it is configured automatically; otherwise add the domain to Cloudflare and update nameservers at your registrar. Then replace `YOUR-DOMAIN.com` as above.

## Notes
- The contact form uses `mailto:`: it opens the visitor's email app and stores nothing.
- Google Fonts are optional enhancement; system fonts are the fallback.
