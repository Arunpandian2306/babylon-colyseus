import { Room, Client } from "colyseus.js";

export class ShapeManager {
    private room: Room;

    constructor(room: Room) {
        this.room = room;

        this.room.onMessage("shapeCreated", (data) => {
        });
    }

    createShape(shapeData: any) {
        this.room.send("createShape", shapeData);
    }
}
