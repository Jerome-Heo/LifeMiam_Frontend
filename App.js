import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import RecipeScreen from './screens/RecipeScreen'; //je les mets dans le doute
import ListScreen from './screens/ListScreen';  //je les mets dans le doute

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions = {({ route }) => ({
      tabBarIcon: ({ color, size}) => {
        let iconName= '';

        if(route.name === 'Menu'){
          // iconName = 'faUtensils'; //L'icone n'est pas trouvée
        } else if (route.name === 'Search') {
          // iconName = 'faMagnifying-glass'; //L'icone n'est pas trouvée
        } else if (route.name === 'Profile'){
          iconName = 'user'
        }

        return <FontAwesome name={iconName} size={size} color={color}/>;
      },
      tabBarActiveTintColor: '#E7D37F',
      tabBarInactiveTintColor: '#81A263',
      headerShown: false,
    })}>
      <Tab.Screen name= "Menu" component={MenuScreen}/>
      <Tab.Screen name= "Search" component={SearchScreen}/>
      <Tab.Screen name= "Profile" component={ProfileScreen}/>
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
