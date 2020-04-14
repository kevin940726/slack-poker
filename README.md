# Slack Poker

Planning poker directly on Slack

---

## Getting started

Git clone, run yarn install, blablabla you already knew it.

1. Create a new app in Slack.
   Copy `signing_secret` and `bot_token` (with `chat:write` permission) from the settings. Run the following.

   ```sh
   yarn now secrets add slack-bot-token [bot_token]
   yarn now secrets add slack-signing-secret [signing_secret]
   ```

2. Create a new project in Firebase
   Enable Firestore, generate a new service account and download it somewhere. Copy the following keys and add them to the secrets.

   ```sh
   yarn now secrets add firebase-project-id [project_id]
   yarn now secrets add firebase-client-email [client_email]
   yarn now secrets add firebase-private-key [private-key]
   ```

   _If you encounter bad arguments error when running the last command, try the below._

   ```sh
   ./node_modules/.bin/now secrets add -- firebase-private-key "[private-key]"
   ```

## Development

```sh
# Running locally
yarn now dev
# Forward local port to public for testing
ngrok http 3000 # Or use other services you like
```
