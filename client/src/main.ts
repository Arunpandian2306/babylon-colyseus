import * as BABYLON from "babylonjs";
import { GameScene } from "./GameScene";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement; // Ensure the canvas has this ID in your index.html
const engine = new BABYLON.Engine(canvas, true);

const scene = GameScene.createScene(engine, canvas);

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});

canvas.addEventListener("click", (event) => {
    const pickResult = scene.pick(event.clientX, event.clientY);
    if (pickResult.hit) {
        console.log("You clicked on", pickResult.pickedMesh?.name);
    }
});
