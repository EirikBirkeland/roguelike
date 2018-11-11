import _ from 'lodash';

import Room from './Room';
import GFX from './constants';
import Game from './Game';
const log = console.log;

const debug = false;

function getRandom(end) {
    return Math.floor(Math.random() * end)
}

export default class LevelGenerator {
    xSize: number;
    ySize: number;
    grid: string[][];
    rooms: object[];
    diggerCoordinate: number[];
    candidateWall: string;

    constructor(xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.grid = Array(this.ySize).fill('_').map(_ => Array(this.xSize).fill(GFX.VOID));
        this.diggerCoordinate = null;
    }

    public create() {
        this.addRoom(10, 10, 10, 15);
        this.digTunnel();
    }

    private getRandomFloorTile() { // Note: depends on at least one floor tile already existing!
        const startingXy: number[] = (() => {
            let candidate: string;
            let rndX: number;
            let rndY: number;

            while (candidate !== GFX.FLOOR) {
                rndX = getRandom(this.grid.length - 1);
                rndY = getRandom(this.grid[0].length - 1);
                candidate = this.grid[rndX][rndY];
            }
            return [rndX, rndY];
        })();
        return startingXy;
        log('The starting coordinate is ' + startingXy);
    }

    private getNearbyWalltile() {
        if (!this.diggerCoordinate) {
            throw new Error("diggerCoordinate must be pre-set!")
        }

        // move in a random direction until hitting first wall tile
        const newDirection = _.sample(["up", "down", "left", "right"]);
        this.candidateWall = newDirection;

        while (this.grid[this.diggerCoordinate[0]][this.diggerCoordinate[1]] !== GFX.WALL) {
            switch (newDirection) {
                case "up":
                    this.diggerCoordinate = [this.diggerCoordinate[0], this.diggerCoordinate[1] + 1]
                    break;
                case "down":
                    this.diggerCoordinate = [this.diggerCoordinate[0], this.diggerCoordinate[1] - 1]
                    break;
                case "left":
                    this.diggerCoordinate = [this.diggerCoordinate[0] - 1, this.diggerCoordinate[1]]
                    break;
                case "right":
                    this.diggerCoordinate = [this.diggerCoordinate[0] + 1, this.diggerCoordinate[1]]
                    break;
            }
        }
    }

    private attemptToDigTunnel() {
        const corridorLength = 5;
        this.dig(this.candidateWall, GFX.FLOOR, corridorLength, 0, true)
        this.dig(this.candidateWall, GFX.WALL, corridorLength, -1)
        this.dig(this.candidateWall, GFX.WALL, corridorLength, 1)
    }

    private dig(direction, gfx, length, offset, setXAtEnd?) {
        let coords = this.prepareCoords(direction, Object.assign([], this.diggerCoordinate), offset);

        for (let i = 0; i < length; i++) {
            coords = this.digOne(direction, coords)
            this.grid[coords[0]][coords[1]] = gfx;
        };

        if (setXAtEnd)
            this.grid[coords[0]][coords[1]] = "X";
    }


    // needs to be renamed
    private prepareCoords(direction, coords, offset): number[] {
        switch (direction) {
            case "left":
                coords[1] += offset;
                break;
            case "right":
                coords[1] += offset;
                break;
            case "up":
                coords[0] += offset;
                break;
            case "down":
                coords[0] += offset;
                break;
        }
        return coords;
    }

    // needs to be renamed
    private digOne(direction, coords): number[] {
        switch (direction) {
            case "left":
                coords[0] -= 1;
                break;
            case "right":
                coords[0] += 1;
                break;
            case "up":
                coords[1] += 1;
                break;
            case "down":
                coords[1] -= 1;
                break;
        }
        return coords;
    }

    private attemptToDigARoom() {

    }

    private digTunnel() {
        this.diggerCoordinate = this.getRandomFloorTile();
        this.getNearbyWalltile();
        this.grid[this.diggerCoordinate[0]][this.diggerCoordinate[1]] = "X";
        this.attemptToDigTunnel();

        // TODO: Plan to build a corridor of some length (e.g. length 10 tiles?)
        //       If NOT possible, repeat previous step looking for a suitable wall tile.
    }

    // TODO: Add corridors
    private addRoom(ROOM_START_X, ROOM_START_Y, width, height) {
        const rooms = [];

        rooms.push({
            xStart: ROOM_START_X,
            yStart: ROOM_START_Y,
            width,
            height
        });

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