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
  
  export default function SearchScreen({navigation}) {
    const [search, setSearch] = useState('');
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recettes</Text>
              <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={search}
        onChangeText={text => setSearch(text)}
      />
      <Text style={styles.subtitle}>Les recettes populaires</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.navigate("Recipe")}>
      <View style={styles.allResults}>
      <Text style={styles.result1}><Image source={require("../assets/gateau_cerise.jpg")}/>Gâteau aux cerises</Text>
      </View>
      </TouchableOpacity>
      </View>
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
      
    }
  });
  