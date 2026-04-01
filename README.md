# Yogesh K — Digital Workplace Portal

Personal portal for modern workplace IT guidance, frameworks, tools and accelerators.

## 🗂 Structure

```
yogesh-portal/
├── index.html              ← Main landing page (all sections)
├── assets/
│   ├── css/
│   │   └── style.css       ← All styles (CSS variables, responsive)
│   └── js/
│       └── main.js         ← Canvas animation, typing, scroll reveal, nav
└── README.md
```

## 🚀 Deploy to GitHub Pages

1. Push this folder to a GitHub repo (e.g. `yogeshkadav.github.io`)
2. Go to **Settings → Pages → Source: main branch / root**
3. Your portal will be live at `https://yogeshkadav.github.io`

### Custom Domain (optional)
1. Add a `CNAME` file to the root containing your domain: `yogeshkadav.com`
2. Point your DNS `A` records to GitHub Pages IPs
3. Enable HTTPS in GitHub Pages settings

## ✏️ Customise

- **Personal details** — Update name, bio, LinkedIn/GitHub URLs, email in `index.html`
- **Timeline** — Edit the `<div class="timeline">` section in `#about`
- **Frameworks** — Add/remove `.fw-card` blocks in `#frameworks`
- **Tools** — Add/remove `.tool-card` blocks in `#tools`
- **Blog posts** — Add/remove `<article class="blog-card">` in `#blog`
- **Colours** — Change CSS variables at top of `style.css`
- **Stats** — Update `data-count` attributes on hero stat numbers

## 🧩 Extending

To add new pages (e.g. a full blog post page):
1. Create `pages/post-name.html`
2. Copy the nav/footer from `index.html`
3. Link from blog cards: `<a href="pages/post-name.html">`

## 📦 No Build Step Required

Pure HTML/CSS/JS — no npm, no bundler, no framework. Works offline.
Google Fonts load from CDN; everything else is self-contained.
