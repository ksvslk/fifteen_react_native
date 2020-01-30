import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameMoves, AppState, BoardState } from '../redux/types';
import { ColorName } from '../enums/Constants';
import { connect, Provider } from 'react-redux';
import UpCounter from './UpCounter';
import store from '../redux/store';

export interface Props {
    playerName: string,
    gameMoves: GameMoves,
    boardState: BoardState,
}
export interface State {
}


class Statistics extends React.Component<Props, State>{
    constructor(props) {
        super(props);
        console.log("is game over ?: " + this.props.boardState.gameOver)
    }

    render() {
        return(
            <View style={styles.upperView}>
                <View style={styles.upperRow}>
                <View style={styles.upperBlock} >
                <Provider store={store}>
                   <UpCounter></UpCounter>
                   </Provider>
                   </View>
                </View>
                <View style={styles.upperRow}>
                    <View style={styles.upperBlock} >
                        <Text style={styles.textStyle}>Clicks: {this.props.gameMoves.moves}</Text>
                        </View>
                </View>
                <View style={styles.upperRow}>
                    <View style={styles.upperBlock} >
                      <Text style={styles.textStyle}>Hello, {this.props.playerName}!</Text>
                        </View>
                </View>
          </View>
        )

    }
}

const mapStateToProps = (state: AppState, ownProps: {}) => ({
    gameMoves: state.gameMoves,
    boardState: state.boardState
});

export default connect(mapStateToProps)(Statistics);

const styles = StyleSheet.create({
    upperView:  {
        flex: 1,
        flexGrow: 1,
        flexDirection:"column",
        alignItems:"stretch",
        justifyContent:"center"
},
  upperRow:  {
    flex: 1,
    flexGrow: 1,
    alignItems:"center",
    justifyContent:"center"
},
  upperBlock:  {
    flex: 1,
    flexGrow: 1,
    position:"absolute",
    borderBottomColor:ColorName.colorCell
},

textStyle: {
    color: ColorName.colorCell,
    fontSize: 20,
    fontFamily: "Arial"
}
});
