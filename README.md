# BabylonJS and ColyseusJS Multiplayer Game

## Overview
This project is a multiplayer game built with **BabylonJS** for 3D rendering and **ColyseusJS** for real-time multiplayer interactions.

## Features
- **Draw 2D Shapes**: Users can click on the canvas to define points and create shapes.
- **Extrude Shapes**: The 2D shapes can be extruded into 3D objects with a fixed height.
- **Real-time Interaction**: Players can move their 3D objects around, and other players will see these movements in real time.


## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation
1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/Arunpandian2306/babylon-colyse.git
    cd babylon-colyse
    ```

2. Install server dependencies:
    ```bash
    cd server
    npm install ts-node --save-dev
    ```

3. Install client dependencies:
    ```bash
    cd ../client
    npm install vite --save-dev
    npm install -g vite
    ```

### Running the Project
1. **Run the backend**:
    ```bash
    cd server
    npx ts-node index.ts
    ```

2. **Run the frontend in a separate terminal**:
    ```bash
    cd ../client
    npx vite
    ```

3. Open your browser and navigate to `http://localhost:5173` to access the game.

