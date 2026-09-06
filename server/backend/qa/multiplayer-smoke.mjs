// Compatibility entry point. The maintained live transport smoke test lives
// beside the Socket.IO server package so it resolves that package's devDependencies.
await import("../server/test/live-socket-smoke.mjs");
