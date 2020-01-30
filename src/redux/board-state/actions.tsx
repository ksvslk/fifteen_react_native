import { ChangeBoardStateAction, ScrambleBoardAction } from "../types";

export enum BOARD_STATE_ACTION_TYPES {
    CHANGE_BOARD = 'BOARD_STATE:CHANGE',
    RESET_BOARD = 'BOARD_STATE:RESET',
    SCRAMBLE_BOARD = 'BOARD_STATE:SCRAMBLE',
}

// action creators
export const changeBoardState = (x: number, y: number): ChangeBoardStateAction => ({
    type: BOARD_STATE_ACTION_TYPES.CHANGE_BOARD,
    x: x,
    y: y
})

export const scrambleBoard = (): ScrambleBoardAction => ({
    type: BOARD_STATE_ACTION_TYPES.SCRAMBLE_BOARD
})