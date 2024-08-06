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

const recipePopularity = [
  {id: 11, name: "Poulet au curry", popularity: 5},
  {id: 2, name: "Salade de fruits frais", popularity: 4},
  {id: 12, name: "Salade César", popularity: 5},
  {id: 15, name: "Gâteau au chocolat", popularity: 5},
  {id: 39, name: "Pâtes à la carbonara", popularity: 5},
]

export default function SearchScreen({ navigation }) {
  const [recipes, setRecipes] = useState(recipePopularity);
  const [SearchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipePopularity);

  const filterByClicks = () => {
    const sortedRecipes = [...filteredRecipes].sort((a, b) => b.clics - a.clics);
    setFilteredRecipes(sortedRecipes);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleRecipeClick = (id) => {
    const updatedRecipes = recipes.map((recette) =>
      recette.id === id ? { ...recipes, clics: recette.clics + 1 } : recipes
    );
    setRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://lifemiam-backend.vercel.app/recipes/?limit=10&sortBy=popularity");
        const data = await response.json();
        setFilteredRecipes(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [SearchQuery]);


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
     <FlatList
    //   data={filteredRecipe}
    //   keyExtractor={recipe => recipe._id}
    //   renderItem={({ recipe }) => <Text style={styles.recipe}>{recipe.title}</Text>}
     />
    
      <Text style={styles.subtitle}>Les recettes populaires</Text>
      <TouchableOpacity style={styles.button} onPress={filterByClicks}>
        <Image style={styles.sort} source={require("../assets/trier.png")}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.navigate("Recipe")}>
        <View style={styles.allResults}></View>
        <Text style={styles.result1}><Image source={require("../assets/gateau_chocolat.jpg")} />Gâteau au chocolat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.navigate("Recipe")}>
        <Text style={styles.result2}><Image source={require("../assets/pates_carbonara.jpg")} />Pâtes à la carbonara</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.navigate("Recipe")}>
        <Text style={styles.result3}><Image style={styles.fruitsSalad} source={require("../assets/salade_fruits.jpg")} />Salade de fruits frais</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.navigate("Recipe")}>
        <Text style={styles.result3}><Image style={styles.fruitsSalad} source={require("../assets/poulet_curry.jpg")} />Poulet au curry</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.navigate("Recipe")}>
        <Text style={styles.result3}><Image style={styles.fruitsSalad} source={require("../assets/caesar_salad.jpg")} />Salade César</Text>
      </TouchableOpacity>
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
