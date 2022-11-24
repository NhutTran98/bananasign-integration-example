# Bananasign Integration Example

## Demo for integrating with Bananasign by using OAuth2.0 and send/sign flow with [Bananasign Widget](https://github.com/luminpdf/bananasign-integration) using NextJS

## [Demo](https://bananasign-integration-example.vercel.app/)
### ENV
Create `.env.local`

```
NEXT_PUBLIC_BANANASIGN_OAUTH2_ENDPOINT=https://auth.luminpdf.com
BANANASIGN_OAUTH2_ENDPOINT=https://auth.luminpdf.com

NEXT_PUBLIC_BASE_URL=http://localhost:3001
BASE_URL=http://localhost:3001
NEXT_PUBLIC_BANANASIGN_WEB_URL=https://app.bananasign.co
NEXT_PUBLIC_BANANASIGN_END_POINT_URL=https://app.bananasign.co/api/web

NEXT_PUBLIC_BANANASIGN_CLIENTID=YOUR_BANANASIGN_CLIENT_ID
BANANASIGN_CLIENTID=YOUR_BANANASIGN_CLIENT_ID

BANANASIGN_SECRET=YOUR_BANANASIGN_CLIENT_SECRET
```

## How To Run
- npm install
- npm run dev