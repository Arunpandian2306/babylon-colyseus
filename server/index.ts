import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";
import { MyRoom } from "./MyRoom";

const app = express();
const port = 2567;

const gameServer = new Server({
  server: createServer(app),
});

gameServer.define("my_room", MyRoom);

gameServer.listen(port);
console.log(`Colyseus server listening on ws://localhost:${port}`);
