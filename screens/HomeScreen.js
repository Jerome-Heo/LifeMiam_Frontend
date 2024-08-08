import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Onboarding from "../components/Onboarding";
import { useState } from "react";
import Colors from "../utilities/color";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {

  const [displayComponent,setDisplayComponent] = useState(null);

  const handleGoBack = () => {
    setDisplayComponent(null);
  }

  handleGo = () => {
    navigation.navigate("TabNavigator", { screen: "Search" });
  };

  const isOnBoarding =(value)=>{
    if (value)
    {
      setDisplayComponent('onboarding')
    }
  }


  const displayNull = 
  <View>
       <View style={styles.logoContainer}>
        <Image style={styles.logoImg} source={require("../assets/logo.png")}/>
        </View>
      <Text>LIFE MIAM</Text>
    <TouchableOpacity style={styles.test} onPress={()=> {setDisplayComponent('signup')}}> 
        <Text>S'inscrire</Text> 
    </TouchableOpacity>

    <TouchableOpacity style={styles.test} onPress={()=> {setDisplayComponent('signin')}}> 
        <Text>J'ai un compte</Text> 
    </TouchableOpacity>
  </View>

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => handleGoBack()}>
        <FontAwesome name={'arrow-left'} style={styles.icon} size={50}/>
    </TouchableOpacity>
      {/* <TouchableOpacity style={styles.go} onPress={() => handleGo()}><Text style={styles.textButt}>Go To Search</Text></TouchableOpacity> */}
      {!displayComponent && displayNull}
      { displayComponent == 'signin' && <Signin navigation={navigation}/> }
      { displayComponent == 'signup' && <Signup onboarding={isOnBoarding}/>}
      { displayComponent == 'onboarding' && <Onboarding navigation={navigation}/> }
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  go: {
    backgroundColor: Colors.LIGHT_GREEN,
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  textButt: {
    color: "white",
  },
  textButt: {
    color: "white",
  },
  test:{
    height: 100,
    backgroundColor: "pink",
    alignItems:"center",
    justifyContent: "center",
    margin: 20,
  },
  logoContainer:
  {
    height:'30%',
    width:'100%',
  },
  logoImg:
  {
    width:'100%',
    height:'100%',      
    objectFit:'contain'
  },
});
