import { AddGameMovesAction, ResetGameMovesAction } from "../types";

export enum GAME_MOVES_ACTION_TYPES {
    ADD_MOVES = 'GAME_MOVES:ADD',
    RESET_MOVES = 'GAME_MOVES:RESET'
}

// action creators
export const addGameMoves = (amount: number): AddGameMovesAction => ({
    type: GAME_MOVES_ACTION_TYPES.ADD_MOVES,
    amount: amount
})

export const resetGameMoves = (): ResetGameMovesAction => ({
    type: GAME_MOVES_ACTION_TYPES.RESET_MOVES,
})
