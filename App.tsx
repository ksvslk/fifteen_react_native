import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { GameScreen } from './src/screens/GameScreen';
import { useScreens } from 'react-native-screens';
import { RouteName } from './src/enums/Constants';

useScreens();

const MainNavigator = createStackNavigator({
    Home: { screen: HomeScreen },
    Game: { screen:GameScreen}
  },
  { initialRouteName: RouteName.home}
  );

 
  
const App = createAppContainer(MainNavigator);

export default App;
