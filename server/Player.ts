import { Schema } from "@colyseus/schema";

export class Player extends Schema {
    id: string; // Removed @type decorator
    x: number;  // Removed @type decorator
    y: number;  // Removed @type decorator
    z: number;  // Removed @type decorator
    isDrawing: boolean; // Removed @type decorator

    constructor(id: string) {
        super();
        this.id = id;
        this.x = 0; // Initialize directly
        this.y = 0; // Initialize directly
        this.z = 0; // Initialize directly
        this.isDrawing = false; // Initialize directly
    }
}
