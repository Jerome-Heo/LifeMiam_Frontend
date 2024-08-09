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

import Colors from "../utilities/color";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

// qu'est ce qu'on fait !!!!!!!!!

// récupérer les datas en dur puis par fetch 
// mapper le tableau datas <View>name - quantity - unité</View>
// trier l'affichage par catégories
// dynamiser la liste 
//  - par défaut l'ingrédient est dans une liste 'à acheter'
// - swipe a droite : l'ingrédient passe dans liste produits achetés 

let datas={
  "result": true,
  "data": [
    {
      "name": "Pommes",
      "quantity": 24,
      "unit": "unités",
      "category": "Fruits"
    },
    {
      "name": "Bananes",
      "quantity": 12,
      "unit": "unités",
      "category": "Fruits"
    },
    {
      "name": "Fraises",
      "quantity": 800,
      "unit": "grammes",
      "category": "Fruits"
    },
    {
      "name": "Tomates cerises",
      "quantity": 400,
      "unit": "grammes",
      "category": "Légumes"
    },
    {
      "name": "Bananes",
      "quantity": 12,
      "unit": "unités",
      "category": "Fruits"
    },
    {
      "name": "Fraises",
      "quantity": 800,
      "unit": "grammes",
      "category": "Fruits"
    },
    {
      "name": "Lait d'amande",
      "quantity": 2,
      "unit": "litres",
      "category": "Boissons"
    },
    {
      "name": "Pommes de terre",
      "quantity": 8,
      "unit": "unités",
      "category": "Légumes"
    },
    {
      "name": "Courgettes",
      "quantity": 8,
      "unit": "unités",
      "category": "Légumes"
    },
    {
      "name": "Carottes",
      "quantity": 12,
      "unit": "unités",
      "category": "Légumes"
    },
    {
      "name": "Champignons",
      "quantity": 400,
      "unit": "grammes",
      "category": "Légumes"
    },
    {
      "name": "Ail",
      "quantity": 8,
      "unit": "gousses",
      "category": "Condiments"
    },
    {
      "name": "Huile d'olive",
      "quantity": 12,
      "unit": "cuillères à soupe",
      "category": "Condiments"
    },
    {
      "name": "Farine",
      "quantity": 800,
      "unit": "grammes",
      "category": "Produits secs"
    },
    {
      "name": "Sucre",
      "quantity": 408,
      "unit": "grammes",
      "category": "Produits secs"
    },
    {
      "name": "Beurre",
      "quantity": 200,
      "unit": "grammes",
      "category": "Produits laitiers"
    },
    {
      "name": "Pommes",
      "quantity": 24,
      "unit": "unités",
      "category": "Fruits"
    },
    {
      "name": "Sucre",
      "quantity": 408,
      "unit": "grammes",
      "category": "Produits secs"
    }
  ]
}
  
  export default function ListScreen({navigation:{goBack}}) {

      // récupérer les catégories ['fruits','légumes','produits laitiers','produits secs','Condiments','Boissons']
        // filtre le tableau datas.data et extraire les catégories et supprimer les doublons
        // parcourir le tableau des catégories
          // faire le map d'affichage
         const categories = []
         datas.data.filter((e) => !categories.find((cat) => cat === e.category) ? categories.push(e.category) : null ) 
        
         categories.sort()
         console.log(categories)

         let displayAll=[]
          for (let category of categories)
          {
            
            let displayList=datas.data.map((ing,i) => ing.category == category ?
            <View key={i} style={styles.ingElement}> 
              <Text style={styles.ingElementText}>{ing.name} {ing.quantity} {ing.unit }</Text>
              </View> : null 
              ) 
              let boxCategory=
              <View key={category} style={styles.boxCategory}>
              <View key={category} style={styles.categorieTitle}><Text style={styles.categorieTitleText}>{category}</Text></View>
              {displayList}
              </View>
              displayAll=[...displayAll,boxCategory]
          }
         

    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

      <View style={styles.titleCont}>
        <TouchableOpacity onPress={() => goBack()} activeOpacity={0.6} >
        <FontAwesome name={'arrow-left'} style={styles.iconBack} size={30}/>
        </TouchableOpacity>
      
        <Text style={styles.H1}>Liste de courses</Text>

        
        <TouchableOpacity activeOpacity={0.6}>
        <FontAwesome name={'sort-amount-desc'} style={styles.iconSort} size={30}/>
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
      alignItems:'center'

    },
    titleCont: {
      marginTop: 50,
      alignItems: "center",
      justifyContent:"space-between",

      flexDirection:'row',
      paddingHorizontal:10,

      width:'95%',
      marginBottom:20
    },
    H1: {
      fontSize: 30,
      color: "#365E32",
      fontWeight: "700"
    },

    list: {
      height: '90%',
      width: '90%',
     
      alignSelf:'center'
    },
    boxCategory:
    {
      marginBottom:20
    },
    categorieTitle:
    {
    marginBottom:5
    },
    categorieTitleText:
    {
    fontSize:30,
    color:Colors.DARK_GREEN,
    },
    ingElement:
    {
      borderWidth:1,
      width: '100%',
      height:80,
      color:'red',
      
    },
    ingElementText:
    {
    
    },
    iconBack:
    {
      backgroundColor:Colors.DARK_GREEN,
      color:Colors.YELLOW,
      borderWidth:1,
      padding:10,
      borderRadius:100,
      paddingHorizontal:12
    },
    iconSort:
    {
     
      color:Colors.DARK_GREEN,
     
      padding:10,
     
      paddingHorizontal:12
    }
  });
  