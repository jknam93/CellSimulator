import React from 'react';

import './App.css';

import { Grid } from './components/Grid';
import { CellLocations, Point } from './types';

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
  isAlive(point: Point): boolean {
    return true;
  };
  isNeighbour(a: Point, b: Point): boolean {
    return true;
  };
  generateNewGrid(cells: CellLocations): CellLocations {
    return {};
  }

  toggleCellConstructor(point: Point) {
    let self = this;
    return function(): undefined{
      console.log(point, self);
      return undefined;
    }
  }

  onAddCol() {
    const self = this;
    return function(){
      const newWidth = self.state.width+1;
      self.setState({
        width: newWidth,
      });
    }
  }
  onAddRow() {
    const self = this;
    return function(){
      const newHeight = self.state.height+1;
      self.setState({
        height: newHeight,
      });
    }
  }
  render () {
    return (
      <>
        <Grid width={this.state.width} height={this.state.height} liveCells={this.state.liveCells} toggleCellConstructor={this.toggleCellConstructor.bind(this)}/>
        <button onClick={this.onAddCol.bind(this)}>Add Column</button>
        <button onClick={this.onAddRow.bind(this)}>Add Row</button>
        <button>Reset</button>
        <button>Next</button>
      </>
    );
  };
}

export default App;
