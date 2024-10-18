const redis = require("redis");

// Create Redis client
const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

// Connect to Redis Server
async function connectToRedis() {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error(`Redis connection error: ${error.message}`);
  }
}

module.exports = { client, connectToRedis };
