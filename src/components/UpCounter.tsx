import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { ColorName } from '../enums/Constants';
import { AppState, BoardState } from '../redux/types';
import { connect } from 'react-redux';

export interface Props {
    boardState: BoardState,
}

class UpCounter extends Component<Props> {

    state = {
        timer: null,
        minutes: '00',
        seconds: '00',
        milliseconds: '00',
    }

    constructor( props ) {
        super( props );
        this.start = this.start.bind(this);
    }

    componentDidUpdate(){
        if(this.props.boardState.gameOver) {
            clearInterval(this.state.timer);
        }
    }

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    start() {
        var self = this;
        let timer = setInterval(() => {
            var ms = (Number(this.state.milliseconds) + 1).toString(),
                s = this.state.seconds,
                min = this.state.minutes;

            if( Number(this.state.milliseconds) == 99 ) {
                s = (Number(this.state.seconds) + 1).toString();
                ms = '00';
            }
            if( Number(this.state.seconds) == 60 ) {
                min = (Number(this.state.minutes) + 1).toString();
                s = '00';
            }
            self.setState({
                minutes: min.length == 1 ? '0' + min : min,
                seconds: s.length == 1 ? '0' + s : s,
                milliseconds: ms.length == 1 ? '0' + ms : ms
            });
        }, 0);
            this.setState({timer})
    }

    render() {
        return(
            <View style={styles.container}>
                   <Text style={styles.minutes}>
                    {this.state.minutes}:
                </Text>
                <Text style={styles.seconds}>
                    {this.state.seconds}:
                </Text>
                <Text style={styles.milliseconds}>
                    {this.state.milliseconds}
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps:{}) => ({
    boardState: state.boardState
});

export default connect(mapStateToProps)(UpCounter);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexDirection:"row",
        alignItems:"stretch",
        justifyContent:"center",
      backgroundColor: ColorName.colorCell,
      padding: 5
    },
    minutes: {
        fontSize: 30,
      },
    seconds: {
      fontSize: 30,
    },
    milliseconds: {
        fontSize:30,
    }
});
