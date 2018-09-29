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

class Player extends Entity {
    constructor(x, y) {
        super(x, y, '@');
        this.health = 100;
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

class Enemy extends Entity {
    constructor(x, y) {
        super(x, y, 'g');
        this.speed = 1; // # of blocks to traverse
        this.health = 100;
    }
}

class Grid {
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
        console.log(this)
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
            line[this.grid.length - 1] = walltile;
            return line;
        })
    }
}

module.exports = { Enemy, Player, Grid };