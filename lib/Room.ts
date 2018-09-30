function addPerimeter(grid: string[][], tile) {
    return grid.map((line, i) => {
        if (i === 0 || i === grid.length - 1) {
            return line.map(_ => tile)
        }
        line[0] = tile;
        line[grid[0].length - 1] = tile;
        return line;
    });
}

export default class Room {
    height: number;
    width: number;
    grid: string[][];

    constructor(height, width, tile) {
        this.height = height;
        this.width = width;
        this.grid = Array(height).fill('_').map(_ => Array(width).fill(tile));
    }

    addWalls(tile) {
        if (!tile) { throw new ReferenceError() }
        this.grid = addPerimeter(this.grid, tile);
    }
}