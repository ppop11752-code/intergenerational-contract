# RUN_LOCAL

## 1. Server
```bash
cd server
npm install
npm run dev
```
Default: `http://localhost:3001`.

## 2. Client
Open a second terminal:
```bash
cd client
npm install
npm run dev
```

If the server is hosted elsewhere, create `client/.env`:
```env
VITE_SERVER_URL=https://your-server.example
```

## 3. Test core
From project root:
```bash
npx tsc -p tsconfig.build.json
node test/smoke-v12.mjs
```

## Current scope
The server keeps room/game state in memory. Restarting the server resets active rooms.
