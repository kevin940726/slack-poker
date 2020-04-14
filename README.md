# Slack Poker

Planning poker directly on Slack

---

## Getting started

Git clone, run yarn install, blablabla you already knew it.

1. Create a new app in Slack.
   Copy `SLACK_SIGNING_SECRET` and `SLACK_BOT_TOKEN` (with `chat:write` permission) from the settings, and paste them in the **Environment Variables** section of now.sh settings. Remember to (re)install your Slack app after changing the permission.
2. Create a new project in Firebase
   Enable Firestore, generate a new service account and download it somewhere. Copy the following keys and add them to the environment variables in the settings: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`.
3. Copy `https://YOUR_HOST/api/poker` to Slack app's _Slash Commands_ section (`/poker`). And `https://YOUR_HOST/api/events` to Slack app's _Interactivity & Shortcuts_ section.

## Deployment

```sh
# To deploy preview
yarn now
# To deploy to prod
yarn now --prod
```

## Development

```sh
# Running locally
yarn now dev
# Forward local port to public for testing
ngrok http 3000 # Or use other services you like
```
