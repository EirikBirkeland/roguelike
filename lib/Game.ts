import GFX from './constants';

// We probably don't need to instantiate the game
export default class Game {
    grid: string[][];

    registeredObjects = [];
    registerObject(obj) {
        this.registeredObjects.push(obj);
    }

    render() {
        // We avoid mutating this.grid
        const myGrid = JSON.parse(JSON.stringify(this.grid));

        this.registeredObjects.forEach((obj) => {
            if (![GFX.WALL, GFX.VOID].includes(myGrid[obj['y']][obj['x']])) {
                myGrid[obj['y']][obj['x']] = obj.graphic;
            } else {
                obj.x = obj.prevX;
                obj.y = obj.prevY;
                myGrid[obj['y']][obj['x']] = obj.graphic;
            }
        });

        return myGrid.map(line => line.join('')).join('\n');
    }
}