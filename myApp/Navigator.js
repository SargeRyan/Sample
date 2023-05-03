import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-Navigation';
import Register from './Register';



const stackNavigatorOptions = {
    headerShown: false

}
const AppNavigator = createStackNavigator({
    Registration:{screen:Registration}

},
{
defaultNavigationOptions : stackNavigatorOptions

}
);

export default createAppContainer(AppNavigator);