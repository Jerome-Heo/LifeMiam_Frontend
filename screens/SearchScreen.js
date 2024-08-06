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
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';


export default function SearchScreen({}) {
  const [recipes, setRecipes] = useState([]);
  const [SearchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  
  // const recipePopularity = [
  //   { id: 11, name: "Poulet au curry", popularity: 5 },
  //   { id: 2, name: "Salade de fruits frais", popularity: 4 },
  //   { id: 12, name: "Salade César", popularity: 5 },
  //   { id: 15, name: "Gâteau au chocolat", popularity: 5 },
  //   { id: 39, name: "Pâtes à la carbonara", popularity: 5 },
  // ]
console.log(recipes)

const fetchPopularRecipes = () => {
  fetch('https://lifemiam-backend.vercel.app/recipes/?limit=10&sortBy=popularity')
  .then((response) => response.json())
  .then((data) => {
    // const sortedData = data.sort((a, b) => b.popularity - a.popularity);
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
}, []);
  
  // const filterByClicks = () => {
  //   const sortedRecipes = [...filteredRecipes].sort((a, b) => b.clics - a.clics);
  //   setFilteredRecipes(sortedRecipes);
  // };

  const handleSearch = (query) => {
  //   setSearchQuery(query);
  //   const filtered = recipes.filter((recipe) =>
  //     recipe.name.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredRecipes(filtered);
  };

  const handleRecipeClick = (id) => {
    const updatedRecipes = recipes.map((recette) =>
      recette.id === id ? { ...recipes, clics: recette.clics + 1 } : recipes
    );
    setRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes);
  };




  const popularRecipes = recipes.map((element, i) => {
    console.log(element.image)
    return (
      <TouchableOpacity key={i} onPress={() => handleRecipeClick(element._id)}>
      <View style={styles.recipes}>
        <Image source={{uri: element.image}} style={styles.recipeImage} />
        <Text>{element.name}</Text>
      </View>
    </TouchableOpacity>
    )
  })
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <StatusBar barStyle="dark-content" />
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

});
