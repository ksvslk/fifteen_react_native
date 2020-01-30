import { BoardState, BoardStateActions, ChangeBoardStateAction } from "../types";
import { BOARD_STATE_ACTION_TYPES } from "./actions";
import { FifteenLogic } from "./fifteen-logic";


export const fifteenLogic = new FifteenLogic(4)

export const initialState: BoardState = {
    positions: fifteenLogic.gameBoard,
    gameOver: false
}

export const boardState = (
    state: BoardState = initialState,
    action: BoardStateActions
) => {
    // create deep copy of state
    const newState: BoardState = {
        positions: state.positions,
        gameOver: state.gameOver
    }

    switch (action.type){
        case BOARD_STATE_ACTION_TYPES.CHANGE_BOARD:
            if(!newState.gameOver) {
                newState.positions = fifteenLogic.moveBlocks(
                    (action as ChangeBoardStateAction).x,
                    (action as ChangeBoardStateAction).y,
                     state.positions
                     )
                fifteenLogic.gameBoard = newState.positions
                newState.gameOver = fifteenLogic.isGameOver()
            }
            return newState
        case BOARD_STATE_ACTION_TYPES.SCRAMBLE_BOARD:
            fifteenLogic.scramble()
            fifteenLogic.gameOver = false
            newState.gameOver = false
            newState.positions = fifteenLogic.gameBoard
            return newState
        default:
            return state;
    } 
};