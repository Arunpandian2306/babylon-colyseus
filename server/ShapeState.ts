import { Schema, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
    id: string;
    x: number;
    y: number;
    z: number;
    isDrawing: boolean;

    constructor(id: string) {
        super();
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.isDrawing = false;
    }
}

export class ShapeState extends Schema {
    players: MapSchema<Player>; 

    constructor() {
        super();
        this.players = new MapSchema<Player>(); 
    }

    addPlayer(id: string, player: Player) {
        // Use set method to add a player
        this.players.set(id, player);
    }

    removePlayer(id: string) {
        // Use delete method to remove a player
        this.players.delete(id);
    }

    // Example methods for creating and moving shapes
    createShape(sessionId: string, shape: any) {
        // Logic to create a shape
    }

    moveShape(sessionId: string, position: { x: number; y: number }) {
        // Logic to move a shape
    }
}
