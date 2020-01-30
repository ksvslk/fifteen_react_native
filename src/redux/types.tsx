// sub-state object type
export type GameMoves = {
    moves: number;
    totalMoves: number;
}

export type BoardState = {
    positions:number[][]
    gameOver:boolean
}

// biggest state object we handle
export type AppState = {
    gameMoves: GameMoves,
    boardState: BoardState
    // add more sub-states here
}

// action types
export type AddGameMovesAction = {
    // constant string
    type: string
    amount: number
}

export type ResetGameMovesAction = {
    type: string
}

export type ChangeBoardStateAction = {
    type: string
    x: number
    y: number
}

export type ScrambleBoardAction = {
    type: string
}

// combined type of Actions
export type GameMovesActions = AddGameMovesAction | ResetGameMovesAction;
export type BoardStateActions = ChangeBoardStateAction | ScrambleBoardAction;

