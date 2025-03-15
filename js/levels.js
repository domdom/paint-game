const CellKind = {
    Start: 0,
    Random: 1,
    Empty: null,
};
let LEVELS = (() => {
    let E = CellKind.Empty;
    let R = CellKind.Random;
    let S = CellKind.Start;
    return [
        {
            name: 'small', maxMoves: 5, grid: [
                [S, R, R, R,],
                [E, E, E, E,],
                [R, R, R, R,],
                [R, R, R, S,],
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
            name: 'cross', maxMoves: 25, grid: [
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
            name: 'dom loves you!', maxMoves: 25, grid: [
                [E, E, E, R, E, E, E, R, E, E, E,],
                [E, R, R, R, R, E, R, R, R, R, E,],
                [R, R, R, R, R, R, R, R, R, R, R,],
                [R, R, R, R, R, R, R, R, R, R, R,],
                [R, R, R, R, R, S, R, R, R, R, R,],
                [E, R, R, R, R, R, R, R, R, R, E,],
                [E, R, R, R, R, R, R, R, R, R, E,],
                [E, E, R, R, R, R, R, R, R, E, E,],
                [E, E, E, E, R, R, R, E, E, E, E,],
                [E, E, E, E, E, R, E, E, E, E, E,],
            ]
        },
        {
            name: 'EMPTY', maxMoves: 25, grid: [
                [E, E, E, E, E, E, E, E, E, E,],
                [E, E, E, E, E, E, E, E, E, E,],
                [E, E, E, E, E, E, E, E, E, E,],
                [E, E, E, E, E, E, E, E, E, E,],
                [E, E, E, E, E, E, E, E, E, E,],
                [E, E, E, E, E, E, E, E, E, E,],
                [E, E, E, E, E, E, E, E, E, E,],
                [E, E, E, E, E, E, E, E, E, E,],
                [E, E, E, E, E, E, E, E, E, E,],
                [E, E, E, E, E, E, E, E, E, E,],
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
            name: 'PENIS', maxMoves: 13, grid: [
                [E, E, E, E, E, R, E, E, E, E,],
                [E, E, E, E, R, R, R, E, E, E,],
                [E, E, E, E, R, R, R, E, E, E,],
                [E, E, E, E, R, R, R, E, E, E,],
                [E, E, E, E, R, R, R, E, E, E,],
                [E, E, E, E, R, R, R, E, E, E,],
                [E, E, R, R, R, R, R, R, R, E,],
                [E, R, R, R, R, S, R, R, R, R,],
                [E, E, R, R, R, E, R, R, R, E,],
                [E, E, E, E, E, E, E, E, E, E,],
            ]
        },
    ];
})();
