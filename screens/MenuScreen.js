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
  
  export default function MenuScreen() {
  
  
    return (
      <View style={styles.container}>
        <Text>MenuScreen</Text>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'brown',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  