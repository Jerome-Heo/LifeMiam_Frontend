import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
import { useState, useEffect } from 'react';
import Colors from "../utilities/color";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from "react-redux";

export default function ListScreen({ navigation: { goBack } }) {

  // récupérer les catégories ['fruits','légumes','produits laitiers','produits secs','Condiments','Boissons']
  // filtre le tableau datas.data et extraire les catégories et supprimer les doublons
  // parcourir le tableau des catégories
  // faire le map d'affichage
  const URL = "https://lifemiam-backend.vercel.app";
  // const URL = "http://localhost:3000";
  // const token = "wVL5sCx7YTgaO-fnxK5pX4mMG8JywAwQ"
  const [list, setList] = useState([]);
  const {token, menuId} = useSelector((state) => state.user.value.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && menuId) {
    fetchIngredients(token, menuId);
    }
  }, [token, menuId]);
  console.log(token)
  const fetchIngredients = (token, menuId) => {
    fetch(`${URL}/shop/generate/${menuId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (data.result) {
        dispatch(setList(data.data));
      } else {
        console.error("No matching ingredients");
      }
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
    });
  };
        
  const categories = []
  list.filter((e) => !categories.find((cat) => cat === e.category) ? categories.push(e.category) : null)

  categories.sort()
  console.log(categories)

  let displayAll = []
  for (let category of categories) {

    let displayList = list.map((ing, i) => ing.category == category ?
      <View key={i} style={styles.ingElement}>
        <Text style={styles.ingElementText}>{ing.name} {ing.quantity} {ing.unit}</Text>
      </View> : null
    )
    let boxCategory =
      <View key={category} style={styles.boxCategory}>
        <View key={category} style={styles.categorieTitle}><Text style={styles.categorieTitleText}>{category}</Text></View>
        {displayList}
      </View>
    displayAll = [...displayAll, boxCategory]
  }
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

      <View style={styles.titleCont}>
        
        <TouchableOpacity onPress={() => goBack()} activeOpacity={0.6} >
          <FontAwesome name={'arrow-left'} style={styles.iconBack} size={30} />
        </TouchableOpacity>

        <Text style={styles.H1}>Liste de courses</Text>

        
        <TouchableOpacity activeOpacity={0.6}>
          <FontAwesome name={'sort-amount-desc'} style={styles.iconSort} size={30} />
        </TouchableOpacity>

      </View>
      <ScrollView style={styles.list}>

        {displayAll}


      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'

  },
  titleCont: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "space-between",

    flexDirection: 'row',
    paddingHorizontal: 10,

    width: '95%',
    marginBottom: 20
  },
  H1: {
    fontSize: 30,
    color: "#365E32",
    fontWeight: "700"
  },

  list: {
    height: '90%',
    width: '90%',

    alignSelf: 'center'
  },
  boxCategory:
  {
    marginBottom: 20
  },
  categorieTitle:
  {
    marginBottom: 5
  },
  categorieTitleText:
  {
    fontSize: 30,
    color: Colors.DARK_GREEN,
  },
  ingElement:
  {
    borderWidth: 1,
    width: '100%',
    height: 80,
    color: 'red',

  },
  ingElementText:
  {

  },
  iconBack:
  {
    backgroundColor: Colors.DARK_GREEN,
    color: Colors.YELLOW,
    borderWidth: 1,
    padding: 10,
    borderRadius: 100,
    paddingHorizontal: 12
  },
  iconSort:
  {

    color: Colors.DARK_GREEN,

    padding: 10,

    paddingHorizontal: 12
  }
});
