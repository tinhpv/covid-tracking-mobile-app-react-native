import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import CountriesScreen from '../screens/CountriesScreen';
import CountryDetailScreen from '../screens/CountryDetailScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Countries: CountriesScreen,
    CountryDetail: CountryDetailScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
