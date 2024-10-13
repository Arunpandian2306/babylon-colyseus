import { Room, Client } from "colyseus";
import { ShapeState, Player } from "./ShapeState";

export class MyRoom extends Room<ShapeState> {
  onCreate(options: any) {
    this.setState(new ShapeState());

    // Handle player joining
    this.onMessage("createShape", (client, shape) => {
      this.state.createShape(client.sessionId, shape);
    });

    this.onMessage("moveShape", (client, position) => {
      this.state.moveShape(client.sessionId, position);
    });
  }

  onJoin(client: Client) {
    // Create a new Player instance for the joining client
    const player = new Player(client.sessionId);
    this.state.addPlayer(client.sessionId, player);
    console.log(`${client.sessionId} joined.`);
  }

  onLeave(client: Client) {
    this.state.removePlayer(client.sessionId);
    console.log(`${client.sessionId} left.`);
  }
}
