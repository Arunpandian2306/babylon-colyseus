import { Client, Room } from "colyseus.js";
import * as BABYLON from "babylonjs";

export class NetworkManager {
  private room: Room;
  private scene: BABYLON.Scene;

  constructor(client: Client, scene: BABYLON.Scene) {
    this.scene = scene;

    client.joinOrCreate("my_room").then(room => {
      this.room = room;


      room.onMessage("createShape", (shape) => {
      });

      room.onMessage("moveShape", (data) => {
      });
    });
  }

  createShape(shape: any) {
    this.room.send("createShape", shape);
  }

  moveShape(position: { x: number; y: number; z: number }) {
    this.room.send("moveShape", position);
  }
}
