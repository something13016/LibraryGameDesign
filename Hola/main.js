const canvas = document.getElementById('isometricCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load tile images
const tileImage = new Image();
tileImage.src = 'tinyBlocks_NoiL_1.1update.png'; // Replace with your tile path

tileImage.onload = () => {
    const tileCols = 6;
    const tileRows = 6;
    const tileWidth = tileImage.width / tileCols;
    const tileHeight = tileImage.height / tileRows;
    
    // Slice the image into tiles
    const tiles = [];
    for (let row = 0; row < tileRows; row++) {
        for (let col = 0; col < tileCols; col++) {
            const canvasTile = document.createElement('canvas');
            canvasTile.width = tileWidth;
            canvasTile.height = tileHeight;
            const tileCtx = canvasTile.getContext('2d');
            tileCtx.drawImage(
                tileImage,
                col * tileWidth,
                row * tileHeight,
                tileWidth,
                tileHeight,
                0,
                0,
                tileWidth,
                tileHeight
            );
            tiles.push(canvasTile);
        }
    }

    // Example 3D map (layers, rows, columns)
    let lvl1 = [[23, 23, 23], [5, 5, 5], [5, 5, 5]];
    let lvl2 = [[24, 0, 23], [34, 23, 2], [0, 23, 3]];
    let mp = [lvl1, lvl2]; // mp[0] = bottom layer, mp[1] = top layer

    drawIsometricTiles(tiles, tileWidth, tileHeight, mp);
};

function drawIsometricTiles(tiles, tileWidth, tileHeight, mp) {
    const numLayers = mp.length;
    const gridSize = mp[0].length;

    // 1. Draw layers from bottom to top (so higher layers stack on top)
    for (let layer = 0; layer < numLayers; layer++) {
        // 2. Calculate vertical offset for this layer (higher layers = more offset)
        // Use tileHeight/2 to shift upward (adjust based on your tile's perspective)
        const layerOffsetY = layer * (tileHeight / 2); 

        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                // Isometric X position (diagonal horizontal)
                const isoX = (x - y) * (tileWidth / 2) + canvas.width / 2;
                
                // Isometric Y position (diagonal vertical) + layer offset
                const isoY = (x + y) * (tileHeight / 4) + (canvas.height / 4) - layerOffsetY;

                // Draw the tile for this position in the current layer
                const tileIndex = mp[layer][y][x];
                ctx.drawImage(tiles[tileIndex], isoX, isoY);
            }
        }
    }
}