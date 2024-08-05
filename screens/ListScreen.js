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
  
  export default function ListScreen() {
  
  
    return (
      <View style={styles.container}>
        <Text>ListScreen</Text>
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
  