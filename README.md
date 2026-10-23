# Roamwell

Roamwell is a multi-page, browser-only trip planner for short India getaways. It uses plain HTML, CSS, and vanilla JavaScript: there is no backend, framework, package install, or build step. The pages work from a local folder and can be published as a GitHub Pages project site.

All route and stylesheet links are relative so the site also works from a repository subpath such as `https://username.github.io/repo-name/`.

## Features

- Four-step trip flow: choose a style, browse Maharashtra destinations, set preferences, and view a day-by-day plan.
- Maharashtra-only getaways with one-to-three-day itineraries, named stops, addresses, average visit durations, and day routes grouped by nearby areas.
- Vegetarian/non-vegetarian breakfast, lunch, and dinner choices, plus up to five hotel options per destination with Google Maps links for current reviews and directions.
- Approximate INR cost estimates by budget level, including group-size calculations, shared-room assumptions, and a 10% buffer.
- Activity highlights based on selected interests, meal suggestions, stays, budget chart, packing checklist, and practical notes.
- Browser-local plan saving, opening, deleting, comparing, and shareable query-string links.
- Responsive navigation, keyboard-friendly controls, persistent light/dark theme, and print styles for saving a plan as PDF.
- About, contact (`mailto:`), FAQ, and GitHub Pages 404 pages.

Prices and travel information are illustrative planning estimates, not booking quotes or official advice. Verify current prices, availability, opening hours, transport, permits, and safety information before travel. Saved plans and theme preferences are held in the current browser's localStorage; there is no server or cross-device sync.

## Destination photo credits

- [Alibaug Beach](https://commons.wikimedia.org/wiki/File:Alibaug_Beach.jpg) by Rishi Darak, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Pune to Lonavala scenic beauty](https://commons.wikimedia.org/wiki/File:Pune_to_lonavala_scenic_beauty.jpg) by Neerajks7690, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Mahabaleshwar valley](https://commons.wikimedia.org/wiki/File:Mahabaleshwar_valley.jpg) by Aalokmjoshi, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Sula Vineyards in Nashik](https://commons.wikimedia.org/wiki/File:Sula_Vineyards_in_Nashik.jpg) by Wikieditor11221, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Shaniwar Wada, Pune](https://commons.wikimedia.org/wiki/File:Shaniwar_wada_(pune).jpg) by Samrudhi shelagaonkar, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Evening at Marine Drive, Mumbai](https://commons.wikimedia.org/wiki/File:Mumbai_03-2016_46_evening_at_Marine_Drive.jpg) by A. Savin, [Free Art License](https://artlibre.org/licence/lal/en/).

## Folder structure

```text
/
├── index.html
├── trip-styles.html
├── destinations.html
├── preferences.html
├── plan.html
├── saved-plans.html
├── compare.html
├── about.html
├── contact.html
├── faq.html
├── 404.html
├── .nojekyll
├── README.md
├── assets/
│   ├── favicon.svg
│   └── destinations/
│       ├── alibaug.jpg
│       ├── lonavala.jpg
│       ├── mahabaleshwar.jpg
│       ├── mumbai.jpg
│       ├── nashik.jpg
│       └── pune.jpg
├── css/
│   └── style.css
├── data/
│   ├── destinations.js
│   └── plans.js
└── js/
    ├── main.js
    └── planner.js
```

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser. No server or build step is required.
3. Select **Start planning** and follow the four steps. Save a plan to try the saved-plans and compare pages.

Clipboard permissions vary when a page is opened as a local file. If copying is unavailable, the plan page shows a message; printing and saving plans locally still work.

## Deploy to GitHub Pages

1. Create a new repository on GitHub. For a project site, use any repository name; a repository named `username.github.io` instead creates a user site.
2. Add these files to the repository and push them to the branch you want to publish (commonly `main`).
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the publishing branch (for example, `main`) and the root folder (`/`), then select **Save**.
6. Wait for the Pages deployment to finish. A project-site URL has this format: `https://username.github.io/repo-name/`. A user-site repository is served at `https://username.github.io/`.
7. To use a custom domain, add it in **Settings → Pages → Custom domain**, save, and configure the DNS records with your domain provider as GitHub Pages instructs. For a subdomain, set the provided CNAME record; for an apex domain, configure the listed A/AAAA records. Enable **Enforce HTTPS** once it becomes available.

The included `.nojekyll` file tells GitHub Pages to publish the static files without Jekyll processing.

## Quick test checklist

- Complete 1-day, 2-day, and 3-day journeys, including a destination, budget, traveller count, origin, and interests.
- Open a destination page with and without a style query; verify that invalid or missing journey details lead back to a sensible step.
- Try destination search and each style filter; verify the destination card’s season and approximate starting cost.
- On the plan page, switch every day tab using mouse and keyboard. Check route links, stop grouping, meal preference updates, hotel map links, and budget estimates with one traveller and an odd-sized group.
- Test print preview, copy plan, share link, save/open/delete a plan, and compare two saved plans.
- Check the mobile menu, keyboard focus, light/dark theme persistence, and the 404 page.
- Publish to a test GitHub Pages repository and verify internal links work below the repository path.
