const { LevelGrid, Enemy, Player, Room } = require('./index');
const log = console.log;

const LEVEL_X_SIZE = 80;
const LEVEL_Y_SIZE = 40;

describe('room', () => {
    const ROOM_X = 20;
    const ROOM_Y = 11;

    it('should render a room with player', () => {
        const room = new Room(ROOM_X, ROOM_Y);
        const player = new Player(5, 5);
        room.registerObject(player);
        log(room.render());
    });

    it('should move the player to the left', () => {
        const room = new Room(ROOM_X, ROOM_Y);
        const player = new Player(5, 5);
        room.registerObject(player);
        player.move('left');
        log(room.render());
    });

    it('should render a room with walls all around', () => {
        const room = new Room(ROOM_X, ROOM_Y);
        const player = new Player(5, 5);
        room.registerObject(player);
        room.addWalls();
        log(room.render());
    });

    it('should render an enemy as well', () => {
        const room = new Room(ROOM_X, ROOM_Y);
        const player = new Player(5, 5);
        const goblin = new Enemy(3, 3);

        room.registerObject(player);
        room.registerObject(goblin);
        room.addWalls();

        log(room.render());
    });

    it('should handle two overlapping enemies in same spot without data loss', () => {
        const room = new Room(ROOM_X, ROOM_Y);
        const player = new Player(5, 5);

        const gob1 = new Enemy(1, 1);
        const gob2 = new Enemy(1, 1);

        room.registerObject(player);
        room.registerObject(gob1);
        room.registerObject(gob2);

        gob1.moveRandom();
        gob2.moveRandom();

        room.addWalls();

        log(room.render());
    });
});

describe('LevelArea', () => {
    it.only('should render the entire level area', () => {
        const levelGrid = new LevelGrid(LEVEL_X_SIZE, LEVEL_Y_SIZE);
        levelGrid.addRoom(10, 10, 10, 15);
        levelGrid.addRoom(25, 25, 10, 12);
        levelGrid.addRoom(40, 10, 10, 10);
        log(levelGrid.render());
        console.log(levelGrid.rooms)
    });
});