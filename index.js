// 1. 2D grid to move on as @
// 2. Add some walls
// 3. Support DOM and terminal

import GFX from './lib/constants'
import { createRoom, addPerimeter, Room } from './lib/util';
import { Player, Enemy } from './lib/beings';
import color from 'color';

// DEPRECATED
class OldRoom {
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
        this.rooms = [];
    }

    // TODO: Add corridors
    addRoom(ROOM_START_X = 10, ROOM_START_Y = 10, width, height) {

        this.rooms.push({ xStart: ROOM_START_X, yStart: ROOM_START_Y, width, height });

        const room = (() => {
            const room = new Room(width, height, GFX.FLOOR);
            room.addWalls(GFX.WALL);
            return room;
        })();

        this.grid = this.grid.map((line, lineIndex) => {
            if (lineIndex >= ROOM_START_Y + 1
                && lineIndex <= ROOM_START_Y + room.height) {

                return line.map((tile, tileIndex) => {

                    if (tileIndex >= ROOM_START_X + 1
                        && tileIndex <= ROOM_START_X + room.width) {
                        const roomY = tileIndex - (ROOM_START_X + 1);
                        const roomX = lineIndex - (ROOM_START_Y + 1);
                        return room.grid[roomX][roomY];
                    }
                    else { return tile };
                })
            }
            return line;
        });
    }

    render() {
        return this.grid.map(line => line.join('')).join('\n');
    }
}

// A minimap?
class Map { }

module.exports = { Corridor, LevelGrid, Enemy, Player, Room };