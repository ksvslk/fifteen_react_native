import React from 'react';
import { Button, View, StyleSheet, Text, TextInput } from 'react-native';
import { 
    NavigationScreenProp,
    NavigationState,
    NavigationParams, 
    SafeAreaView} from 'react-navigation';
import { ColorName } from '../enums/Constants';


interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface State {
    name:string;
}

export class HomeScreen extends React.Component<Props, State> {
     constructor(props: Props) {
         super(props); 

     this.state = {
            name: 'Player1'
        }
    }

     static navigationOptions = { title: 'Home' };

    render() {
        const { navigate } = this.props.navigation;

        return (
<SafeAreaView style={styles.mainColumn}>
<View style={styles.upperView}>
<Text style={styles.title}>fifteen</Text>
</View>
<View style={styles.bottomView}>
<Text style={styles.nameLabel}>Enter your name:</Text>
                <TextInput
                    style={styles.nameInput}
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })} />
                    <View style={styles.buttonView}>
                    <Button
                    title="Play!"
                    color={ColorName.colorAccent}
                    onPress={() => navigate("Game", {playerName: this.state.name })}
                />
                    </View>
     </View>
</SafeAreaView>
        );
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
    upperView: {
        flex: 1,
        flexGrow: 1,
        justifyContent:"center",
        alignContent:"center",
    },
    bottomView: {
        flex: 1,
        flexGrow: 1,
        alignItems:"stretch",
        justifyContent:"center",
        alignContent:"center",
        padding:10,
        borderWidth: 2,
        backgroundColor: ColorName.colorPrimary
    },
    nameLabel: {
        fontSize: 20,
        color: ColorName.colorCellBorder,
        padding:10,
        alignSelf:"center",
    },
    buttonView: {
        fontSize: 20,
        padding:10
    },
    nameInput: {
        fontSize: 20,
        color: ColorName.colorCell,
        borderBottomWidth:1,
        borderBottomColor:ColorName.colorCellBorder,
        width: 200,
        textAlign:"center",
        alignSelf:"center",
    },
    title: {
        fontSize: 30,
        color: ColorName.colorCell,
        alignSelf:"center",
    }
});
