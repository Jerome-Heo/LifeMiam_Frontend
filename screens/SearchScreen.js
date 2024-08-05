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

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch();
        const data = await response.json();
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [search]);


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text style={styles.title}>Recettes</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={search}
        onChangeText={text => setSearch(text)}
      />
      <Text style={styles.subtitle}>Les recettes populaires</Text>
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
    marginTop: 70,
    color: "green",
    fontSize: 20,
  },

  allResults: {

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
