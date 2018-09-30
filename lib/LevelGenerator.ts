import Room from './Room';
import GFX from './constants';


export default class LevelGenerator {
    xSize: number;
    ySize: number;
    grid: string[][];
    rooms: object[];

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