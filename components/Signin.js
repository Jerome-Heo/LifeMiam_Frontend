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
  ScrollView,
} from "react-native";
import Colors from "../utilities/color";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { addRegime, token, initRegimes } from "../reducers/user";

function Signin({ navigation }) {
  const URL = "https://lifemiam-backend.vercel.app";
  const dispatch = useDispatch();
  const [signin, setSignin] = useState(null);
  const [password, SetPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignin = () => {
    fetch(`${URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ signin: signin, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result === true) {
          // dispatch(token({ token: data.token }));
          // dispatch(addRegime({regime: data.regime}));
          dispatch(token(data.token));
          data.regime.length > 0 && dispatch(initRegimes(...data.regime));
          setSignin("");
          SetPassword("");
          navigation.navigate("TabNavigator", { screen: "Search" });
        } else {
          // Display an error
          console.log("Erreur avec Signin");
        }
      });
  };
  return (
    <KeyboardAvoidingView style={styles.textContainer}>
      <Text style={styles.title}>Se connecter</Text>
      <KeyboardAvoidingView style={styles.inputContainer}>
        <Text style={styles.label}>Adresse email ou Username</Text>
        <TextInput
          label={"Adresse email ou Username"}
          textContentType="email"
          keyboardType="email-address"
          style={styles.input}
          onChangeText={(e) => setSignin(e)}
          value={signin}
          maxLength={254}
        ></TextInput>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          label={"Password"}
          textContentType="password"
          secureTextEntry={showPassword ? false : true}
          style={styles.input}
          onChangeText={(e) => SetPassword(e)}
          value={showPassword ? password : password}
          maxLength={128}
        ></TextInput>
        <View style={styles.showpassword}>
          {!showPassword && (
            <FontAwesome
              name={"eye"}
              style={styles.icon}
              size={20}
              onPress={() => {
                setShowPassword(true);
              }}
            />
          )}
          {showPassword && (
            <FontAwesome
              name={"eye-slash"}
              style={styles.icon}
              size={20}
              onPress={() => {
                setShowPassword(false);
              }}
            />
          )}
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => handleSignin()}
      >
        <Text style={styles.signinButtonText}>Connexion</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "50%",
  },
  title: {
    fontSize: 36,
    fontWeight: "500",
    color: Colors.DARK_GREEN,
  },
  inputContainer: {
    position: "relative",
    borderWidth: 1,
    width: "80%",
    marginTop: 15,
    marginBottom: 15,
  },
  label: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: Colors.WHITE,
    color: Colors.LIGHT_GREEN,
    zIndex: 10,
    paddingHorizontal: 5,
    fontWeight: "500",
  },
  input: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    borderWidth: 1,
    borderColor: Colors.DARK_GREEN,
    paddingHorizontal: 10,
  },
  showpassword: {
    position: "absolute",
    right: 0,
    height: 50,
    width: "20%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  icon: {
    color: Colors.DARK_GREEN,
  },
  signinButton: {
    marginTop: 30,
    alignSelf: "center",
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    width: "80%",
    backgroundColor: Colors.DARK_GREEN,
  },
  signinButtonText: {
    textAlign: "center",
    color: Colors.YELLOW,
    fontSize: 16,
  },
  password: {
    color: "black",
  },
});

export default Signin;
