import {
    View,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView
  } from 'react-native';
  import { useState } from 'react';

  export default function RecipeScreen({navigation: { goBack } }) {
    
    

    let ExRecipe = {
        "_id": 15,
        "name": "Gâteau au chocolat",
        "tags": [
            "dessert",
            "végétarien",
        ],
        "regime": [
            "végétarien"
        ],
        "image": "url_image_gateau_au_chocolat",
        "default_serving": 8,
        "sub-doc ing": [
            {
                "ingredient": "Farine",
                "quantity": 200
            },
            {
                "ingredient": "Sucre",
                "quantity": 150
            },
            {
                "ingredient": "Beurre",
                "quantity": 4
            },
            {
                "ingredient": "Lait",
                "quantity": 2
            },
            {
                "ingredient": "Œufs",
                "quantity": 1
            }
        ],
        "steps": [
            "Préchauffer le four à 180°C.",
            "Faire fondre le chocolat au bain-marie.",
            "Mélanger le chocolat fondu avec le beurre et le sucre.",
            "Ajouter les œufs un par un en mélangeant bien.",
            "Incorporer la farine et mélanger jusqu'à obtenir une pâte homogène.",
            "Verser la pâte dans un moule à gâteau.",
            "Cuire au four pendant 25 minutes.",
            "Laisser refroidir avant de servir."
        ],
        "difficulty": 3,
        "time": 45,
        "popularity": 5,
        "ustensiles": [
            "moule à gâteau",
            "four",
            "bol",
            "fouet",
            "bain-marie"
        ],
        "temps_preparation": 22,
        "temps_cuisson": 23
    }

    const [serving, setServing] = useState(ExRecipe.default_serving);

    //Mapper les tags pour en faire des vignettes
    const tags = ExRecipe.tags.map((data)=> {
        return (
            <View style={styles.TagVignette}> 
                <Text style={styles.TxtVignette}>{data}</Text> 
                <View style={styles.ImgVignette}></View> 
            </View>
        )
    })

    //press les deux boutons + et - 
    const handleMinus = () => {
        setServing(prevServing => Math.max(1, prevServing - 1))
    }

    const handlePlus = () => {
        setServing(prevServing => prevServing + 1)
    }

    //Ajuster la quantité d'ingrédient en fonction du nombre de serving
    const adjustedIngredients = ExRecipe['sub-doc ing'].map((data) =>{
        return {
            ...data,
            quantity: (data.quantity/ExRecipe.default_serving) * serving
        };
    });

    //Les ustensils
    const utensils = ExRecipe.ustensiles.map((data, i )=> {
        return(
            <Text key={i} style={styles.H3}>- {data}</Text>
        )
    })

    //Les ingrédients et quantitées
    const ingredient = adjustedIngredients.map((data, i) => {
        return (
           <Text key={i} style={styles.H3} >{`- ${data.quantity}g de ${data.ingredient}`}</Text>
        )
    })

    //Les différentes étapes de la recette
    const steps = ExRecipe.steps.map((data, i) => {
        return (
            <View key={i}>
                <Text style={styles.H3} marginTop={10}>Etape {i}: </Text>
                <Text style={styles.H3}>- {data}</Text>
           </View>
        )
    })
  
    return (
      <View style={styles.container}>
        <View style={styles.ButtonsCont}>
            <TouchableOpacity style={styles.buttons} onPress={() => goBack()}><Image source={require("../assets/AddButton.png")}></Image></TouchableOpacity>
            <TouchableOpacity style={styles.buttons}><Image source={require("../assets/GoBackButton.png")}></Image></TouchableOpacity>
        </View>
        
        <ScrollView style={styles.ScrollView}>  
            <Image source={require("../assets/gateau_chocolat.jpg")} style={styles.MainImage}></Image>
            
            <Text style={styles.nameRecipe}>{ExRecipe.name}</Text>
            <View style={styles.vignetteCont}>{tags}</View>
            <View style={styles.specCont}>
                <Text style={styles.H2}>Difficulté : {ExRecipe.difficulty}/5</Text> 
                <Text style={styles.H2}>Préparation : {ExRecipe.time}min</Text> 
            </View>  
            
            <View borderBottomWidth={1} borderBottomColor={"#E7D37F"} width={"70%"} marginHorizontal={50} marginTop={20}/> 

            <Text style={styles.H2}>Ingrédients :</Text>
            <View style={styles.IngrListandSelector}>

                <View style={styles.ingredientList}>{ingredient}</View>

                <View style={styles.selectorCont}>
                    <TouchableOpacity onPress={handleMinus} style={styles.selectorButton}><Text style={styles.selectors}>-</Text></TouchableOpacity>
                    <Text style={styles.H2}>{serving}</Text> 
                    <TouchableOpacity onPress={handlePlus} style={styles.selectorButton}><Text style={styles.selectors}>+</Text></TouchableOpacity>
                </View>
            </View>

            <View>

            <View borderBottomWidth={1} borderBottomColor={"#E7D37F"} width={"70%"} marginHorizontal={50} marginTop={20}/> 
            
            <Text style={styles.H2}>Ustensiles :</Text>  
            <View>{utensils}</View>
            <View borderBottomWidth={1} borderBottomColor={"#E7D37F"} width={"70%"} marginHorizontal={50} marginTop={20}/> 

            <Text style={styles.H2}>Préparation :</Text>  
            <Text style={styles.H3}>-Temps de préparation: min</Text>
            <Text style={styles.H3}>-Temps de cuisson: min</Text>

            <View borderBottomWidth={1} borderBottomColor={"#E7D37F"} width={"70%"} marginHorizontal={50} marginTop={20}/> 

            <View>{steps}</View>

            </View>

            <View marginTop={50}/> 
        </ScrollView>  

      </View>
    )
  }
  
  const styles = StyleSheet.create({
    ButtonsCont:{
        flexDirection: "row",
        position: "absolute",
        top: 65,
        zIndex: 1,
        justifyContent:'space-between',
        paddingHorizontal: 20,
        width: "100%",
    }, 
    vignetteCont:{
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap:"wrap"
    },
    TagVignette:{
        marginTop: 3,
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor:"#81A263",
        borderRadius: 50,
        width: 125,
        height: 40
    },
    TxtVignette:{
        color:"white",
        fontWeight: "600"
    },
    ImgVignette:{
        backgroundColor:"white",
        borderRadius: 100,
        width: 25,
        height: 25,
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    MainImage: {
        marginTop: 50,
        width: 400,
        height: 300,
    },
    nameRecipe:{
        fontSize: 30,
        color:"#365E32",
        marginLeft: 20,
    },
    tagCont:{
        
    },
    specCont:{
        flexDirection: "row",
        justifyContent: "center",
    },
    H2:{
        margin: 10,
        fontSize: 20,
        color:"#365E32",
    },
    H3:{
        marginLeft: 15,
        margin: 5,
        fontSize: 15,
        color:"#365E32",
    },
    IngrListandSelector:{
        flexDirection: "row"
    },
    ingredientList:{
        width: "50%"
    },
    selectorCont:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent: "center",
        width:"50%"
    },
    selectorButton:{
        backgroundColor:"#365E32",
        borderRadius: 100,
        width: 30,
        height: 30,
    },
    selectors:{
        fontSize: 20,
        color:"#E7D37F",
        textAlign: "center",
    }
  });
  