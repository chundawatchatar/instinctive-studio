import loadEnvConfig from "./config/env";
loadEnvConfig();

import app from "./app";
import { logger } from "./utils/logger";
import dbConnect from "./lib/mongo";
import seedDataBase from "./db/seed";

const port = process.env.PORT || 3000;

let server: ReturnType<typeof app.listen>;

(async () => {
  try {
    await dbConnect();
    await seedDataBase();

    server = app.listen(port, () => {
      logger.info(`🚀 Server started on port ${port}`);
    });

    server.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE") {
        logger.error(`❌ Port ${port} is already in use.`);
      } else {
        logger.error(`❌ Server error: ${err.message}`);
      }
      process.exit(1);
    });
  } catch (err) {
    logger.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();

process.on("SIGINT", () => {
  logger.info("🛑 Gracefully shutting down...");
  process.exit();
});
