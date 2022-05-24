const express = require("express");
const { createServer } = require("http");

const app = express();
const httpServer = createServer(app);

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });

app.use(express.json());

const connectDb = require("./mongo/db");
connectDb();

const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  // allows the files in pages folder to work
  app.all("*", (req, res) => handle(req, res));
  httpServer.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Express server running on PORT ${PORT}`);
  });
});
