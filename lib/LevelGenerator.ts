import _ from 'lodash';

import Room from './Room';
import GFX from './constants';
import Game from './Game';
const log = console.log;

function getRandom(end) {
    return Math.floor(Math.random() * end)
}

export default class LevelGenerator {
    xSize: number;
    ySize: number;
    grid: string[][];
    rooms: object[];
    diggerCoordinate: number[];

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

    private digTunnel() {
        // First, randomly locate a floor tile
        const startingXy: number[] = (() => {
            let candidate: string;
            let rndX: number;
            let rndY: number;

            while (candidate !== GFX.FLOOR) {
                rndX = getRandom(this.grid.length - 1);
                rndY = getRandom(this.grid[0].length - 1);
                candidate = this.grid[rndX][rndY];
            }
            this.grid[rndX][rndY] = "X";
            return [rndX, rndY];
        })();
        log('The starting coordinate is ' + startingXy);
        this.diggerCoordinate = startingXy;

        // TODO: pick a random wall tile from startingXy
        const findAWallTileNearby = () => {
            // move in a random direction until hitting first wall tile
            const newDirection = _.sample(["up", "down", "left", "right"]);

            while (this.grid[this.diggerCoordinate[0]][this.diggerCoordinate[1]] !== GFX.WALL) {
                switch (newDirection) {
                    case "up":
                        this.diggerCoordinate = this.diggerCoordinate[this.diggerCoordinate[0]][this.diggerCoordinate[1] + 1]
                        break;
                    case "down":
                        this.diggerCoordinate = this.diggerCoordinate[this.diggerCoordinate[0]][this.diggerCoordinate[1] - 1]
                        break;
                    case "left":
                        this.diggerCoordinate = this.diggerCoordinate[this.diggerCoordinate[0] - 1][this.diggerCoordinate[1]]
                        break;
                    case "right":
                        this.diggerCoordinate = this.diggerCoordinate[this.diggerCoordinate[0] + 1][this.diggerCoordinate[1]]
                        break;
                }

            }
            this.diggerCoordinate = [];
        };
        findAWallTileNearby();


        // TODO: Plan to build a corridor of some length (e.g. length 10 tiles?)
        //       If NOT possible, repeat previous step looking for a suitable wall tile.
        const attemptToDigATunnel = () => { };
        const attemptToDigARoom = () => { };
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