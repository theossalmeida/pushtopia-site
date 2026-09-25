# Pushtopia landing page

A small static landing page for the Pushtopia macOS MVP. The repository did not contain an existing app framework, build configuration, landing page, or tracked assets, so the site uses plain HTML, CSS, and browser JavaScript with Node's built-in tooling.

## Run locally

Requires Node.js 18 or later.

```sh
npm run dev
```

Open <http://localhost:4173>. The dev server serves the source files directly. `npm run build` writes the deployable static site to `dist/`.

## Configuration

Copy `.env.example` to `.env` in your deployment environment. The build reads these public values:

- `PUSHTOPIA_BETA_DOWNLOAD_URL`: real installer or beta URL. When empty, the page keeps the honest “Beta download coming soon” state.
- `PUSHTOPIA_LOGIN_URL`: optional external web destination. When empty, the site's login link remains disabled. This does not sign a user into the macOS app; GitHub Device Flow happens inside the app.
- `PUSHTOPIA_GITHUB_CLIENT_ID`: reserved and unused by the current site.

Never put secrets in these variables or commit an `.env` file. The landing page does not call the app analytics endpoint and does not collect GitHub activity.

## Checks

```sh
npm test
npm run lint
npm run typecheck
npm run build
```

`npm test` runs Node's test runner. The site currently has no separate application test files.

## Deploy

Deploy the contents of `dist/` with Cloudflare Pages (direct upload or a Pages project connected to this repository). Configure the build command as `npm run build` and the output directory as `dist`. Set the public environment variables in the Cloudflare Pages project before a production build. No Cloudflare project, Worker, route, domain, or deploy token is created by this repository change.

## Pending launch items

- The app's levels, streaks, account sync, pet states, activity rules and opt-in public GitHub badges are implemented. Badge values are selected in the app and served from the backend; the site only documents the experience and does not access GitHub accounts.
- The default pet names are Brita (dog), Boomie (cat), Haze (shark) and Bono (eagle). The species IDs and sprite paths remain stable for app and badge compatibility, and users can choose a different pet display name in the app.
- The app processes GitHub activity and progress locally. Optional account sync stores limited pseudonymous progress on the backend; optional analytics sends a minimal app-open event and can be disabled in Settings.
- A public beta download, privacy notice and support contact must be configured before inviting beta users. See the app repository's `docs/RELEASE.md` and `docs/SECURITY_PRIVACY.md` for the current launch gates.
- The Cloudflare Pages project and its deployment settings still need to be configured by the owner.
