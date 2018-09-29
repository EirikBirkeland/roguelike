const { Enemy, Player, Grid } = require('./index');
const log = console.log;

describe('grid', () => {
    it('should render a grid with player', () => {
        const grid = new Grid(11, 11);
        const player = new Player(5, 5);
        grid.registerObject(player);
        log(grid.render());
    });

    it('should move the player to the left', () => {
        const grid = new Grid(11, 11);
        const player = new Player(5, 5);
        grid.registerObject(player);
        player.move('left');
        log(grid.render());
    });

    it('should render a grid with walls all around', () => {
        const grid = new Grid(11, 11);
        const player = new Player(5, 5);
        grid.registerObject(player);
        grid.addWalls();
        log(grid.render());
    });

    it('should render an enemy as well', () => {
        const grid = new Grid(11, 11);
        const player = new Player(5, 5);
        const goblin = new Enemy(3, 3);

        grid.registerObject(player);
        grid.registerObject(goblin);
        grid.addWalls();

        log(grid.render());
    });
});