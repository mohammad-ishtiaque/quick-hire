import app from "./app.js";
import config from "./config/index.js";
import connectDB from "./connection/connectDB.js";
import { logger, errorLogger } from "./util/logger.js";

async function main() {
  try {
    // ১. প্রথমে ডাটাবেস কানেক্ট হবে
    await connectDB();

    // ২. তারপর সার্ভার লিসেন করবে
    const server = app.listen(config.port, () => {
      console.log(`🚀 Server is humming at http://localhost:${config.port}`);
      logger.info(`Server started on port ${config.port}`);
    });

    // আনহ্যান্ডেলড রিজেকশন হ্যান্ডেল করার জন্য (এলিট স্ট্যান্ডার্ড)
    process.on("unhandledRejection", (error) => {
      errorLogger.error("Unhandled Rejection detected, shutting down...");
      if (server) {
        server.close(() => {
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });

  } catch (error) {
    errorLogger.error("Failed to start server:", error);
  }
}

main();