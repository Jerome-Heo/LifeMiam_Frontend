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
} from 'react-native';
import { useIsFocused } from "@react-navigation/native";


export default function SearchScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [SearchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const isFocused = useIsFocused();
  const [searchTimeout, setSearchTimeout] = useState(null);
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

  // fetch à débug ASAP jéjé
  const fetchSearchResults = (query) => {
    fetch(`${URL}/recipes/?search=Gâteau%20au%20chocolat${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        if (data.data.length) {
          setFilteredRecipes(data.data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        fetchSearchResults(query);
      }, 2000)
    );
  };



  const handleRecipeClick = (id) => {
    const updatedRecipes = recipes.map((recette) =>
      recette.id === id ? { ...recipes, clics: recette.clics + 1 } : recipes
    );
    setRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes);
    navigation.navigate("Recipe", {RecetteID: id});
  };


  const popularRecipes = recipes.map((element, i) => {
    // console.log(element.image)
    return (
      <TouchableOpacity key={i} onPress={() => handleRecipeClick(element._id)}>
        <View style={styles.recipes}>
          <Image source={{ uri: element.image }} style={styles.recipeImage} />
          <Text>{element.name}</Text>
        </View>
      </TouchableOpacity>
    )
  })
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

      <Text style={styles.title}>Recettes</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher..."
        value={SearchQuery}
        onChangeText={handleSearch}
      />
      <Text style={styles.subtitle}>Les recettes populaires</Text>
      {popularRecipes}
      {/* <FlatList
        data={filteredRecipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center"
  },

  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
    width: 300,
  },

  title: {
    color: "green",
    fontSize: 30,
  },

  subtitle: {
    color: "green",
    fontSize: 20,
  },

  allResults: {
    paddingBottom: 150,
  },

  result1: {

  },

  result2: {
    marginTop: 15,
  },

  result3: {

  },

  fruitsSalad: {
    height: 60,
    width: 60,
  },

  recipeImage: {
    height: 60,
    width: 60,
  },

});














