import React, { useState, useEffect } from "react";
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
  Pressable,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Colors from "../utilities/color";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";

export default function SearchScreen({ navigation }) {
  const [animation, setAnimation] = useState({
    visible: false,
    type: "",
  });
  const animate = (type) => {
    setAnimation({ visible: false, type });
    setTimeout(() => {
      setAnimation({ visible: true, type });
    }, 100);
  };
  const prop = animation.visible ? { animation: animation.type } : {};

  const regimeList = [
    { name: "sans gluten", src: require("../assets/gluten_free.png") },
    { name: "végétalien", src: require("../assets/vegan.png") },
    { name: "végétarien", src: require("../assets/vegetarian.png") },
    { name: "halal", src: require("../assets/halal.png") },
    { name: "sans lactose", src: require("../assets/lactose_free.png") },
  ];
  const userToken = useSelector((state) => state.user.value.token);
  // const TEST token = "0T_J7O73PtSOoUiD5Ntm_PNoFKKH5iOf";
  const userRegime = useSelector((state) => state.user.value.regime);
  const [vignettesSelected, setVignettesSelected] = useState(userRegime);

  
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const URL = "https://lifemiam-backend.vercel.app";
  
  const [recipesData, setRecipesData] = useState([]); // Fetch all 
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllRecipes = () => {
    const fetchURL = `${URL}/recipes/all`;
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // ICI on va remplir le tableau des recettes
          let newTabRecipes = [];
          for (let i = 0; i < data.data.length; i++) {
            const object = {
              _id: data.data[i]._id,
              name: data.data[i].name,
              tags: data.data[i].tags,
              regime: data.data[i].regime,
              image: data.data[i].image,
              popularity: data.data[i].popularity,
            };
            newTabRecipes.push(object);
          }
          setRecipesData(newTabRecipes);
          // On ajoute toutes les recettes dans notre useState
          const popularRecipes = newTabRecipes.sort((a, b) => b.popularity - a.popularity).slice(0, 10).map((element, i) => {
            return (
              <Animatable.View key={i} style={styles.view}>
                <TouchableOpacity onPress={() => handleRecipeClick(element._id)}>
                  <View style={styles.recipes}>
                    <Image source={{ uri: element.image }} style={styles.recipeImage} />
                    <Text style={styles.H3}>{element.name}</Text>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            );
          });
          setPopularRecipes(popularRecipes);
          // console.log(recipesData);
        } else {

          // console.error("Aucune recette correspondante");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Erreur lors de la récupération des résultats : ", error);
      });

    if (isLoading) {
      console.log("loading...");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const newTimeout = setTimeout(() => {
      if (query.length >= 3) {
        const filteredRecipes = recipesData.filter((recipe) =>
          recipe.name.toLowerCase().includes(query.toLowerCase())
        );
        setRecipes(filteredRecipes);
      } else if (query.length === 0) {
        setRecipes(recipesData); // Réafficher les recettes populaires si la recherche est vide
      }
    }, 500);

    setDebounceTimeout(newTimeout);
  };


  const displayNull = () => {
    return (
      <View style={styles.emptyState}>
        <FontAwesome name={"search"} size={60} onPress={() => { }} />
        <Text style={styles.notFound}>Aucune recette trouvée...</Text>
      </View>
    );
  };


  const displayedRecipes = recipes.map((element, i) => (
    <Animatable.View key={i} style={styles.view} {...prop}>
      <TouchableOpacity onPress={() => handleRecipeClick(element._id)}>
        <View style={styles.recipes}>
          <Image source={{ uri: element.image }} style={styles.recipeImage} />
          <Text style={styles.H3}>{element.name}</Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  ));

  
  const clearSearch = () => {
    setSearchQuery("");
    // setVignettesSelected(userRegime);
    fetchAllRecipes("");
};

  useEffect(() => {
    animate("fadeInLeft");
    setTimeout(() => {
      fetchAllRecipes(searchQuery);
    }, 100);
  }, [isFocused, vignettesSelected]) /*, searchTimeout*/;

  //chemin de navigation vers RecipeScreen par le clic
  const handleRecipeClick = (id) => {
    const updatedRecipes = recipes.map((recette) =>
      recette.id === id ? { ...recipes, clics: recette.clics + 1 } : recipes
    );
    setRecipes(updatedRecipes); //why?
    // setFilteredRecipes(updatedRecipes);
    navigation.navigate("Recipe", { RecetteID: id, readingMode: false });
  };


  // onPress sur les Vignettes
  let isSelected;
  const handlePress = (name) => {
    // console.log("vignette press:", name);
    const found = vignettesSelected.some((element) => element === name);
    if (found) {
      setVignettesSelected(
        vignettesSelected.filter((element) => element !== name)
      );
    } else {
      setVignettesSelected([...vignettesSelected, name]);
    }
  };

  // afficher les vignettes de regime, selon les regimes dans le reducer user
  const regimeVignettes = regimeList.map((vi, i) => {
    isSelected = vignettesSelected.includes(vi.name);

    return (
      <Pressable
        key={i}
        disabled={false}
        onPress={() => handlePress(vi.name)}
        style={[styles.TagVignette, isSelected && styles.TagVignetteSelected]}
      >
        <Text style={styles.TxtVignette}>{vi.name}</Text>
        <View style={styles.ImgVignette}>
          <Image style={styles.icon} source={vi.src} />
        </View>
      </Pressable>
    );
  });

  //Titre conditionnel
  const listTitle = searchQuery.length <= 2 ? "Recettes populaires" : "Résultats de votre recherche";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.titleCont}>
        <Text style={styles.H1}>Recettes</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Rechercher..."
            value={searchQuery}
            onChangeText={value => handleSearch(value)} />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Image style={styles.clearButtonIcon} source={require("../assets/clear.png")} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.vignetteContainer}>{regimeVignettes}</View>
        <Text style={styles.H2}>{listTitle}</Text>
        <ScrollView style={styles.ScrollCont}>
          {recipes.length > 0 ? displayedRecipes : popularRecipes}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleCont: {
    marginTop: 50,
    alignItems: "flex-start",
    marginLeft: "4%",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "92%",
    marginBottom: 10,
  },

  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },

  H1: {
    fontSize: 30,
    color: "#365E32",
    fontWeight: "700",
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
  ScrollCont: {
    width: "96%",
  },
  emptyState: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  recipes: {
    borderWidth: 2,
    borderColor: "#81A263",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    borderBottomLeftRadius: 30,
    borderRadius: 10,
  },
  recipeImage: {
    height: 60,
    width: 60,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  PHbutton: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "green",
  },

  clearButton: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  clearButtonIcon: {
    width: 20,
    height: 20,
    tintColor: "#81A263",
  },

  vignetteContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginRight: 10,
  },

  TagVignette: {
    marginTop: 6,
    marginHorizontal: 5,
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.LIGHT_GREEN,
    borderRadius: 50,
    minWidth: 110,
    height: 33,
  },
  TagVignetteSelected: {
    backgroundColor: Colors.DARK_GREEN,
  },

  TxtVignette: {
    color: "white",
    fontWeight: "400",
    minWidth: 80,
    paddingLeft: 5,
  },
  ImgVignette: {
    backgroundColor: "white",
    borderRadius: 100,
    width: 22,
    height: 22,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: { width: 15, height: 15 },

  notFound: {
    color: "#365E32",
    fontSize: 35,
  },

});
