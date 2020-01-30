import React, { Dispatch } from 'react';
import { View, Text, Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import { 
    NavigationScreenProp,
    NavigationState } from 'react-navigation';
import Statistics from '../components/Statistics';
import Board from '../components/Board';
import { ScreenOrientationName, ColorName } from '../enums/Constants';
import { Provider, connect } from 'react-redux';
import store from '../redux/store';

interface NavigationParams {playerName: string; }

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export interface State {
    screenOrientation: string;
}
export class GameScreen extends React.Component<Props, State> {
    
     constructor(props: Props) {
         super(props);
        this.state = {
            screenOrientation: this.isPortrait() ? ScreenOrientationName.portrait : ScreenOrientationName.landscape,
        }
        
     }

    setDimension = () => {
        this.setState({screenOrientation: this.isPortrait() ? ScreenOrientationName.portrait : ScreenOrientationName.landscape});
    }  

        isPortrait = (): boolean => {
            const dim = Dimensions.get('screen')
            return dim.height >= dim.width
        }

     static navigationOptions = { title: 'Game' };

     componentDidMount() {
        Dimensions.addEventListener('change', this.setDimension)
     }
  
     componentWillUnmount(){
        Dimensions.removeEventListener('change', this.setDimension)
     }
   
    render() {
        const navigate = this.props.navigation.navigate;
        // this.props.navigation.state.params.playerName

        if(this.state.screenOrientation == ScreenOrientationName.portrait) {
            return (
                <Provider store={store}>
                   <SafeAreaView style={styles.mainColumn}>
                       <View style={styles.stats}>
                       <Statistics playerName={this.props.navigation.state.params.playerName}></Statistics>
                       </View>
                       <View style={styles.board}>
                       <Board></Board>
                            </View>
                   </SafeAreaView>
                   </Provider>
            );
        } else {

            return (
                <Provider store={store}>
                <SafeAreaView style={styles.mainRow}>
                <View style={styles.stats}>
                <Statistics playerName={this.props.navigation.state.params.playerName}></Statistics>
                </View>
                <View style={styles.board}>
                <Board> </Board>
                     </View>
            </SafeAreaView>
            </Provider>
            );
        }

    }
}

const styles = StyleSheet.create({
    mainColumn: {
      flex: 1,
      flexGrow: 1,
      flexDirection: 'column',
      backgroundColor: ColorName.colorPrimaryDark
    },
    mainRow: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'row',
        backgroundColor: ColorName.colorPrimaryDark
      },
    stats: {
        flex: 1,
        flexGrow: 1,
    },
    board: {
        flex: 1,
        flexGrow: 1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        borderWidth: 2,
        backgroundColor: ColorName.colorPrimary
    }
});
