import { Player } from './animate/beings';
import GFX from './constants';
const invalidDestinationTiles = [GFX.WALL, GFX.VOID];

// We probably don't need to instantiate the game
export default class Game {
    grid: string[][];

    registeredObjects = [];
    registerObject(obj) {
        this.registeredObjects.push(obj);
    }

    update() {
        // We avoid mutating this.grid
        const myGrid = JSON.parse(JSON.stringify(this.grid));

        // Huge problem: This single-layer symbol-based grid does not support multiple items existing in a single tile.
        // Maybe I can use an AoA in each tile?
        this.registeredObjects.forEach((obj) => {

            // if the obj's X and Y is not on top of a wall or void tile...
            if (!invalidDestinationTiles.includes(myGrid[obj['y']][obj['x']])) {

                if(obj instanceof Player && myGrid[obj['y']][obj['x']] === GFX.ENEMY) {
                    // fight the enemy!
                    console.log("You attack the nasty enemy");
                } else {
                    myGrid[obj['y']][obj['x']] = obj.graphic;
                }
            } else {
            // else restore previous coords
                obj.x = obj.prevX;
                obj.y = obj.prevY;
                myGrid[obj['y']][obj['x']] = obj.graphic;
            }

        });

        return myGrid.map(line => line.join('')).join('\n');
    }
}