import React from 'react';
import { Icon } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DetailScreen from './src/views/DetailsScreen'

import HistoryScreen from './src/views/HistoryScreen'
import ScanScreen from './src/views/ScanScreen'
import ResultScreen from './src/views/ResultScreen'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { AsyncStorage } from 'react-native';



function ScanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Scanner" component={ScanScreen}></Stack.Screen>
      <Stack.Screen name="Details" component={DetailScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    //AsyncStorage.clear();

    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case 'History':
                  iconName = 'hourglass';
                  break;
                case 'Scanner':
                  iconName = 'barcode';
                  break;
                case 'Results':
                  iconName = 'analytics';
                  break;
                default: iconName = 'home'
              }
              return <Icon name={iconName} style={{ fontSize: size, color }} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Scanner" component={ScanStack} />
          <Tab.Screen name="History" component={HistoryScreen} />
          <Tab.Screen name="Results" component={ResultScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}