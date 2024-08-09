import { View,Image,StyleSheet ,Text,TextInput,SafeAreaView,KeyboardAvoidingView, TouchableOpacity} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';

function Resume(){

    const URL = 'https://lifemiam-backend.vercel.app';
    const token = '0T_J7O73PtSOoUiD5Ntm_PNoFKKH5iOf';

    const [isMenuListVisible, setIsMenuListVisible] = useState(false);
    const [menusResume,setMenusResume] = useState([]);

    // Ouvre le résumé du menu (sans animation) et fetch (changer pour un useEffect)
    const handleMenuList = () => {
        if(!isMenuListVisible) {
            setIsMenuListVisible(true);
            fetch(`${URL}/menus/getMenus`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token: token})
              })
              .then((response) => response.json())
              .then((data) => {
                if(Array.isArray(data))
                  setMenusResume(data);
              })
        }
        else {
            setIsMenuListVisible(false);
        }
    }
    
    // Map le menuResume pour afficher tous les menus dans le résumé
    const menusDisplay = menusResume && menusResume.map((data, i) => {
        return (
          <View key={i} style={styles.menuCont}>
            <Text style={styles.menuTxt}>{`${data.name}`}</Text>
          </View>
        )
    })

    //Modifie l'affichage de la modale (sans animation)
    const Container = !isMenuListVisible ? 
    <View style={styles.containerOff}>
        <View style={styles.align}>
            <TouchableOpacity style={styles.button} onPress={() => handleMenuList()}>
                <FontAwesome name={"caret-up"} style={styles.caret} size={25} color={"#E7D37F"}/>
            </TouchableOpacity>
            <Text style={styles.resumeText}>Résumé du menu</Text>
        </View>
    </View>
:
    <View style={styles.containerOn}>
        <View style={styles.align}>
                <TouchableOpacity style={styles.button} onPress={() => handleMenuList()}>
                    <FontAwesome name={"caret-down"} style={styles.caret} size={25} color={"#E7D37F"}/>
                </TouchableOpacity>
            <Text style={styles.resumeText}>Résumé du menu</Text>
        </View>
        <View style={styles.menusDisplay}>{menusDisplay}</View>
    </View>



    return (
        <View style={styles.mainCont}>{Container}</View>
    )
}

const styles = StyleSheet.create({
    mainCont:{
        width: "100%",

    },
    containerOff:{
        alignItems: "flex-start",
        backgroundColor: "#81A263",
        width: "100%",
        height: 60,
        borderWidth: 1,
        marginBottom: 1,
    },
    containerOn:{
        alignItems: "flex-start",
        backgroundColor: "#81A263",
        width: "100%",
        height: "80%",
        marginBottom: 1,
        marginTop: "38%"
    },
    align:{
        flexDirection: "row",
        alignItems: "center",
    },
    button:{
      backgroundColor: '#365E32',
      borderRadius: 10,
      width: 45,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      marginTop: "2%",
      marginLeft: "2%",
    },
    resumeText:{
        color: "white",
        marginLeft: "16%",
        fontSize: 25,
        fontWeight:'700'
    },
    menusDisplay:{
        width: "90%",
        height: "auto",
        marginTop: 10,
    },
    menuCont:{
        marginTop: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor:'#365E32',
        height: 50,
        justifyContent: "center",
        paddingLeft: 30,
    },
    menuTxt:{
        color:'#E7D37F',
        fontSize: 18,
        fontWeight:'700'
    }
})

export default Resume;