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

import Colors from '../utilities/color'

export default function HomeScreen({ navigation }) {

  handleGo = () => {
    navigation.navigate('TabNavigator', {screen: 'Search'});
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
    backgroundColor: Colors.ORANGE,
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
