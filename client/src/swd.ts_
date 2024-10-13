import { Room, Client } from "colyseus.js";

export class ShapeManager {
    private room: Room;

    constructor(room: Room) {
        this.room = room;

        // Handle messages from the server to update shapes
        this.room.onMessage("shapeCreated", (data) => {
            // Logic to update client-side shapes based on server data
        });
    }

    createShape(shapeData: any) {
        // Send shape data to the server
        this.room.send("createShape", shapeData);
    }
}
