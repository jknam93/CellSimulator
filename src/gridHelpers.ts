import { CellLocations, Point } from './types';

const DIRECTIONS:Point[] = [
    {x: 0, y: -1}, //UP
    {x: 1, y: -1}, //UP RIGHT
    {x: 1, y: 0}, //RIGHT
    {x: 1, y: 1}, //DOWN RIGHT
    {x: 0, y: 1}, //DOWN
    {x: -1, y: 1}, //DOWN LEFT
    {x: -1, y: 0}, //LEFT
    {x: -1, y: -1}, //UP LEFT
  ]
  
export const GridHelpers = {
  //Returns whether @point is alive or dead
  isAlive(point: Point, cells:CellLocations): boolean {
    let ret:boolean = false;
    if (cells[point.x] !== undefined){
      if (cells[point.x][point.y] !== undefined){
        ret = true;
      }
    } 
    return ret;
  },
  isNeighbour(a: Point, b: Point, cells:CellLocations, width: number, height: number): boolean {
    var ret = false;
    for (const direction of DIRECTIONS){
      let dx = a.x + direction.x;
      let dy = a.y + direction.y;

      //If values are out of bounds, wrap around
      dx = dx >= width ? dx % width : dx < 0 ? width + dx : dx;
      dy = dy >= width ? dy % height : dy < 0 ? width + dy : dy; 

      if (dx === b.x && dy === b.y ) {
          ret = true;
          break;
      }
    }
    return ret;
  },
  numAliveNeighours(point: Point, cells: CellLocations,  width: number, height: number): number {
    const neighbourList = this.getNeighbours(point, cells, width, height);
    var numAliveNeighours = 0;
    for (const point of neighbourList) {
        if (this.isAlive(point, cells)) {
            numAliveNeighours++;
        }
    }
    return numAliveNeighours;
  },
  getNeighbours(point: Point, cells: CellLocations, width: number, height: number): Point[] {
    let ret = [];
    for (const direction of DIRECTIONS){
      let x = point.x + direction.x;
      let y = point.y + direction.y;

      //If values are out of bounds, wrap around
      x = x >= width ? x % width : x < 0 ? width + x : x;
      y = y >= width ? y % height : y < 0 ? width + y : y; 

      const bPoint = {x, y};
      ret.push(bPoint);
    }
    return ret;

  },
  //Returns a new grid with point toggled @point
  toggleCell(point:Point, cells:CellLocations): CellLocations{
    if (this.isAlive(point, cells)){
      delete cells[point.x][point.y];
    } else {
      if (cells[point.x] === undefined) {
        cells[point.x] = {};
      }
      cells[point.x][point.y] = true;
    }
    return cells;
  },
  test() {
    console.log('Testing');
    let testWidth=4;
    let testHeight=4;
    /*
        O--O
        O---
        ----
        O--O
    */
    let testCell1:CellLocations = {
        '0': {
            '0': true,
            '1': true,
            '3': true,
        },
        '3': {
            '0': true,
            '3': true,
        },
    }
    //Test isAlive
    console.assert(this.isAlive({x:0, y:0}, testCell1)); //Should be alive
    console.assert(this.isAlive({x:3, y:0}, testCell1)); //Should be alive
    console.assert(this.isAlive({x:1, y:1}, testCell1) === false); //should not be alive
    console.assert(this.isAlive({x:5, y:5}, testCell1) === false); //should not be alive

    //Test isNeighbours
    console.assert(this.isNeighbour({x:2, y:2}, {x:1, y:1}, testCell1, testWidth, testHeight)); //Should be true
    console.assert(this.isNeighbour({x:2, y:2}, {x:2, y:1}, testCell1, testWidth, testHeight)); //Should be true
    console.assert(this.isNeighbour({x:2, y:2}, {x:3, y:1}, testCell1, testWidth, testHeight)); //Should be true
    console.assert(this.isNeighbour({x:2, y:2}, {x:1, y:2}, testCell1, testWidth, testHeight)); //Should be true
    console.assert(this.isNeighbour({x:2, y:2}, {x:2, y:2}, testCell1, testWidth, testHeight) === false); //Should be false(is itself)
    console.assert(this.isNeighbour({x:2, y:2}, {x:3, y:2}, testCell1, testWidth, testHeight)); //Should be true
    console.assert(this.isNeighbour({x:2, y:2}, {x:1, y:3}, testCell1, testWidth, testHeight)); //Should be true
    console.assert(this.isNeighbour({x:2, y:2}, {x:2, y:3}, testCell1, testWidth, testHeight)); //Should be true
    console.assert(this.isNeighbour({x:2, y:2}, {x:3, y:3}, testCell1, testWidth, testHeight)); //Should be true
    console.assert(this.isNeighbour({x:2, y:2}, {x:0, y:0}, testCell1, testWidth, testHeight) === false); //Should be false
    console.assert(this.isNeighbour({x:1, y:1}, {x:3, y:3}, testCell1, testWidth, testHeight) === false); //Should be false

    //Test isNeighbours across boundary
    console.assert(this.isNeighbour({x:0, y:0}, {x:3, y:0}, testCell1, testWidth, testHeight)); //Should be true
    console.assert(this.isNeighbour({x:0, y:0}, {x:0, y:3}, testCell1, testWidth, testHeight)); //Should be true
    console.assert(this.isNeighbour({x:0, y:2}, {x:3, y:2}, testCell1, testWidth, testHeight)); //Should be true
    console.assert(this.isNeighbour({x:2, y:0}, {x:2, y:3}, testCell1, testWidth, testHeight)); //Should be true


    testWidth=6;
    testHeight=6;
    /*
        O--O-O
        -O----
        OOO-O-
        -O----
        O----O
        O--O--
    */
    let testCell2:CellLocations = {
        '0': {
            '0': true,
            '2': true,
            '4': true,
            '5': true,
        },
        '1': {
            '1': true,
            '2': true,
            '3': true,
        },
        '2': {
            '2': true,
        },
        '3': {
            '0': true,
            '5': true,
        },
        '5': {
            '0': true,
            '4': true,
        },
    }

    
    //Test getNumNeighbours
    console.assert(this.getNeighbours({x:0, y:0}, testCell2, testWidth, testHeight).length === 8); //Should be true
    console.assert(this.getNeighbours({x:1, y:1}, testCell2, testWidth, testHeight).length === 8); //Should be true
    console.assert(this.getNeighbours({x:3, y:4}, testCell2, testWidth, testHeight).length === 8); //Should be true
    console.assert(this.getNeighbours({x:0, y:4}, testCell2, testWidth, testHeight).length === 8); //Should be true
    console.assert(this.getNeighbours({x:5, y:4}, testCell2, testWidth, testHeight).length === 8); //Should be true
    console.assert(this.getNeighbours({x:3, y:0}, testCell2, testWidth, testHeight).length === 8); //Should be true
    console.assert(this.getNeighbours({x:3, y:5}, testCell2, testWidth, testHeight).length === 8); //Should be true

    //Test getNumLiveNeighbours
    console.assert(this.numAliveNeighours({x:1, y:2}, testCell2, testWidth, testHeight) === 4); //Should be true
    console.log(this.getNeighbours({x:0, y:5}, testCell2, testWidth, testHeight), this.numAliveNeighours({x:0, y:5}, testCell2, testWidth, testHeight));
    console.assert(this.numAliveNeighours({x:0, y:5}, testCell2, testWidth, testHeight) === 4); //Should be true
    
    console.assert(this.numAliveNeighours({x:4, y:2}, testCell2, testWidth, testHeight) === 0); //Should be true
    console.assert(this.numAliveNeighours({x:5, y:4}, testCell2, testWidth, testHeight) === 2); //Should be true
  }
}
GridHelpers.test();