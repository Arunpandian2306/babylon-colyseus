import { Client, Room } from "colyseus.js";
import * as BABYLON from "babylonjs";

export class NetworkManager {
  private room: Room;
  private scene: BABYLON.Scene;

  constructor(client: Client, scene: BABYLON.Scene) {
    this.scene = scene;

    client.joinOrCreate("my_room").then(room => {
      this.room = room;

      // Listen for shape creation and movement updates
      room.onMessage("createShape", (shape) => {
        // Handle shape creation on the client
      });

      room.onMessage("moveShape", (data) => {
        // Handle shape movement on the client
      });
    });
  }

  // Send shape creation and movement events to the server
  createShape(shape: any) {
    this.room.send("createShape", shape);
  }

  moveShape(position: { x: number; y: number; z: number }) {
    this.room.send("moveShape", position);
  }
}
