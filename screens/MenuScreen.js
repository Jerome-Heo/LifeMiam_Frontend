import {
    View,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import { useEffect, useState } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';

  export default function MenuScreen({ navigation }) {

    const URL = 'https://lifemiam-backend.vercel.app';
    const token = '0T_J7O73PtSOoUiD5Ntm_PNoFKKH5iOf';

    const [menus, setMenus] = useState([])
    const [isCreatingMenu, setIsCreatingMenu] = useState(false)
    const [createBarTxt, setCreateBarTxt] = useState('')
    const [isMenuAdded, setIsMenuAdded] = useState(false)

    useEffect(() => {
      fetch(`${URL}/menus/getMenus`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: token})
      })
      .then((response) => response.json())
      .then((data) => {
        if(Array.isArray(data))
          setMenus(data);
      })
  }, [isMenuAdded])
   
    const handleCreateMenu = () => {
      fetch(`${URL}/menus/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token, name: createBarTxt }),
      }).then(response => response.json())
        .then(data => {
          setIsCreatingMenu(false);
          setIsMenuAdded(!isMenuAdded);
          setCreateBarTxt('');
        });
    }

    const handleShoppingList = (id) => {
      navigation.navigate("List", { menuId: id });
    }

    //Est-ce que j'ai cliqué sur la creation de menu ?
    //Affichage des boutons dédiés à la création
    const createMenuButton = isCreatingMenu ? 
      <View style={[styles.validCont, styles.createMenuAlign]}>
        <TextInput style={styles.validBar} onChangeText={(e) => setCreateBarTxt(e)} value={createBarTxt} placeholder='Votre nouveau menu...'/>
        <TouchableOpacity style={styles.validMenu} onPress={() => handleCreateMenu(createBarTxt)}>
          <Image source={require("../assets/ValidMenu.png")}></Image>
        </TouchableOpacity>
      </View>
     :
     <View style={[styles.contentCont, styles.createMenuAlign]}>
      <TouchableOpacity style={styles.createMenu} onPress={() => setIsCreatingMenu(true)}> 
            <Text style={styles.createMenuTxt}>Créer un menu</Text>
      </TouchableOpacity>
    </View>

  // Est-ce que j'ai fetch ?
  //J'affiche les différents menus en une colonne 
    const menusDisplay = menus && menus.map((data, i) => {
      return (
        <View key={i} style={styles.menuCont} >
          <Text style={styles.H3}>{`${data.name}`}</Text>
          <View style={styles.PHCont}>
            <View style={styles.PHProgressBar}></View>
            <TouchableOpacity style={styles.PHShoppingList} onPress={() => handleShoppingList(data._id)}>
              <Image source={require("../assets/cooking.png")} style={styles.imageCooking}></Image>
            </TouchableOpacity>
            <View style={styles.PHButton}>
            <FontAwesome name={'list-ul'} style={styles.icon} size={40}/>
            </View>
          </View>
        </View>
      )
  })

  //Est-ce que j'ai fetch ?
  //Je modifier l'affichage global de la page
    const display = menus.length > 0 ? 
    <View>
      <ScrollView style={styles.fetchMenusCont}>
        {menusDisplay}
      </ScrollView>
        <View style={styles.createMenuAlign}>
        {createMenuButton}
        </View>
    </View>
    : 
    <View>
      <View style={styles.contentCont}> 
        <Image style={styles.logoImg} source={require("../assets/logo.png")}/>
        <Text style={styles.H3}>Vous n'avez pas de menus...</Text> 
        <Text style={styles.H3}>Commencer une liste ?</Text> 
      </View>
      <View style={styles.createMenuAlign}>
        {createMenuButton}
        </View>
    </View>

    return (
      <View style={styles.container}>
        <Text style={[styles.H1, styles.title]}>Menus</Text>
          <View style={styles.contentCont}>
            <TextInput style={styles.searchBar} placeholder='Rechercher un menu...'/>
            {display}
          </View>
        
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    contentCont:{
      alignItems: 'center'
    },
    title:{
      marginTop: 50,
    },
    searchBar:{
      height: 60,
      fontSize: 17,
      borderColor: '#81A263',
      borderWidth: 2,
      paddingLeft: 8,
      marginBottom: 10,
      width: "96%",
      borderRadius: 10,
    },H1:{
      fontSize: 30,
      color:"#365E32",
      marginLeft: 10,
      fontWeight: "700",
      margin: 5,
  },
    H2:{
        margin: 10,
        fontSize: 20,
        color:"#365E32",
        fontWeight: "700",
    }, 
    H3:{
      marginLeft: 15,
      margin: 5,
      fontSize: 15,
      color:"#365E32",
      fontWeight: "700",
  },
    logoImg:{
      width:300,
      height:300,
    },
    createMenu:{
      height: 70,
      width: "100%",
      backgroundColor: "#365E32",
      alignItems:"center",
      justifyContent: "center",
      margin: 20,
      borderRadius: 50,
    },
    createMenuAlign:{
      width: "98%",
      borderWidth: 1,
      position: 'absolute',
      bottom: 120,
    },
    createMenuTxt:{
      fontSize: 20,
      fontWeight: "700",
      color: '#E7D37F',
    },
    validCont:{
      padding: 25,
      flexDirection: "row",
    },
    validBar: {
      marginRight: 10,
      height: 60,
      fontSize: 17,
      borderColor: '#81A263',
      borderWidth: 2,
      paddingLeft: 8,
      width: "80%",
      borderRadius: 10,
    },
    fetchMenusCont: {
      width: "100%",
      borderWidth: 1,
    },
    menuCont: {
      margin: 10,
      width: "100%",
      height: "20%",
    },
    PHCont:{
      flexDirection: "row",
    },
    PHProgressBar: {
      borderWidth: 1,
      height: 40,
      marginLeft: 15,
      margin: 5,
      borderRadius: 5,
      width: "65%",
    },
    PHShoppingList: {

    },
    PHButton: {
      borderWidth: 1,
      height: 40,
      marginLeft: 15,
      margin: 5,
      borderRadius: 5,
      width: "20%",
    },
    imageCooking: {
      backgroundColor: "#365E32",
    },
    icon: {
      
    }
  });
  