// 1. 2D grid to move on as @
// 2. Add some walls
// 3. Support DOM and terminal

import Game from './lib/Game';
import Room from './lib/Room';
import LevelGenerator from './lib/LevelGenerator';
import { Player, Enemy } from './lib/animate/beings';
const log = console.log;

const LEVEL_X_SIZE = 80;
const LEVEL_Y_SIZE = 40;

const levelGrid = new LevelGenerator(LEVEL_X_SIZE, LEVEL_Y_SIZE);
levelGrid.addRoom(10, 10, 10, 15);
levelGrid.addRoom(25, 25, 10, 12);
levelGrid.addRoom(40, 10, 10, 10);

const game = new Game();
const player = new Player(15, 15);
const gob1 = new Enemy(30, 30);

game.registerObject(player);
game.registerObject(gob1);

game.grid = levelGrid.grid;

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const keys = {
        w: 'up',
        a: 'left',
        d: 'right',
        s: 'down',
    }

    player.move(keys[chunk.trim()])
    gob1.moveRandom();
    log(game.render());
    log(player)
});

module.exports = { LevelGenerator, Game, Enemy, Player, Room };