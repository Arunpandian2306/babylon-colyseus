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

        if (!canvas) {
            console.error("Rendering canvas is null. Ensure that the engine has been created correctly.");
            return; 
        }

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
        this.points = []; 
    }

    private drawShape() {
        
        this.shapes.forEach(shape => shape.dispose());
        this.shapes = [];

        if (this.points.length < 2) return;

        const lines = BABYLON.MeshBuilder.CreateLines("lines", { points: this.points }, this.scene);
        this.shapes.push(lines);
    }

    private createExtrudedShape() {
        if (this.points.length < 3) return; 

        const shape = this.points.map(point => new BABYLON.Vector3(point.x, 0, point.z));

        const path = [
            new BABYLON.Vector3(0, 0, 0), 
            new BABYLON.Vector3(0, 1, 0)  
        ];

        const extrudedShape = BABYLON.MeshBuilder.ExtrudeShape("extrudedShape", {
            shape: shape,
            path: path,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, this.scene);

        const material = new BABYLON.StandardMaterial("mat", this.scene);
        material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        extrudedShape.material = material; 

        this.shapes.push(extrudedShape);
    }
}
