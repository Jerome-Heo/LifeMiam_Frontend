import { View,Image,StyleSheet ,Text,TextInput,SafeAreaView,KeyboardAvoidingView, TouchableOpacity, Animated} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setMenu, clearMenu } from "../reducers/user";
import { useNavigation } from "@react-navigation/native";

function Resume(){

    const URL = 'https://lifemiam-backend.vercel.app';
    const userToken = useSelector((state) => state.user.value.token); 
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [isMenuListVisible, setIsMenuListVisible] = useState(false);
    const [menusResume,setMenusResume] = useState([]);
    const [visibleMenu, setVisibleMenu] = useState([]);
    const [currentMenuTxt, setCurrentMenuTxt] = useState([]);
    const [newMenuName, setNewMenuName] = useState("");
    const currentMenu = useSelector((state) => state.user.value.menu);
    
    const animatedHeight = useRef(new Animated.Value(60)).current;

    //charger tous les menus d'un user
    useEffect(() => {
        handleMenuList()
        fetch(`${URL}/menus/getMenus`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: userToken})
          })
          .then((response) => response.json())
          .then((data) => {
            if(Array.isArray(data))
              setMenusResume(data);
          })
    }, [currentMenu])

    // Ouvre le résumé du menu
    const handleMenuList = () => {
        Animated.timing(animatedHeight,{
            toValue: isMenuListVisible ? 60 : 70 + (currentMenu ? visibleMenu.length*60 : menusResume.length*60),
            duration: 300,
            useNativeDriver: false,
        }).start();
        setIsMenuListVisible(!isMenuListVisible)
    }

    //vide le reducer menu
    const backAddMenu = () => {
        currentMenu ? dispatch(clearMenu()) : handleCreateMenu()
    }

    const goToRecipe = (id) => {
        console.log(id)
        navigation.navigate("Recipe", { RecetteID: id });
    }

    //cliquer sur un menu pour le séléctionner
    const handleClickMenu = (menuId) => {
        fetch(`${URL}/menus/${menuId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: userToken})
          })
          .then((response) => response.json())
          .then((data) => {
              dispatch(setMenu(menuId));
              setVisibleMenu(data.menu.menu_recipes)
              setCurrentMenuTxt(data.menu.name)
              handleMenuList()
        });
    }
    
    const handleCreateMenu = () => {
        fetch(`${URL}/menus/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: userToken, name: newMenuName}),
        }).then(response => response.json())
          .then(data => {
            setNewMenuName('');
          });
      }

    //Map les recettes d'un même menu pour les afficher en colonne
    //onPress={navigation.navigate("Recipe", { RecetteID: data.recipe })} => j'ai importé la navigation mais rien n'y fait
    const RecipesDisplay = !visibleMenu ? <Text style={styles.menuTxt}>Vous n'avez pas de recette dans ce menu...</Text> :  visibleMenu.map((data,i) => {
        return(
            <View key={i} style={styles.recipeCont}>
                <Text style={styles.menuTxt}>{`${data.recipe.name}`}</Text>
                <TouchableOpacity  onPress={() => goToRecipe(data.recipe._id)}>
                    <FontAwesome 
                        name={"info-circle"} 
                        style={styles.menuListInfo} 
                        size={25} color={"#E7D37F"} 
                    />
                </TouchableOpacity>
          </View>
        )
    })

    // Map le menuResume pour afficher tous les menus dans le résumé
    const menusDisplay = menusResume && menusResume.map((data, i) => {
        return (
          <TouchableOpacity key={i} style={styles.menuCont} onPress={() => handleClickMenu(data._id)}>
                <Text style={styles.menuTxt}>{`${data.name}`}</Text>
          </TouchableOpacity>
        )
    })

    //Modifie l'affichage de la modale
    const Container = (
        <Animated.View style={[
            styles.container,
            {
                height: animatedHeight,
            }
        ]}>
        <View style={styles.align}>
            <TouchableOpacity style={styles.button} onPress={handleMenuList}>
                <FontAwesome 
                    name={isMenuListVisible ? "caret-down" : "caret-up"} 
                    style={styles.caret} 
                    size={25} 
                    color={"#E7D37F"}
                />
            </TouchableOpacity>
                {!currentMenu ? 
                <TextInput style={styles.resumeText} placeholder='Choisir ou créer' value={newMenuName} onChangeText={(e) => setNewMenuName(e)}></TextInput> 
                :<Text style={styles.resumeText}>{currentMenuTxt}</Text>}
            <TouchableOpacity style={styles.button} onPress={() => backAddMenu()}>
                <FontAwesome 
                    name={currentMenu ? "arrow-left" : "plus"}
                    size={25} 
                    color={"#E7D37F"}
                />
            </TouchableOpacity>
        </View>
        {!currentMenu ? <View style={styles.menusDisplay}>{menusDisplay}</View> : <View style={styles.recipesDisplay}>{RecipesDisplay}</View>}
            </Animated.View>
    )


    return (
        <View style={styles.mainCont}>{Container}</View>
    )
}

const styles = StyleSheet.create({
    mainCont:{
        width: "100%",
    },
    container: {
        alignItems: "flex-start",
        backgroundColor: "#81A263",
        width: "100%",
        marginBottom: 2,
        overflow: "hidden"
    },
    align:{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between"
    },
    button:{
      backgroundColor: '#365E32',
      borderRadius: 10,
      width: 45,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      margin: "2%"
    },
    resumeText:{
        color: "white",
        fontSize: 25,
        fontWeight:'700',
    },
    menusDisplay:{
        width: "100%",
        height: "auto",
        marginTop: 15,
        alignItems: "center",
    },
    menuCont:{
        flexDirection:"row",
        marginTop: 5,
        borderRadius: 5,
        backgroundColor:'#365E32',
        height: 50,
        alignItems: "center",
        justifyContent: 'center',
        width: "80%"
    },
    recipesDisplay:{
        width: "100%",
        height: "auto",
        marginTop: 15,
        alignItems: "flex-start",
    },
    recipeCont:{
        flexDirection:"row",
        marginTop: 5,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor:'#365E32',
        height: 50,
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 10,
        width: "80%"
    },    
    menuTxt:{
        color:'#E7D37F',
        fontSize: 18,
        fontWeight:'700',
    },
    menuListInfo: {
        marginRight: 20,
    }
})

export default Resume;