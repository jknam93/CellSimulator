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
  generateNewGrid(cells: CellLocations): CellLocations{
    return {};
  }

  generateOnAddColCallback(){
    const self = this;
    return function(){
      const newWidth = self.state.width+1;
      self.setState({
        width: newWidth,
      });
    }
  }
  generateOnAddRowCallback(){
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
        <Grid width={this.state.width} height={this.state.height} liveCells={this.state.liveCells}/>
        <button onClick={this.generateOnAddRowCallback()}>Add Row</button>
        <button onClick={this.generateOnAddColCallback()}>Add Column</button>
        <button>Reset</button>
        <button>Next</button>
      </>
    );
  };
}

export default App;
