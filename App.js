import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';

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
    <Tab.Navigator style={styles.navbar} screenOptions = {({ route }) => ({
      tabBarIcon: ({ color, size}) => {
        let iconName= '';

        if(route.name === 'Menu')
        {
          iconName = './assets/menu.png'; //L'icone n'est pas trouvée
          return <Image source={require('./assets/menu.png')} />;
        } 
        else if (route.name === 'Search') 
        {
          iconName = './assets/search.png'; //L'icone n'est pas trouvée
          return <Image source={require('./assets/search.png')} />;
        } else if (route.name === 'Profile')
        {
          iconName = './assets/profile.png'
          return <Image source={require('./assets/profile.png')} />;
        }

       
        
      },
      tabBarActiveTintColor: '#E7D37F',
      tabBarInactiveTintColor: '#81A263',
      headerShown: false,
    })}>
      <Tab.Screen name= "Menu" component={MenuScreen}/>
      <Tab.Screen name= "Search" component={SearchScreen}/>
      <Tab.Screen name= "Profile" component={ProfileScreen}/>
      <Tab.Screen name="Recipe" component={RecipeScreen} options={{tabBarButton: () => null}}/>
      <Tab.Screen name="List" component={ListScreen} options= {{tabBarButton: () => null}}/>
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
  navbar:
  {
  backgroundColor:'red'  
  }
});
