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
  
  export default function RecipeScreen({navigation}) {
  
    const ExRecipe = {
        "_id": 15,
        "name": "Gâteau au chocolat",
        "tags": ["dessert", "végétarien"],
        "regime": ["végétarien"],
        "image": "url_image_gateau_au_chocolat",
        "default_serving": 8,
        "sub-doc ing": [
            {
                "ingredient": 1,
                "quantity": 200
            },
            {
                "ingredient": 2,
                "quantity": 150
            },
            {
                "ingredient": 3,
                "quantity": 4
            },
            {
                "ingredient": 5,
                "quantity": 2
            },
            {
                "ingredient": 4,
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
        "difficulty": "moyenne",
        "time": 45,
        "popularity": 5
    }

    returnButton = () => {
        navigation.navigate('Search');
      }

    //La recette ne précise pas l'unité de mesure de chaque ingrédient ni son nom.
    const ingredient = ExRecipe['sub-doc ing'].map((data, i) => {
        return (
           <Text key={i} style={styles.H3} >{`- ${data.quantity}g de ${data.ingredient}`}</Text>
        )
    })

    const steps = ExRecipe.steps.map((data, i) => {
        return (
            <View>
                <Text key={i} style={styles.H3} marginTop={10}>Etape {i}: </Text>
                <Text style={styles.H3}>- {data}</Text>
           </View>
        )
    })
  
    return (
      <View style={styles.container}>
        <View style={styles.ButtonsCont}>
            <TouchableOpacity style={styles.buttons} onPress={returnButton}><Text color={"#E7D37F"}>Return</Text></TouchableOpacity>
            <TouchableOpacity style={styles.buttons}><Text color={"#E7D37F"}>Add</Text></TouchableOpacity>
        </View>
        
        <ScrollView style={styles.ScrollView}>  
            <Image source={require("../assets/gateau_chocolat.jpg")} style={styles.MainImage}></Image>
            
            <Text style={styles.nameRecipe}>{ExRecipe.name}</Text>

            <View style={styles.specCont}>
                <Text style={styles.H2}>Difficulté : {ExRecipe.difficulty}</Text> 
                <Text style={styles.H2}>Préparation : {ExRecipe.time}min</Text> 
            </View>  
            
            <View borderBottomWidth={1} borderBottomColor={"#E7D37F"} width={"70%"} marginHorizontal={50} marginTop={20}/> 

            <Text style={styles.H2}>Ingrédients :</Text>
            <View style={styles.IngrListandSelector}>

                <View style={styles.ingredientList}>{ingredient}</View>

                <View style={styles.selectorCont}>
                    <TouchableOpacity style={styles.selectorButton}><Text style={styles.selectors}>-</Text></TouchableOpacity>
                    <Text style={styles.H2}>{ExRecipe.default_serving}</Text> 
                    <TouchableOpacity style={styles.selectorButton}><Text style={styles.selectors}>+</Text></TouchableOpacity>
                </View>
            </View>

            <View>

            <View borderBottomWidth={1} borderBottomColor={"#E7D37F"} width={"70%"} marginHorizontal={50} marginTop={20}/> 

            <Text style={styles.H2}>Recette :</Text>  
            <View style={styles.stepList}>{steps}</View>

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
    buttons:{
        backgroundColor:"#365E32",
        width: 50,
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
        flexDirection: "row"
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
  