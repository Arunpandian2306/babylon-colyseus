import * as BABYLON from "babylonjs";
import { GameScene } from "./GameScene";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement; // Ensure the canvas has this ID in your index.html
const engine = new BABYLON.Engine(canvas, true);

// Create the scene
const scene = GameScene.createScene(engine, canvas);

// Render loop
engine.runRenderLoop(() => {
    scene.render();
});

// Handle browser resize
window.addEventListener("resize", () => {
    engine.resize();
});

// Optional: Add some basic interactivity
canvas.addEventListener("click", (event) => {
    const pickResult = scene.pick(event.clientX, event.clientY);
    if (pickResult.hit) {
        console.log("You clicked on", pickResult.pickedMesh?.name);
    }
});
