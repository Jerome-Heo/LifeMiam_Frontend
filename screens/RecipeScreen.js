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
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Resume from "../components/Resume";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../utilities/color";

export default function RecipeScreen({ navigation, navigation: { goBack } }) {
  const URL = "https://lifemiam-backend.vercel.app";
  const userToken = useSelector((state) => state.user.value.token);
  // const token = '0T_J7O73PtSOoUiD5Ntm_PNoFKKH5iOf';
  const activeMenu = useSelector((state) => state.user.value.menu);
  const route = useRoute();
  const { RecetteID } = route.params;
  const [Recipe, SetRecipe] = useState({});

  // gerer le mode ReadOnly des recipes depuis le Menus
  const urlParams = route.params;
  const [readingMode, setReadingMode] = useState(null);

  console.log(readingMode);

  useEffect(() => {
    setReadingMode(urlParams.readingMode);

    fetch(`${URL}/recipes/${RecetteID}/${userToken}`)
      .then((response) => response.json())
      .then((data) => {
        SetRecipe(data.data);
        setServing(data.data.default_serving);
      });
  }, [RecetteID]);

  const [serving, setServing] = useState(Recipe.default_serving);

  //Mapper les tags pour en faire des vignettes
  const tags =
    Recipe.tags &&
    Recipe.tags.map((data, i) => {
      return (
        <View key={i} style={styles.TagVignette}>
          <Text style={styles.TxtVignette}>{data}</Text>
          <View style={styles.ImgVignette}></View>
        </View>
      );
    });

  //press les deux boutons + et -
  const handleMinus = () => {
    setServing((prevServing) => Math.max(1, prevServing - 1));
  };

  const handlePlus = () => {
    setServing((prevServing) => prevServing + 1);
  };

  //Ajouter une recette
  const addRecipeMenu = () => {
    fetch(`${URL}/menus/${activeMenu}/addRecipe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: RecetteID, serving: serving }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleBackBttn = () => {
    setReadingMode(null);
    goBack();
  };

  //Ajuster la quantité d'ingrédient en fonction du nombre de serving
  const adjustedIngredients =
    Recipe.ing &&
    Recipe.ing.map((data) => {
      return {
        ...data,
        quantity: (data.quantity / Recipe.default_serving) * serving,
      };
    });

  //Les ustensils
  const utensils =
    Recipe.ustensiles &&
    Recipe.ustensiles.map((data, i) => {
      return (
        <Text key={i} style={styles.H3}>
          - {data}
        </Text>
      );
    });

  //Les ingrédients et quantitées
  const ingredient =
    Recipe.ing &&
    adjustedIngredients.map((data, i) => {
      return (
        <Text
          key={i}
          style={styles.H3}
        >{`- ${data.quantity}g de ${data.ingredient}`}</Text>
      );
    });

  //Les différentes étapes de la recette
  const steps =
    Recipe.steps &&
    Recipe.steps.map((data, i) => {
      return (
        <View key={i}>
          <Text style={styles.H3} marginTop={10}>
            Etape {i}:{" "}
          </Text>
          <Text style={styles.H3}>- {data}</Text>
        </View>
      );
    });

  return (
    <View style={styles.container}>
      <View style={styles.ButtonsCont}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => handleBackBttn()}
        >
          <FontAwesome name={"arrow-left"} size={25} color={"#E7D37F"} />
        </TouchableOpacity>
        {!readingMode ? (
          <TouchableOpacity
            style={styles.disabledButtons}
            onPress={() => addRecipeMenu()}
          >
            <FontAwesome
              name={"plus"}
              size={25}
              color={"#E7D37F"}
              opacity={"0.7"}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => addRecipeMenu()}
          >
            <FontAwesome name={"plus"} size={25} color={"#E7D37F"} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.ScrollView}>
        <Image source={{ uri: Recipe.image }} style={styles.MainImage}></Image>

        <Text style={styles.H1}>{Recipe.name}</Text>
        <View style={styles.vignetteCont}>{tags}</View>
        <View style={styles.specCont}>
          <Text style={styles.H2}>Difficulté : {Recipe.difficulty}/5</Text>
          <Text style={styles.H2}>Préparation : {Recipe.time}min</Text>
        </View>

        <View
          borderBottomWidth={1}
          borderBottomColor={"#E7D37F"}
          width={"70%"}
          marginHorizontal={50}
          marginTop={20}
        />

        <Text style={styles.H2}>Ingrédients :</Text>
        <View style={styles.IngrListandSelector}>
          <View style={styles.ingredientList}>{ingredient}</View>

          <View style={styles.selectorCont}>
            <TouchableOpacity
              onPress={handleMinus}
              style={styles.selectorButton}
            >
              <Text style={styles.selectors}>-</Text>
            </TouchableOpacity>
            <Text style={styles.H2}>{serving}</Text>
            <TouchableOpacity
              onPress={handlePlus}
              style={styles.selectorButton}
            >
              <Text style={styles.selectors}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View
            borderBottomWidth={1}
            borderBottomColor={"#E7D37F"}
            width={"70%"}
            marginHorizontal={50}
            marginTop={20}
          />

          <Text style={styles.H2}>Ustensiles :</Text>
          <View>{utensils}</View>
          <View
            borderBottomWidth={1}
            borderBottomColor={"#E7D37F"}
            width={"70%"}
            marginHorizontal={50}
            marginTop={20}
          />

          <Text style={styles.H2}>Préparation :</Text>
          <Text style={styles.H3}>
            -Temps de préparation: {Recipe.temps_preparation} min
          </Text>
          <Text style={styles.H3}>
            -Temps de cuisson: {Recipe.temps_cuisson} min
          </Text>

          <View
            borderBottomWidth={1}
            borderBottomColor={"#E7D37F"}
            width={"70%"}
            marginHorizontal={50}
            marginTop={20}
          />

          <View>{steps}</View>
        </View>

        <View marginTop={50} />
      </ScrollView>
      <Resume />
    </View>
  );
}

const styles = StyleSheet.create({
  ButtonsCont: {
    flexDirection: "row",
    position: "absolute",
    top: 65,
    zIndex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
  },
  buttons: {
    backgroundColor: "#365E32",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButtons: {
    backgroundColor: Colors.DARK_GREEN,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  vignetteCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  TagVignette: {
    marginTop: 3,
    marginHorizontal: 5,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#81A263",
    borderRadius: 50,
    width: 125,
    height: 40,
  },
  TxtVignette: {
    color: "white",
    fontWeight: "600",
  },
  ImgVignette: {
    backgroundColor: "white",
    borderRadius: 100,
    width: 25,
    height: 25,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  MainImage: {
    marginTop: 50,
    width: 400,
    height: 300,
  },
  H1: {
    fontSize: 30,
    color: "#365E32",
    marginLeft: 10,
    fontWeight: "700",
    margin: 5,
  },
  specCont: {
    flexDirection: "row",
    justifyContent: "center",
  },
  H2: {
    margin: 10,
    fontSize: 20,
    color: "#365E32",
    fontWeight: "700",
  },
  H3: {
    marginLeft: 15,
    margin: 5,
    fontSize: 15,
    color: "#365E32",
    fontWeight: "700",
  },
  IngrListandSelector: {
    flexDirection: "row",
  },
  ingredientList: {
    width: "50%",
  },
  selectorCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  selectorButton: {
    backgroundColor: "#365E32",
    borderRadius: 100,
    width: 30,
    height: 30,
  },
  selectors: {
    fontSize: 20,
    color: "#E7D37F",
    textAlign: "center",
  },
});
