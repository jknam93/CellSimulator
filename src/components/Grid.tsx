import React from 'react';
import { CellLocations, Point } from '../types';

interface GridProps {
    width: number,
    height: number,
    liveCells: CellLocations,
};

export class Grid extends React.Component<GridProps> {
    constructor(props:GridProps){
        super(props);
    }
    renderCells() {
        console.log(this.state);
        let x: number, cells = [];
        for (x = 0; x !== this.props.width; x++){
            let y: number;
            for (y = 0; y !== this.props.height; y++){ 
                let cell = <div className="cell" style={{width: '100%', height:'100%', border:'1px solid black'}}/>;
                console.log(x,y);
                cells.push(cell);
            }
        }
        return cells;
    };
    render() {
        return (
            <div style={{display: 'grid', gap: '5px', gridTemplateColumns: `repeat(${this.props.width}, 20px)`, gridTemplateRows: `repeat(${this.props.height}, 20px)`} }>
                {this.renderCells()}
            </div>
        );
    }
};