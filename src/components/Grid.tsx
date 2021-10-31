import React from 'react';
import { CellLocations, Point } from '../types';

interface GridProps {
    width: number,
    height: number,
    liveCells: CellLocations,
    toggleCellConstructor: (point:Point) => () => undefined
};

export class Grid extends React.Component<GridProps> {
    constructor(props:GridProps){
        super(props);
    }
    renderCells() {
        let y: number, cells = [];
        for (y = 0; y !== this.props.height; y++){
            let x: number;
            for (x = 0; x !== this.props.width; x++){ 
                let point:Point = {x, y};
                let style = {width: '100%', height:'100%', backgroundColor: 'initial', fontSize: '8px', border: '0.2px solid grey'};
                let toggleCellCallback = this.props.toggleCellConstructor(point);

                if (this.props.liveCells[x] !== undefined && this.props.liveCells[x][y] !== undefined ) {
                    style.backgroundColor = 'black';
                }

                let cell = <div className="cell" style={style} onClick={toggleCellCallback} key={'x-'+x+'-y-'+y}></div>;
                cells.push(cell);
            }
        }
        return cells;
    };
    render() {
        return (
            <div style={{display: 'grid', gap: '-1px', gridTemplateColumns: `repeat(${this.props.width}, 10px)`, gridTemplateRows: `repeat(${this.props.height}, 10px)`} }>
                {this.renderCells()}
            </div>
        );
    }
};