import { GameMovesActions, AddGameMovesAction, GameMoves } from "../types";
import { GAME_MOVES_ACTION_TYPES } from "./actions";

export const initialState: GameMoves = {
        moves: 0,
        totalMoves: 0
}

export const gameMoves = (
    state: GameMoves = initialState,
    action: GameMovesActions
) => {
    // create deep copy of state
    const newState: GameMoves = {
            moves: state.moves,
            totalMoves: state.totalMoves
    }

    switch (action.type){
        case GAME_MOVES_ACTION_TYPES.ADD_MOVES:
            newState.moves += (action as AddGameMovesAction).amount
            newState.totalMoves += 1
            return newState

        case GAME_MOVES_ACTION_TYPES.RESET_MOVES:
            // zip objects together
            return {
                ...newState,
                ...{
                    moves:0,
                    totalMoves: newState.totalMoves + 1
                }
            };
            
        default:
            return state;
    } 
};