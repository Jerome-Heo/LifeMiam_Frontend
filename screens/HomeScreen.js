import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen({ navigation }) {

  handleGo = () => {
    navigation.navigate('TabNavigator');
  }

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity style={styles.go} onPress={() => handleGo()}><Text style={styles.textButt}>Go To Search</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  go: {
    backgroundColor: "red",
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButt: {
    color: "white"
  }
});
