import * as BABYLON from "babylonjs";

export class ShapeDrawing {
    private scene: BABYLON.Scene;
    private shapes: BABYLON.Mesh[] = [];
    private drawing: boolean = false;
    private points: BABYLON.Vector3[] = [];

    constructor(scene: BABYLON.Scene) {
        this.scene = scene;
        this.initDrawing();
    }

    private initDrawing() {
        const canvas = this.scene.getEngine().getRenderingCanvas();

        // Check if canvas is null
        if (!canvas) {
            console.error("Rendering canvas is null. Ensure that the engine has been created correctly.");
            return; // Exit the method if the canvas is null
        }

        // Listen for mouse events to draw shapes
        canvas.addEventListener("pointerdown", (evt) => this.onPointerDown(evt));
        canvas.addEventListener("pointermove", (evt) => this.onPointerMove(evt));
        canvas.addEventListener("pointerup", () => this.onPointerUp());
    }

    private onPointerDown(evt: PointerEvent) {
        this.drawing = true;
        const pickResult = this.scene.pick(evt.clientX, evt.clientY);
        if (pickResult.hit) {
            const point = pickResult.pickedPoint!;
            this.points.push(point);
        }
    }

    private onPointerMove(evt: PointerEvent) {
        if (this.drawing) {
            const pickResult = this.scene.pick(evt.clientX, evt.clientY);
            if (pickResult.hit) {
                const point = pickResult.pickedPoint!;
                // Only add point if it's different from the last one
                if (!this.points.length || !this.points[this.points.length - 1].equals(point)) {
                    this.points.push(point);
                    this.drawShape();
                }
            }
        }
    }

    private onPointerUp() {
        this.drawing = false;
        this.createExtrudedShape();
        this.points = []; // Clear points after shape is created
    }

    private drawShape() {
        // Remove existing shape if any
        this.shapes.forEach(shape => shape.dispose());
        this.shapes = [];

        // Draw lines for the shape based on points
        if (this.points.length < 2) return;

        const lines = BABYLON.MeshBuilder.CreateLines("lines", { points: this.points }, this.scene);
        this.shapes.push(lines);
    }

    private createExtrudedShape() {
        if (this.points.length < 3) return; // Need at least 3 points to form a shape

        // Convert 2D points to 3D points
        const shape = this.points.map(point => new BABYLON.Vector3(point.x, 0, point.z));

        const path = [
            new BABYLON.Vector3(0, 0, 0), // Base point of the extrusion
            new BABYLON.Vector3(0, 1, 0)  // Height of the extrusion
        ];

        // Create the extruded shape
        const extrudedShape = BABYLON.MeshBuilder.ExtrudeShape("extrudedShape", {
            shape: shape,
            path: path,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, this.scene);

        // Create a material and set a random color
        const material = new BABYLON.StandardMaterial("mat", this.scene);
        material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        extrudedShape.material = material; // Set material

        // Reset drawing points
        this.shapes.push(extrudedShape);
    }
}
