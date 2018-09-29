// 1. 2D grid to move on as @
// 2. Add some walls
// 3. Support DOM and terminal

const GFX = {
    VOID: '`',
    FLOOR: '.',
    WALL: '■',
    PLAYER: '@',
    ENEMY: 'g',
}

class Entity {
    constructor(x, y, graphic) {
        this.x = x;
        this.y = y;
        this.graphic = graphic;
        this.speed = 1;
    }
}

class Creature extends Entity {
    constructor(x, y, graphic, health) {
        super(x, y, graphic);
        this.health = health;
    }
}

class Player extends Creature {
    constructor(x, y) {
        super(x, y, '@', 100);
    }
    move(dir) {
        switch (dir) {
            case "up":
                this.y -= this.speed;
            case "down":
                this.y += this.speed;
            case "left":
                this.x -= this.speed;
            case "right":
                this.x += this.speed;
        }
    }
}

class Enemy extends Creature {
    constructor(x, y) {
        super(x, y, 'g', 100);
    }
    moveRandom() {
        this.prevX = this.x;
        this.prevY = this.y;

        const numPossibleDirections = 9;
        const rndNum = Math.floor(Math.random(9) * 10) + 1;

        if ([1, 4, 7].includes(rndNum)) {
            this.x -= 1;
        } else if ([3, 6, 9].includes(rndNum)) {
            this.x += 1;
        }

        if ([1, 2, 3].includes(rndNum)) {
            this.y -= 1;
        } else if ([7, 8, 9].includes(rndNum)) {
            this.y += 1;
        }
    }
}

class Room {
    constructor(xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.grid = Array(this.ySize).fill('_').map(_ => Array(this.xSize).fill(GFX.FLOOR));
        this.registeredObjects = [];
    }

    // TODO: Move to LevelArea?
    registerObject(obj) {
        this.registeredObjects.push(obj);
    }

    render() {
        // TODO: Move collision detection elsewhere
        this.registeredObjects.forEach(obj => {
            if (this.grid[obj['y']][obj['x']] !== GFX.WALL) {
                this.grid[obj['y']][obj['x']] = obj.graphic;
            } else {
                obj.x = obj.prevX;
                obj.y = obj.prevY;
                this.grid[obj['y']][obj['x']] = obj.graphic;
            }
        });
        return this.grid.map(line => line.join('')).join('\n');
    }

    addWalls() {
        this.grid = this.grid.map((line, i) => {
            if (i === 0 || i === this.grid.length - 1) {
                return line.map(_ => GFX.WALL)
            }
            line[0] = GFX.WALL;
            line[this.grid[0].length - 1] = GFX.WALL;
            return line;
        });
    }
}

// A corridor. Should be used to connect rooms
class Corridor { constructor() { } }

// We might call the entire game arena the 'grid'.
// This could be a 2D coordinate system.
class LevelGrid {
    constructor(xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.grid = Array(this.ySize).fill('_').map(_ => Array(this.xSize).fill(GFX.VOID));
    }
    render() {
        return this.grid.map(line => line.join('')).join('\n');
    }
}

// A minimap?
class Map { }

module.exports = { Corridor, LevelGrid, Enemy, Player, Room };