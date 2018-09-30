// 1. 2D grid to move on as @
// 2. Add some walls
// 3. Support DOM and terminal
import GFX from './lib/constants'
import myGrid from './lib/Game';
import Room from './lib/Room';
import LevelGenerator from './lib/LevelGenerator';
import { Player, Enemy } from './lib/animate/beings';
import Game from './lib/Game';

// A corridor. Should be used to connect rooms
class Corridor { constructor() { } }

// A minimap?
class Map { }

module.exports = { myGrid, Corridor, LevelGenerator, Game, Enemy, Player, Room };