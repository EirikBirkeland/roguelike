const { Enemy, Player, Room } = require('./index');
const log = console.log;

describe('room', () => {
    const ROOM_X = 20;
    const ROOM_Y = 11;

    it('should render a room with player', () => {
        const grid = new Room(ROOM_X, ROOM_Y);
        const player = new Player(5, 5);
        grid.registerObject(player);
        log(grid.render());
    });

    it('should move the player to the left', () => {
        const grid = new Room(ROOM_X, ROOM_Y);
        const player = new Player(5, 5);
        grid.registerObject(player);
        player.move('left');
        log(grid.render());
    });

    it('should render a room with walls all around', () => {
        const grid = new Room(ROOM_X, ROOM_Y);
        const player = new Player(5, 5);
        grid.registerObject(player);
        grid.addWalls();
        log(grid.render());
    });

    it('should render an enemy as well', () => {
        const grid = new Room(ROOM_X, ROOM_Y);
        const player = new Player(5, 5);
        const goblin = new Enemy(3, 3);

        grid.registerObject(player);
        grid.registerObject(goblin);
        grid.addWalls();

        log(grid.render());
    });

    it('should handle two enemies in same spot', () => {
        const grid = new Room(ROOM_X, ROOM_Y);
        const player = new Player(5, 5);

        const gob1 = new Enemy(3, 3);
        const gob2 = new Enemy(3, 3);

        grid.registerObject(player);
        grid.registerObject(gob1);
        grid.registerObject(gob2);
        gob1.moveRandom();
        gob2.moveRandom();
        grid.addWalls();

        log(grid.render());
    });
});