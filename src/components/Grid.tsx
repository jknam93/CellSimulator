import React from 'react';

interface GridProps {
    initialWidth: number,
    initialHeight: number,
};
interface GridState {
    width: number,
    height: number,
    liveCells:{[index: number]: {[index:number]: boolean}}, //2d map containing the live cell location
};

export class Grid extends React.Component<GridProps, GridState> {
    constructor(props:GridProps){
        super(props);
        this.state = {
            width: props.initialWidth,
            height: props.initialHeight,
            liveCells: {},
        }
    }
    isAlive(x: number, y: number): boolean {
        return true;
    };
    isNeighbour(ax: number, ay: number, bx: number, xy: number): boolean {
        return true;
    };
    renderCells() {
        console.log(this.state);
        let x: number, cells = [];
        for (x = 0; x !== this.state.width; x++){
            let y: number;
            for (y = 0; y !== this.state.height; y++){ 
                let cell = <div className="cell" style={{width: '100%', height:'100%', border:'1px solid black'}}/>;
                console.log(x,y);
                cells.push(cell);
            }
        }
        return cells;
    };
    render() {
        return (
            <div style={{display: 'grid', gap: '5px', gridTemplateColumns: `repeat(${this.state.width}, 20px)`, gridTemplateRows: `repeat(${this.state.height}, 20px)`} }>
                {this.renderCells()}
            </div>
        );
    }
};