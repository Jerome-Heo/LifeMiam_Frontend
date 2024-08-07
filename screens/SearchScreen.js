import React, { useState, useEffect } from 'react';
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
import { useIsFocused } from "@react-navigation/native";


export default function SearchScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [SearchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const isFocused = useIsFocused();
  const URL = 'https://lifemiam-backend.vercel.app'


  const fetchPopularRecipes = () => {
    fetch(`${URL}/recipes/?&sortBy=popularity`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.data);
        setFilteredRecipes(data.data);
        // console.log(data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
  }

  useEffect(() => {
    fetchPopularRecipes();
  }, [isFocused]);

  //requête BDD pour obtenir les recettes demandées
  const fetchSearchResults = (query) => {
    fetch(`${URL}/recipes/?search=${query}&tags=["végétarien"]`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.data.length) {
          setFilteredRecipes(data.data);
          setRecipes(data.data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  //timer pour aider l'utilisateur qui hésite dans sa recherche
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        fetchSearchResults(query);
      }, 1000)
    );
  };


  //chemin de navigation vers RecipeScreen par le clic
  const handleRecipeClick = (id) => {
    const updatedRecipes = recipes.map((recette) =>
      recette.id === id ? { ...recipes, clics: recette.clics + 1 } : recipes
    );
    setRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes);
    navigation.navigate("Recipe", { RecetteID: id });
  };

  const addRecipeToMenu = (recipe) => {
    navigation.navigate('MenuScreen', { recipe });
  };

  //affichage des recettes populaires avec les images cloudinary depuis la BDD
  const popularRecipes = recipes.map((element, i) => {
    // console.log(element.image)
    return (
      <TouchableOpacity key={i} onPress={() => handleRecipeClick(element._id)}>
        <View style={styles.recipes}>
          <Image source={{ uri: element.image }} style={styles.recipeImage} />
          <Text style={styles.H3}>{element.name}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => addRecipeToMenu(element)}>
            <Image source={require("../assets/smallAdd.png")}></Image>
          </TouchableOpacity>    
          <View style={styles.PHbutton}></View>
        </View>
      </TouchableOpacity>
    )
  });
        


  //bouton "clear" pour effacer ce qui est écrit dans l'input
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredRecipes([]);
    setRecipes([]);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.titleCont}>
        <Text style={styles.H1}>Recettes</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher..."
          value={SearchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <Image style={styles.clearButton} source={require("../assets/clear.png")} />
        </TouchableOpacity>

        <Text style={styles.H2}>Les recettes populaires</Text>
        <ScrollView style={styles.ScrollCont}>
          {popularRecipes}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
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
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
    width: "96%",
  },
  H1: {
    fontSize: 30,
    color: "#365E32",
    fontWeight: "700"
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
    width: "96%"
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
    width: 50,
    height: 50,
  },

  clearButton: {
    height: 20,
    width: 20,
  },
});














