import {
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Colors from '../utilities/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// Requested to navigate from a component
import { useNavigation } from '@react-navigation/native';

import { token } from '../reducers/user';

function Signin({navigation}) {
  const URL = 'https://lifemiam-backend.vercel.app';
  const dispatch = useDispatch();
  const [signin, setSignin] = useState(null);
  const [password, SetPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation(); // Requested to navigate from a component

  const handleSignin = () => {
    fetch(`${URL}/users/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ signin: signin, password: password }),
		}).then(response => response.json())
			.then(data => {
        console.log(data);
				if (data.result === true) {
					dispatch(token({ token: data.token }));
					setSignin('');
					SetPassword('');
          navigation.navigate("TabNavigator", { screen: "Search" });
				}
        else {
          // Display an error
        }
			});
  }
  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.logoContainer}>
      <Image style={styles.logoImg} source={require("../assets/logo.png")}/>
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <KeyboardAvoidingView style={styles.inputContainer}>
          <Text style={styles.label}>Adresse email ou Username</Text>
          <TextInput label={'Adresse email ou Username'} textContentType='email' keyboardType='email-address' style={styles.input} onChangeText={(e) => setSignin(e)} value={signin} maxLength={254}></TextInput>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView style={styles.inputContainer}>
      <Text style={styles.label}>Password</Text>
        <TextInput label={'Password'} textContentType='password' secureTextEntry={showPassword ? false : true } style={styles.input} onChangeText={(e) => SetPassword(e)} value={showPassword ? password : password} maxLength={128}></TextInput>
        <View style={styles.showpassword}>
            {!showPassword && <FontAwesome name={'eye'} style={styles.icon} size={20} onPress={() => { setShowPassword(true)}}/>}
            {showPassword && <FontAwesome name={'eye-slash'} style={styles.icon} size={20} onPress={() =>{ setShowPassword(false)}}/>}
          </View>
      </KeyboardAvoidingView>
        <TouchableOpacity style={styles.signinButton} onPress={() => handleSignin()}>
          <Text style={styles.signinButtonText}>Connexion</Text>
        </TouchableOpacity>
    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    paddingTop:'10%',
    width: '100%',
  },
  logoContainer: {
    height:'30%',
    width:'100%',
  },
  logoImg: {
    borderWidth: 1,
      width:'100%',
      height:'100%',      
      objectFit:'contain',
  },
  title: {
    fontSize:36,
    fontWeight:'500',
    color:Colors.DARK_GREEN,
  },
  inputContainer: {
    position: 'relative',
    borderWidth: 1,
    width: "90%",
    marginTop:15,
    marginBottom:15,
  },
  label: {
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    top: -10,
    left: 10,
    zIndex: 1,
    paddingHorizontal: 5,
  },
  input: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    color: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  showpassword: {
    position:'absolute',
    right:0,
    height:50,
    width:'20%',
    alignItems:'flex-end',
    justifyContent:'center',
    paddingHorizontal:10,
  },
  signinButton: {
    marginTop:30,
    alignSelf:'center',
    borderWidth:1,
    paddingHorizontal:40,
    paddingVertical:10,
    borderRadius:20,
    width:'80%',
    backgroundColor:Colors.DARK_GREEN,
  },
  signinButtonText:
  {
    textAlign:'center',
    color:Colors.YELLOW,
    fontSize:16
  },
  password: {
    color: "black",
  }
});

export default Signin;
