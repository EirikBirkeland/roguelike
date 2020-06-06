import GFX from '../constants';

const abstract = (constructor: Function, newy: any) => {
    if (constructor.name === newy.name) {
        throw new TypeError("Cannot construct " + constructor.name + " instances directly");
    }
}

class Entity {
    x: number;
    y: number;
    graphic: string;
    speed: number;
    strength: number;
    constructor(x, y, graphic) {
        abstract(Entity, new.target);
        this.x = x;
        this.y = y;
        this.graphic = graphic;
    }
}

class Creature extends Entity {
    health: number;
    constructor(x, y, graphic, health, strength) {
        abstract(Entity, new.target);
        super(x, y, graphic);
        this.health = health;
        this.strength = strength;
    }
}

export class Player extends Creature {
    prevX: number;
    prevY: number;
    
    constructor(x, y) {
        super(x, y, GFX.PLAYER, 100, 10);
    }
    move(dir) {
        this.prevX = this.x;
        this.prevY = this.y;

        switch (dir) {
            case "up":
                this.y -= 1;
                break;
            case "down":
                this.y += 1;
                break;
            case "left":
                this.x -= 1;
                break;
            case "right":
                this.x += 1;
                break;
        }
    }
}

export class Enemy extends Creature {
    prevX: number;
    prevY: number;

    constructor(x, y) {
        super(x, y, GFX.ENEMY, 50);
    }
    moveRandom() {
        this.prevX = this.x;
        this.prevY = this.y;

        const numPossibleDirections = 9;
        const rndNum = Math.floor(Math.random() * 10) + 1;

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