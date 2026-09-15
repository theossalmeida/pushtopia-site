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
- `PUSHTOPIA_LOGIN_URL`: optional future web login destination. When empty, the login control remains disabled. The MVP's GitHub OAuth App Device Flow stays inside the macOS app; this site does not implement an OAuth callback.
- `PUSHTOPIA_GITHUB_CLIENT_ID`: reserved public configuration for a future web entry point; it is not used by the current page.

Never put secrets in these variables or commit an `.env` file. The landing page does not call the app analytics endpoint and does not collect GitHub activity.

## Checks

```sh
npm test
npm run lint
npm run typecheck
npm run build
```

There are no application tests in the empty starting repository; `npm test` runs Node's test runner and currently succeeds with no test files.

## Deploy

Deploy the contents of `dist/` with Cloudflare Pages (direct upload or a Pages project connected to this repository). Configure the build command as `npm run build` and the output directory as `dist`. Set the public environment variables in the Cloudflare Pages project before a production build. No Cloudflare project, Worker, route, domain, or deploy token is created by this repository change.

## Pending launch items

- Apple Developer signing/notarization and a real macOS installer are still required.
- A public beta URL is not configured.
- The MVP's GitHub OAuth App credentials and Device Flow remain app-side concerns; no OAuth App or GitHub App was created here.
- A public web login, auto-update channel, support destination, and any future GitHub App disclosure need product/backend decisions before being enabled.
- The Cloudflare Pages project and its deployment settings still need to be configured by the owner.
