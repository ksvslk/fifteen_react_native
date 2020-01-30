import React, { Dispatch } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { AppState, BoardState } from '../redux/types';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { changeBoardState, scrambleBoard } from '../redux/board-state/actions';
import { ColorName } from '../enums/Constants';
import { addGameMoves, resetGameMoves } from '../redux/game-moves/actions';

export interface Props {
    boardState: BoardState,
    onChangeBoardState: (x: number, y: number, b: boolean) => Promise<void>,
    resetGame: () => Promise<void>
}
export interface State {
}

class Board extends React.Component<Props, State>{
 
    constructor(props) {
        super(props);
        this.props.resetGame()
    }

    isGameOver(): boolean {
        return this.props.boardState.gameOver
    }
    
    createBoard = () => {
        let rows = []
        for (let i = 0; i < 4; i++) {
            let blocks = []
            for (let j = 0; j < 4; j++) {
                if (this.props.boardState.positions[i][j] == 15 && !this.isGameOver()) {
                    blocks.push(
                            <TouchableOpacity key={i+j} style={styles.emptyButton}
                                onPress={() => this.props.onChangeBoardState(i, j, this.isGameOver())}>
                                <Text></Text>
                            </TouchableOpacity>
                      )
                }
                else if(this.props.boardState.positions[i][j] == 15 && this.isGameOver()) {
                    blocks.push(
                    <TouchableOpacity key={i+j} style={styles.gameOverButton}
                    onPress={() => this.props.onChangeBoardState(i, j, this.isGameOver())}>
                    <Text></Text>
                </TouchableOpacity>
                    )
                }
                else {
                    blocks.push(
                            <TouchableOpacity key={i+j} style={styles.button}
                                onPress={() => this.props.onChangeBoardState(i, j, this.isGameOver())}>
                                <Text>{this.props.boardState.positions[i][j] + 1}</Text>
                            </TouchableOpacity>
                        )
                }
            }
            rows.push(<View key={i+10} style={styles.bottomRow}>{blocks}</View>)
        }
        return rows
    }

    render() {
        return (
            <View style={styles.bottomView}>
                {this.createBoard()}
            </View>
        )
        
    }

}


const mapStateToProps = (state: AppState, ownProps:{}) => ({
    boardState: state.boardState
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    onChangeBoardState: (x: number, y: number, b: boolean) => {
        if(b == false) {
            dispatch(changeBoardState(x,y)),
            dispatch(addGameMoves(1))
             }
         },
    resetGame: () => {
            dispatch(scrambleBoard())
            dispatch(resetGameMoves())
        }
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);

const styles = StyleSheet.create({

    button: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: ColorName.colorCell,
        borderWidth: 0.5,
        borderColor: ColorName.colorCellBorder,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyButton: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: ColorName.colorPrimaryDark,
        borderWidth: 0.5,
        borderColor: ColorName.colorCellBorder,
        justifyContent: "center",
        alignItems: "center",
    },
    gameOverButton: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: ColorName.colorPrimary,
        borderWidth: 0.5,
        borderColor: ColorName.colorCellBorder,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomView: {
        flex: 1,
        flexGrow: 1,
        flexDirection: "column",
        aspectRatio: 1,
    },
    bottomRow: {
        flex: 1,
        flexGrow: 1,
        flexDirection: "row",
    },
    bottomBlock: {
        flex: 1,
        flexGrow: 1,
        borderWidth: 0.5,
        alignItems: "stretch",
        backgroundColor: ColorName.colorPrimary,
        borderColor: ColorName.colorCellBorder,
    },

});
