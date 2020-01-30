import { AppState } from "./types";
import { gameMoves } from "./game-moves/reducer"
import { boardState } from "./board-state/reducer"
import { createStore, combineReducers } from "redux";

export default createStore(
    combineReducers<AppState>({
        gameMoves, boardState
    })
)
