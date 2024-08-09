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
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { useDispatch, useSelector } from 'react-redux';
import { token } from '../reducers/user';
  
  export default function ProfileScreen({navigation}) {

    const dispatch = useDispatch();

    const handleSignout = () => {
      dispatch(token({token: ""}));
      dispatch(removeRegime({regime: [null]})); // A vérifier
      navigation.navigate('Home');
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => handleSignout()}>
          <FontAwesome name={'sign-out'} style={styles.icon} size={50}/>
          <Text>Déconnexion</Text>
        </TouchableOpacity>
        <Text>ProfileScreen</Text>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {

    }
  });
  