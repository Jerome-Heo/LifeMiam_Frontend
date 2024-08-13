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
  Button,
  Pressable,
  Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../utilities/color";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { useRoute } from "@react-navigation/native";
const types = [
  "bounceIn",
  "bounceInDown",
  "bounceInUp",
  "bounceInLeft",
  "bounceInRight",
  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInUp",
  "fadeInUpBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "lightSpeedIn",
  "slideInDown",
  "slideInUp",
  "slideInLeft",
  "slideInRight",
  "zoomIn",
  "zoomInDown",
  "zoomInUp",
  "zoomInLeft",
  "zoomInRight",
];

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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

  const [recipes, setRecipes] = useState([]);
  const [SearchQuery, setSearchQuery] = useState("");
  // const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  // const [serving, setServing] = useState(Recipe.default_serving);
  const [Recipe, SetRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const activeMenu = useSelector((state) => state.user.value.menu);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const [recipesData, setRecipesData] = useState([]);

  // const {RecetteID} = route.params;
  const route = useRoute();
  const URL = "https://lifemiam-backend.vercel.app";
  const fetchPopularRecipes = () => {
    fetch(`${URL}/recipes/?sortBy=popularity`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.data);
        // setFilteredRecipes(data.data);
        // console.log(data.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const searchResults = (query) => { }

  const fetchAllRecipes = () => {
    const fetchURL = `${URL}/recipes/all`;
    // console.log(fetchURL);
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data)
        if (data.result) {
          // ICI on va remplir le 
          let newTabRecipes = [];
          for(let i=0; i < data.data.length; i++) {
            // console.log(data.data[i].name);
            const object = {
              name: data.data[i].name, 
              tags: data.data[i].tags,
              regime: data.data[i].regime,
              image: data.data[i].image,
              popularity: data.data[i].popularity,
              
              
            };
            // console.log(object);
            newTabRecipes.push(object);
            // NAME
            // TAGS
            // REGIME
            // IMAGE
            // POPULARITY

          }
          setRecipesData(newTabRecipes);
          console.log(recipesData);
          //setRecipes(data.data);
        } else {
          setRecipes([]);
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


  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      setTimeout(() => {
        fetchPopularRecipes();
        setIsLoading(false);
      }, 2000);
    }
  }, [isFocused]);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      if (SearchQuery.length === 0) {
        fetchPopularRecipes("");
      } else if (SearchQuery.length >= 3) {
        fetchPopularRecipes(SearchQuery);
      }
    }, 1000);

    setDebounceTimeout(newTimeout);
  }, [SearchQuery]);

  const regimeList = [
    { name: "sans gluten", src: require("../assets/gluten_free.png") },
    { name: "végétalien", src: require("../assets/vegan.png") },
    { name: "végétarien", src: require("../assets/vegetarian.png") },
    { name: "halal", src: require("../assets/halal.png") },
    { name: "sans lactose", src: require("../assets/lactose_free.png") },
  ];
  const userToken = useSelector((state) => state.user.value.token);
  // const token = "HkkfE9VmlughUTLaNifglDHuTNC5yfx5";
  const userRegime = useSelector((state) => state.user.value.regime);
  const [vignettesSelected, setVignettesSelected] = useState(userRegime);

  // Affichage des 10 recettes les plus populaires dans l'ordre décroissant
  // Sort pour Trier par popularité décroissante
  // Slice pour Prendre les 10 premiers éléments
  // Map pour recupérer ces données dans ma constante popularRecipes
  const popularRecipes = Array.isArray(recipes) ? recipesData.sort((a, b) => b.popularity - a.popularity).slice(0, 10).map((element, i) => {
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
  }) : [];

  // affichage empty state si 0 resultat de recettes
  const displayNull = () => {
    return (
      <View style={styles.emptyState}>
        <FontAwesome name={"search"} size={60} onPress={() => { }} />
        <Text style={styles.notFound}>Aucune recette trouvée...</Text>
      </View>
    );
  };

  const loadingView = () => {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  };

  //bouton "clear" pour effacer ce qui est écrit dans l'input
  const clearSearch = () => {
    setSearchQuery("");
    setVignettesSelected(userRegime);
    fetchAllRecipes("");
    // setFilteredRecipes([]);
    // setRecipes([]);
  };

  // REFACTO to have one fetch URL instead of 1 for popular recipes and 1 for search


  useEffect(() => {
    setTimeout(() => {
      searchResults(SearchQuery);
    }, 100);
  }, [isFocused]); // Ne déclenche qu'au focus, pas à chaque update de popularRecipes

  useEffect(() => {
    animate("fadeInLeft");
    setTimeout(() => {
      fetchAllRecipes(SearchQuery);
    }, 100);
  }, [isFocused, vignettesSelected]) /*, searchTimeout*/;

  //   useEffect(() => {
  //     fetch(`${URL}/recipes/${RecetteID}/${token}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //         SetRecipe(data.data)
  //         setServing(data.data.default_serving)
  //     })
  // }, [RecetteID])

  //requête BDD pour obtenir les recettes demandées
  // const fetchRecipesResults = (query) => {
  //   const formattedVignettes = vignettesSelected.map((e) =>
  //     encodeURIComponent(e)
  //   );
  // console.log("formattedVignettes:", formattedVignettes);
  // console.log("v:", vignettesSelected)
  const fetchVignettes = JSON.stringify(vignettesSelected);
  // console.log("fetchVignettes:", fetchVignettes);
  // const fetchURL = `${URL}/recipes/?sortBy=popularity&search=${query}&tags=${fetchVignettes}`;
  // console.log(fetchURL);
  //   fetch(fetchURL)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.result) {
  //         // setFilteredRecipes(data.data);
  //         setRecipes(data.data);
  //       } else {
  //         setRecipes([]);
  //         // console.error("Aucune recette correspondante");
  //       }
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.log("Erreur lors de la récupération des résultats : ", error);
  //     });
  // };
  // if (isLoading) {
  //   console.log("loading...");
  // }

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        searchResults(query);
      }, 2000)
    );
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
    // console.log("searchQuery", SearchQuery);
    // console.log("vignettes:", vignettesSelected);
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

  //

  //chemin de navigation vers RecipeScreen par le clic
  const handleRecipeClick = (id) => {
    const updatedRecipes = recipes.map((recette) =>
      recette.id === id ? { ...recipes, clics: recette.clics + 1 } : recipes
    );
    setRecipes(updatedRecipes); //why?
    // setFilteredRecipes(updatedRecipes);
    navigation.navigate("Recipe", { RecetteID: id });
  };

  //Ajouter une recette au menu avec bouton +
  //   const addRecipeToMenu = () =>{
  //     fetch(`${URL}/menus/${activeMenu}/addRecipe`,{
  //         method: "POST",
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ recipeId: route.params, serving : serving }),
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log(data);
  //           console.log(activeMenu)
  //         })
  // };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.titleCont}>
        <Text style={styles.H1}>Recettes</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Rechercher..."
            value={SearchQuery}
            onChangeText={handleSearch}
          // clearButtonMode={"unless-editing"}
          />
          {SearchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Image
                style={styles.clearButtonIcon}
                source={require("../assets/clear.png")}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.vignetteContainer}>{regimeVignettes}</View>
        <Text style={styles.H2}>Les recettes populaires</Text>
        <ScrollView style={styles.ScrollCont}>
          {isLoading
            ? loadingView()
            : recipes.length > 0
              ? popularRecipes
              : displayNull()}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}


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

  loadingText: {},
});
