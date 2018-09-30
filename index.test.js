import GFX from './lib/constants';
const { LevelGenerator, Enemy, Player, Game } = require('./index');
const log = console.log;

const LEVEL_X_SIZE = 80;
const LEVEL_Y_SIZE = 40;

describe('LevelArea', () => {
    it('should render the entire level area', (done) => {
        const levelGrid = new LevelGenerator(LEVEL_X_SIZE, LEVEL_Y_SIZE);
        levelGrid.addRoom(10, 10, 10, 15);
        levelGrid.addRoom(25, 25, 10, 12);
        levelGrid.addRoom(40, 10, 10, 10);

        const game = new Game();
        const player = new Player(15, 15);
        const gob1 = new Enemy(30, 30);

        game.registerObject(player);
        game.registerObject(gob1);

        // We want to grab the grid, while skipping the rest
        game.grid = levelGrid.grid;

        let count = 0;

        const thing = setInterval(function () {
            gob1.moveRandom();
            log(game.render());
            
            if (++count >= 2) {
                clearInterval(thing);
                done();
            }
        }, 1000)
    });
});