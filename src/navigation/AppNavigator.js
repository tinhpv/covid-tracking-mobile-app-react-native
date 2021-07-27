import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import CountriesScreen from '../screens/CountriesScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Countries: CountriesScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
