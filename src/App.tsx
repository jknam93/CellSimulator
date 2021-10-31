import React from 'react';

import './App.css';

import { Grid } from './components/Grid';
import { CellLocations, Point } from './types';
import { GridHelpers } from './gridHelpers';

const INITIAL_WIDTH:number = 10;
const INITIAL_HEIGHT:number = 10;


interface AppState {
  width: number,
  height: number,
  liveCells: CellLocations
}

export class App extends React.Component<{},AppState> {
  constructor(props = {}){
    super(props);
    this.state = {
      width: INITIAL_WIDTH,
      height: INITIAL_HEIGHT,
      liveCells: {}
    }
  }


  /* CALL BACKS AND CALL BACK GENERATORS */
  //A function constructor that returns a function that toggle the cell @point
  toggleCellConstructor(point: Point) {
    let self = this;
    return function(): undefined{
      let cells = GridHelpers.toggleCell(point, self.state.liveCells);

      self.setState({
        liveCells: cells,
      })
      return undefined;
    }
  }
  //Add a new column to the grid
  onAddCol() {
    const newWidth = this.state.width+1;
    this.setState({
      width: newWidth,
    });
  }
  //Add a new row to the grid
  onAddRow() {
    const newHeight = this.state.height+1;
    this.setState({
      height: newHeight,
    });
  }
  onReset() {
    this.setState({
      width: INITIAL_WIDTH,
      height: INITIAL_HEIGHT,
      liveCells: {}
    });
  }
  onNext() {
    const newCells = GridHelpers.generateNewGrid(this.state.liveCells, this.state.width, this.state.height);
    this.setState({
      liveCells: newCells,
    });
  }
  render () {
    return (
      <>
        <Grid width={this.state.width} height={this.state.height} liveCells={this.state.liveCells} toggleCellConstructor={this.toggleCellConstructor.bind(this)}/>
        <button onClick={this.onAddCol.bind(this)}>Add Column</button>
        <button onClick={this.onAddRow.bind(this)}>Add Row</button>
        <button onClick={this.onReset.bind(this)}>Reset</button>
        <button onClick={this.onNext.bind(this)}>Next</button>
      </>
    );
  };
}

export default App;

