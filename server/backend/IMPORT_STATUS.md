# Backend Import Status

Source artifact: `Intergenerational-Contract-v5.0-OI001-AUDIT-ARTIFACT.zip`

SHA-256: `a896c69cd186fbe6cb6cf7db780c25e341e683fd8545175b9e1df1c43b46b11f`

Independent audit status: PASS (OI-001 and OI-002 verified).

## Imported automatically

- root `package.json`
- TypeScript build configs
- Docker / compose / environment examples
- nested server package/config
- `server/src/contracts.ts`
- `server/src/game-room.ts`

## Not yet bulk-imported by ChatGPT connector

The GitHub connector accepts UTF-8 text payloads but not a local sandbox file path, and large multi-file payloads may be truncated. Therefore the following verified artifact content still needs one bulk upload using Git/GitHub outside the connector:

- full `src/` engine tree
- `server/src/index.ts`
- full `test/` and `qa/` trees
- remaining release/readme documents from the artifact

Do not treat this partial tree as a runnable canonical backend until the remaining artifact files are imported and a commit is verified against the artifact hash/source manifest.
