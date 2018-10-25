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
levelGrid.create();

const game = new Game();
const player = new Player(15, 15);

game.registerObject(player);

game.grid = levelGrid.grid;

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const keys = {
        w: 'up',
        a: 'left',
        d: 'right',
        s: 'down',
    };

    player.move(keys[chunk.trim()])
    log(game.render());
    log(player);
});

module.exports = { LevelGenerator, Game, Enemy, Player, Room };