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
  //Return true if @b is a neighbour of @a
  isNeighbour(a: Point, b: Point, cells:CellLocations, width: number, height: number): boolean {
    var ret = false;
    for (const direction of DIRECTIONS){ //Go through all directions of @a
      let dx = a.x + direction.x;
      let dy = a.y + direction.y;

      //If values are out of bounds, wrap around
      dx = dx >= width ? dx % width : dx < 0 ? width + dx : dx;
      dy = dy >= width ? dy % height : dy < 0 ? width + dy : dy; 

      if (dx === b.x && dy === b.y ) { //Is neighbour if @b is in this list
          ret = true;
          break;
      }
    }
    return ret;
  },
  //Get number of neighbours of @point that are alive
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
  //Get all neighbours of @point
  getNeighbours(point: Point, cells: CellLocations, width: number, height: number): Point[] {
    let ret = [];
    for (const direction of DIRECTIONS){ //Go through all directions of @a
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
  toggleCell(point:Point, cells:CellLocations): CellLocations {
    if (this.isAlive(point, cells)){
      delete cells[point.x][point.y]; //Kill cell if already alive
    } else {
      if (cells[point.x] === undefined) { //Instantiate this column
        cells[point.x] = {};
      }
      cells[point.x][point.y] = true; //Set this cell to true for alive
    }
    return cells;
  },
  //Generates a new generation of the grid
  generateNewGrid(cells: CellLocations, width: number, height: number): CellLocations {
    let newLiveCells:CellLocations = {};
    //First go through all the pooints
    for (const rowIndex in cells){
      const row = cells[rowIndex];
      for (const colIndex in row){
        const col = row[colIndex];
        let point:Point = {x: +rowIndex, y: +colIndex};
        let numNeighbours = GridHelpers.numAliveNeighours(point, cells, width, height);
        //Check condition 2
        if (numNeighbours >= 2 && numNeighbours <= 3) {
          if (newLiveCells[point.x] === undefined) {
            newLiveCells[point.x] = {};
          }
          newLiveCells[point.x][point.y] = true; //Add to new grid
        }

        //Check condition 4
        let neighbourList:Point[] = GridHelpers.getNeighbours(point, cells, width, height);
        for(const neighbour of neighbourList){ //Go through all the neighbours
          //IF neighbour is empty AND neighbour is not alive in new grid AND has atleast 2 live neighbours
          if (!GridHelpers.isAlive(neighbour, newLiveCells) && !GridHelpers.isAlive(neighbour, cells) && GridHelpers.numAliveNeighours(neighbour, cells, width, height) === 3){
            if (newLiveCells[neighbour.x] === undefined) {
              newLiveCells[neighbour.x] = {};
            }
            newLiveCells[neighbour.x][neighbour.y] = true;//Add to new grid
          }
        }

      }
    }
    return newLiveCells;
  },
  isEqual(cellsA:CellLocations, cellsB:CellLocations, width:number, height:number){
    let ret = true;
    let x;
    for (x = 0; x !== width && ret; x++){
        let y;
        for (y = 0; y !== width && ret; y++){
            const point:Point = { x, y };
            ret = this.isAlive(point, cellsA) === this.isAlive(point, cellsB);;
        }
    }
    return ret;
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
    console.assert(this.numAliveNeighours({x:0, y:5}, testCell2, testWidth, testHeight) === 4); //Should be true
    
    console.assert(this.numAliveNeighours({x:4, y:2}, testCell2, testWidth, testHeight) === 0); //Should be true
    console.assert(this.numAliveNeighours({x:5, y:4}, testCell2, testWidth, testHeight) === 2); //Should be true


    //Test example scenario given at https://user-images.githubusercontent.com/7149052/53603476-bfb00e00-3c05-11e9-8862-1dfd31836dcd.jpg
    testWidth=6;
    testHeight=6;
    let initial:CellLocations = {
        '1': {
            '3': true,
        },
        '2': {
            '1': true,
            '3': true,
        },
        '3': {
            '2': true,
            '3': true,
        },
    }
    
    //Test isEqual
    console.assert(this.isEqual(initial, initial, testWidth, testHeight));
    console.assert(this.isEqual(initial, testCell2, testWidth, testHeight) === false);
    let generation2Expected:CellLocations = {
        '1': {
            '2': true,
        },
        '2': {
            '3': true,
            '4': true,
        },
        '3': {
            '2': true,
            '3': true,
        },
    }
    let generation3Expected:CellLocations = {
        '1': {
            '3': true,
        },
        '2': {
            '4': true,
        },
        '3': {
            '2': true,
            '3': true,
            '4': true,
        },
    }
    let generation4Expected:CellLocations = {
        '2': {
            '2': true,
            '4': true,
        },
        '3': {
            '3': true,
            '4': true,
        },
        '4': {
            '3': true,
        }
    }
    let generation5Expected:CellLocations = {
        '2': {
            '4': true,
        },
        '3': {
            '2': true,
            '4': true,
        },
        '4': {
            '3': true,
            '4': true,
        }
    }
    let generation2 = this.generateNewGrid(initial, testWidth, testHeight);
    let generation3 = this.generateNewGrid(generation2, testWidth, testHeight);
    let generation4 = this.generateNewGrid(generation3, testWidth, testHeight);
    let generation5 = this.generateNewGrid(generation4, testWidth, testHeight);

    
    console.assert(this.isEqual(generation2, generation2Expected, testWidth, testHeight)); //Test if grid is expected result
    console.assert(this.isEqual(initial, generation2, testWidth, testHeight) === false); //Test if its different from previous generation
    console.assert(this.isEqual(generation3, generation3Expected, testWidth, testHeight));//Test if grid is expected result
    console.assert(this.isEqual(generation2, generation3, testWidth, testHeight) === false); //Test if its different from previous generation
    console.assert(this.isEqual(generation4, generation4Expected, testWidth, testHeight));//Test if grid is expected result
    console.assert(this.isEqual(generation4, generation3, testWidth, testHeight) === false); //Test if its different from previous generation
    console.assert(this.isEqual(generation5, generation5Expected, testWidth, testHeight));//Test if grid is expected result
    console.assert(this.isEqual(generation5, generation4, testWidth, testHeight) === false); //Test if its different from previous generation


  }
}
GridHelpers.test();