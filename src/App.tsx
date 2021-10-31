import React from 'react';

import './App.css';

import { Grid } from './components/Grid';
import { CellLocations, Point } from './types';
import { GridHelpers } from './gridHelpers';

const INITIAL_WIDTH:number = 30;
const INITIAL_HEIGHT:number = 30;

interface AppState {
  width: number,
  height: number,
  liveCells: CellLocations,
  automaticGeneration: Boolean,
}

export class App extends React.Component<{},AppState> {
  constructor(props = {}){
    super(props);
    this.state = {
      width: INITIAL_WIDTH,
      height: INITIAL_HEIGHT,
      liveCells: {},
      automaticGeneration: false,
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
  //Reset the state of the grid
  onReset() {
    this.setState({
      width: INITIAL_WIDTH,
      height: INITIAL_HEIGHT,
      liveCells: {},
      automaticGeneration: false,
    });
  }
  //Generate next grid
  onNext() {
    const newCells = GridHelpers.generateNewGrid(this.state.liveCells, this.state.width, this.state.height);
    this.setState({
      liveCells: newCells,
    });
  }
  //Automatically generate a new grid every 400ms
  onAutomate() {
    const self = this;
    const automationCallback = ()=>{
      self.onNext();
      if (this.state.automaticGeneration) {
        setTimeout(automationCallback, 400)
      }
    };
    setTimeout(automationCallback, 400)

    this.setState({
      automaticGeneration: !this.state.automaticGeneration,
    });
  }
  onRunExampleScenario() {
    let exampleScenario:CellLocations = {
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
    this.setState({
      liveCells: exampleScenario,
      width: 6, 
      height: 6,
    });
  }
  render () {
    return (
      <>
        <Grid width={this.state.width} height={this.state.height} liveCells={this.state.liveCells} toggleCellConstructor={this.toggleCellConstructor.bind(this)}/>
        <button onClick={this.onAddCol.bind(this)}>Add Column</button>
        <button onClick={this.onAddRow.bind(this)}>Add Row</button><br/>
        <button onClick={this.onNext.bind(this)}>Next</button>
        <button onClick={this.onAutomate.bind(this)}>Automate: {this.state.automaticGeneration ? 'ON' : 'OFF'}</button><br/>
        <button onClick={this.onReset.bind(this)}>Reset</button><br/>
        <button onClick={this.onRunExampleScenario.bind(this)}>Run Example</button>
      </>
    );
  };
}

export default App;

