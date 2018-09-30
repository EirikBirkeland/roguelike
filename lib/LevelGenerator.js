"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Room_1 = require("./Room");
var constants_1 = require("./constants");
var LevelGenerator = /** @class */ (function () {
    function LevelGenerator(xSize, ySize) {
        var _this = this;
        this.xSize = xSize;
        this.ySize = ySize;
        this.grid = Array(this.ySize).fill('_').map(function (_) { return Array(_this.xSize).fill(constants_1.default.VOID); });
        this.rooms = [];
    }
    // TODO: Add corridors
    LevelGenerator.prototype.addRoom = function (ROOM_START_X, ROOM_START_Y, width, height) {
        if (ROOM_START_X === void 0) { ROOM_START_X = 10; }
        if (ROOM_START_Y === void 0) { ROOM_START_Y = 10; }
        this.rooms.push({ xStart: ROOM_START_X, yStart: ROOM_START_Y, width: width, height: height });
        var room = (function () {
            var room = new Room_1.default(width, height, constants_1.default.FLOOR);
            room.addWalls(constants_1.default.WALL);
            return room;
        })();
        this.grid = this.grid.map(function (line, lineIndex) {
            if (lineIndex >= ROOM_START_Y + 1
                && lineIndex <= ROOM_START_Y + room.height) {
                return line.map(function (tile, tileIndex) {
                    if (tileIndex >= ROOM_START_X + 1
                        && tileIndex <= ROOM_START_X + room.width) {
                        var roomY = tileIndex - (ROOM_START_X + 1);
                        var roomX = lineIndex - (ROOM_START_Y + 1);
                        return room.grid[roomX][roomY];
                    }
                    else {
                        return tile;
                    }
                    ;
                });
            }
            return line;
        });
    };
    LevelGenerator.prototype.render = function () {
        return this.grid.map(function (line) { return line.join(''); }).join('\n');
    };
    return LevelGenerator;
}());
exports.default = LevelGenerator;
