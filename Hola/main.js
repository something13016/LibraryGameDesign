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
   // Define the main level using the provided result array
   const result = [
       // First 30 lines: 85 instances of 1, 10 instances of 23
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       Array(85).fill(1).concat(Array(10).fill(23)),
       // Next 8 lines: 23 instances of 23, 62 instances of 1, 10 instances of 23
       Array(23).fill(23).concat(Array(62).fill(1), Array(10).fill(23)),
       Array(23).fill(23).concat(Array(62).fill(1), Array(10).fill(23)),
       Array(23).fill(23).concat(Array(62).fill(1), Array(10).fill(23)),
       Array(23).fill(23).concat(Array(62).fill(1), Array(10).fill(23)),
       Array(23).fill(23).concat(Array(62).fill(1), Array(10).fill(23)),
       Array(23).fill(23).concat(Array(62).fill(1), Array(10).fill(23)),
       Array(23).fill(23).concat(Array(62).fill(1), Array(10).fill(23)),
       Array(23).fill(23).concat(Array(62).fill(1), Array(10).fill(23)),
       // Remaining lines
       Array(23).fill(23).concat(Array(72).fill(1)),
       Array(26).fill(23).concat(Array(69).fill(1)),
       Array(29).fill(23).concat(Array(66).fill(1)),
       Array(32).fill(23).concat(Array(63).fill(1)),
       Array(35).fill(23).concat(Array(60).fill(1)),
       Array(38).fill(23).concat(Array(57).fill(1)),
       Array(41).fill(23).concat(Array(54).fill(1)),
       Array(44).fill(23).concat(Array(51).fill(1)),
       Array(47).fill(23).concat(Array(48).fill(1)),
       Array(50).fill(23).concat(Array(45).fill(1)),
       Array(53).fill(23).concat(Array(42).fill(1)),
       Array(56).fill(23).concat(Array(39).fill(1)),
       Array(59).fill(23).concat(Array(36).fill(1)),
       Array(62).fill(23).concat(Array(33).fill(1)),
       Array(65).fill(23).concat(Array(30).fill(1))
   ];
   // Create a single-layer map using result
   const mp = [result]; // Wrap in an array since drawIsometricTiles expects a 3D structure
   drawIsometricTiles(tiles, tileWidth, tileHeight, mp);
};
function drawIsometricTiles(tiles, tileWidth, tileHeight, mp) {
   const numLayers = mp.length;
   const gridHeight = mp[0].length; // Number of rows in the level
   const gridWidth = mp[0][0].length; // Number of columns in the level
   // Draw layers from bottom to top (only 1 layer here)
   for (let layer = 0; layer < numLayers; layer++) {
       const layerOffsetY = layer * (tileHeight / 2.5); // Vertical offset for stacking (if future layers are added)
       // Loop through all rows (y) and columns (x) in the level
       for (let y = 0; y < gridHeight; y++) {
           for (let x = 0; x < gridWidth; x++) {
               // Calculate isometric position
               const isoX = (x - y) * (tileWidth / 2) + canvas.width / 2;
               const isoY = (x + y) * (tileHeight / 4) + (canvas.height / 4) - layerOffsetY;
               // Get tile index from the map and draw
               const tileIndex = mp[layer][y][x];
               // Ensure tile index is valid (in case of out-of-bounds values)
               if (tileIndex >= 0 && tileIndex < tiles.length) {
                   ctx.drawImage(tiles[tileIndex], isoX, isoY);
               }
           }
       }
   }
}