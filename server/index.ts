import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";
import { MyRoom } from "./MyRoom";

const app = express();
const port = 2567;

// Set up an HTTP server
const gameServer = new Server({
  server: createServer(app),
});

// Register the Colyseus room
gameServer.define("my_room", MyRoom);

// Start the server
gameServer.listen(port);
console.log(`Colyseus server listening on ws://localhost:${port}`);
