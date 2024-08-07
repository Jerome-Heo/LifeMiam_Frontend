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

import Signin from '../components/Signin'
import Signup from '../components/Signup'
import Unboarding from '../components/Unboarding'

import Colors from '../utilities/color'

export default function HomeScreen({ navigation }) {
  handleGo = () => {
    navigation.navigate("TabNavigator", { screen: "Search" });
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
<<<<<<< HEAD
      <TouchableOpacity style={styles.go} onPress={() => handleGo()}>
        <Text style={styles.textButt}>Go To Search</Text>
      </TouchableOpacity>
=======
      <TouchableOpacity style={styles.go} onPress={() => handleGo()}><Text style={styles.textButt}>Go To Search</Text></TouchableOpacity>

      <Signin/>
      <Signup/>
      <Unboarding/>
>>>>>>> d1fe565ce04114f1ed805ee181900e7dd2afcdbd
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
=======
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
>>>>>>> d1fe565ce04114f1ed805ee181900e7dd2afcdbd
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
});
