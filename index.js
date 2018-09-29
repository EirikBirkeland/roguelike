// 1. 2D grid to move on as @
// 2. Add some walls
// 3. Support DOM and terminal

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
        const numPossibleDirections = 9;
        const rndNum = Math.floor(Math.random(9) * 10) + 1;

        switch (rndNum) {
            case 1:
                this.x -= 1;
                this.y -= 1;
                break;
            case 2:
                this.y -= 1;
                break;
            case 3:
                this.x += 1;
                this.y += 1
                break;
            case 4:
                this.x -= 1;
                break;
            case 5:
                break
            case 6:
                this.x += 1;
                break;
            case 7:
                this.x -= 1;
                this.y += 1;
                break;
            case 8:
                this.y += 1;
                break;
            case 9:
                this.x += 1;
                this.y += 1;
                break;
            default:
        }
    }
}

class Room {
    constructor(xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.grid = Array(this.ySize).fill('_').map(_ => Array(this.xSize).fill('.'));
        this.registeredObjects = [];
    }
    update() {
        this.grid[this.xSize / 2][this.ySize / 2] = '@';
    }
    registerObject(obj) {
        this.registeredObjects.push(obj);
    }
    render() {
        this.registeredObjects.forEach(obj => {
            this.grid[obj['y']][obj['x']] = obj.graphic;
        });
        return this.grid.map(line => line.join('')).join('\n');
    }
    addWalls(walltile = "■") {
        this.grid = this.grid.map((line, i) => {
            if (i === 0) {
                return line.map(_ => walltile)
            } else if (i === this.grid.length - 1) {
                return line.map(_ => walltile)
            }
            line[0] = walltile;
            line[this.grid[0].length - 1] = walltile;
            return line;
        })
    }
}

module.exports = { Enemy, Player, Room };