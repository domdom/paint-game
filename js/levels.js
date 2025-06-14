const CellKind = {
    Start: 0,
    Random: 1,
    Empty: null,
};
const CellColors = {
    Random: 0,
    Red: 1,
    Orange: 2,
    Yellow: 3,
    Green: 4,
    Blue: 5,
    Purple: 6,
    // Special cell colors
    Start: 'start',
    Empty: 'empty',
};
let LEVELS = (() => {
    let E = CellKind.Empty;
    let R = CellKind.Random;
    let S = CellKind.Start;
    return [
        {
            name: 'grid', maxMoves: 20, grid: [
                [S, R, R, R, R, R, R,],
                [R, E, R, E, R, E, R,],
                [R, R, R, R, R, R, R,],
                [R, E, R, E, R, E, R,],
                [R, R, R, R, R, R, R,],
                [R, E, R, E, R, E, R,],
                [R, R, R, R, R, R, R,],
            ]
        },
        {
            name: 'lil\' em' , maxMoves: 11, grid: [
                [R, R, R, R, R,],
                [R, E, R, E, R,],
                [S, E, R, E, R,],
            ]
        },
        {
            name: '& M', maxMoves: 30, grid: [
                [R, R, R, E, E, R, R, R, E, E, R, R, R,],
                [R, R, R, R, R, R, R, R, R, R, R, R, R,],
                [R, R, R, E, E, R, R, R, E, E, R, R, R,],
                [R, R, R, E, E, R, R, R, E, E, R, R, R,],
                [R, R, R, E, E, R, R, R, E, E, R, R, R,],
                [R, R, R, E, E, R, R, R, E, E, R, R, R,],
                [R, R, R, E, E, R, R, R, E, E, R, R, R,],
                [R, R, R, E, E, R, R, R, E, E, R, R, R,],
                [R, S, R, E, E, R, R, R, E, E, R, R, R,],
                [R, R, R, E, E, R, R, R, E, E, R, R, R,],
            ]
        },
        {
            name: 'circle', maxMoves: 25, grid: [
                [E, E, S, R, R, R, R, R, E, E,],
                [E, R, R, R, R, R, R, R, R, E,],
                [R, R, R, R, R, R, R, R, R, R,],
                [R, R, R, R, R, R, R, R, R, R,],
                [R, R, R, R, E, E, R, R, R, R,],
                [R, R, R, R, E, E, R, R, R, R,],
                [R, R, R, R, R, R, R, R, R, R,],
                [R, R, R, R, R, R, R, R, R, R,],
                [E, R, R, R, R, R, R, R, R, E,],
                [E, E, R, R, R, R, R, R, E, E,],
            ]
        },
        {
            name: 'jewel', maxMoves: 20, grid: [
                [S, R, R, R, R, R, R,],
                [R, E, E, R, E, E, R,],
                [R, E, R, R, R, E, R,],
                [R, R, R, E, R, R, R,],
                [R, E, R, R, R, E, R,],
                [R, E, E, R, E, E, R,],
                [R, R, R, R, R, R, R,],
            ]
        },
        {
            name: 'cross', maxMoves: 22, grid: [
                [E, E, E, S, R, R, R, E, E, E,],
                [E, E, E, R, R, R, R, E, E, E,],
                [E, E, E, R, R, R, R, E, E, E,],
                [R, R, R, R, R, R, R, R, R, R,],
                [R, R, R, R, R, R, R, R, R, R,],
                [R, R, R, R, R, R, R, R, R, R,],
                [R, R, R, R, R, R, R, R, R, R,],
                [E, E, E, R, R, R, R, E, E, E,],
                [E, E, E, R, R, R, R, E, E, E,],
                [E, E, E, R, R, R, R, E, E, E,],
            ]
        },
        {
            name: 'snake', maxMoves: 25, grid: [
                [S, R, E, E, R, R, R, R, R, R,],
                [R, R, E, E, R, R, R, R, R, R,],
                [R, R, E, E, R, R, E, E, R, R,],
                [R, R, E, E, R, R, E, E, R, R,],
                [R, R, E, E, R, R, E, E, R, R,],
                [R, R, E, E, R, R, E, E, R, R,],
                [R, R, E, E, R, R, E, E, R, R,],
                [R, R, E, E, R, R, E, E, R, R,],
                [R, R, R, R, R, R, E, E, R, R,],
                [R, R, R, R, R, R, E, E, R, S,],
            ]
        },
        {
            name: 'snnnnnnnaaaaaaaaaakkkkkkkkeeeee', maxMoves: 273, grid: [
                [S, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R,],
                [R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R,],
                [R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R,],
                [R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R,],
                [R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R,],
                [R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R,],
                [R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R,],
                [R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R, E, E, R, R,],
                [R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R,],
                [R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R, R, R, R, R, E, E, R, R,],
            ]
        },
        {
            name: 'dom loves you!', target: CellColors.Red, maxMoves: 20, grid: [
                [E, E, E, R, E, E, E, R, E, E, E,],
                [E, R, R, R, R, E, R, R, R, R, E,],
                [R, R, R, R, R, R, R, R, R, R, R,],
                [R, R, R, R, R, R, R, R, R, R, R,],
                [R, R, R, R, R, R, R, R, R, R, R,],
                [E, R, R, R, R, R, R, R, R, R, E,],
                [E, R, R, R, R, R, R, R, R, R, E,],
                [E, E, R, R, R, R, R, R, R, E, E,],
                [E, E, E, E, R, R, R, E, E, E, E,],
                [E, E, E, E, E, S, E, E, E, E, E,],
            ]
        },
        {
            name: '5xrandom swirl', maxMoves: 120, grid: [
                [R, R, R, R, R, R, R, R, E, R, R, R, R, R, R, R, R, R, R, R,],
                [R, R, R, R, R, R, R, R, E, R, R, R, R, R, R, R, R, R, R, R,],
                [R, R, E, E, E, E, R, R, E, R, R, E, E, E, E, E, E, E, R, R,],
                [R, R, E, R, R, E, R, R, E, R, R, E, R, R, R, R, R, E, R, R,],
                [R, R, E, S, R, E, R, R, E, R, R, E, R, R, R, R, R, E, R, R,],
                [R, R, E, R, R, R, R, R, E, R, R, E, R, R, E, R, R, E, R, R,],
                [R, R, E, R, R, R, R, R, E, R, R, E, R, R, E, R, R, E, R, R,],
                [R, R, E, E, E, E, E, E, E, R, R, E, R, R, E, E, E, E, R, R,],
                [R, R, R, R, R, R, R, R, R, R, R, E, R, R, R, R, R, R, R, R,],
                [R, R, R, R, R, R, R, R, R, R, R, E, R, R, R, R, R, R, R, R,],
            ]
        },
        {
            name: 'Arrow', maxMoves: 25, grid: [
                [E, E, E, S, E, E, E, E, E, E, E,],
                [E, E, R, R, R, E, E, E, E, E, E,],
                [E, R, R, R, R, R, E, E, E, E, E,],
                [R, R, R, R, R, R, R, E, E, E, E,],
                [E, E, R, R, R, E, E, R, E, E, E,],
                [E, E, R, R, R, E, E, R, R, E, E,],
                [E, E, R, R, R, R, R, R, R, R, E,],
                [E, E, R, R, R, R, R, R, R, R, R,],
                [E, E, R, R, R, R, R, R, R, R, E,],
                [E, E, E, E, E, E, E, R, R, E, E,],
                [E, E, E, E, E, E, E, R, E, E, E,],
            ]
        },
        {
            name: 'small', maxMoves: 7, grid: [
                [S, R, R, R,],
                [E, E, E, E,],
                [R, R, R, R,],
                [R, R, R, S,],
            ]
        },
        {
            name: 'one', maxMoves: 1, grid: [
                [S, R],
            ]
        },
    ];
})();
