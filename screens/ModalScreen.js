import {
  View,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Colors from "../utilities/color";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ModalScreen({ navigation, navigation: { goBack } }) {
  const URL = "https://lifemiam-backend.vercel.app";
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.value.token);
  const isFocused = useIsFocused();
  const route = useRoute();
  const urlParams = route.params;

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (userToken && urlParams != undefined) {
      console.log(userToken, urlParams.menuId);
      fetch(`${URL}/menus/${urlParams.menuId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: userToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          setRecipes(data.menu.menu_recipes);
          //   dispatch(setMenu(menuId));
          //   console.log(data.menu.menu_recipes);
          //   setVisibleMenu(data.menu.menu_recipes);
          //   handleMenuList();
        });
    } else {
      setError("Aucunes données, êtes-vous connecté ?");
    }
  }, [isFocused]);

  const recipesDisplay = recipes.map((data, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={styles.recipeCont}
        onPress={() => {
          //   console.log("pressed", data.recipe._id) &&
          navigation.navigate("Recipe", { RecetteID: data.recipe._id });
        }}
      >
        <Text style={styles.menuTxt}>{`${data.recipe.name}`}</Text>
        <TouchableOpacity>
          <FontAwesome
            name={"info-circle"}
            style={styles.menuListInfo}
            size={25}
            color={"#E7D37F"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
        <Text style={[{ fontSize: 20 }, styles.h1]}>Choisir la recette</Text>
        <Button onPress={() => {}} title="OK" />
      </View>
      <View style={styles.recipesList}>{recipesDisplay}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT_GREEN,
  },
  header: {
    width: "100%",
    height: "8%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderBottomColor: Colors.WHITE,
    borderBottomWidth: 2,
  },
  h1: {
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
  },
  recipeCont: {
    flexDirection: "row",
    marginTop: 5,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#365E32",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    width: "80%",
  },
  menuTxt: {
    color: "#E7D37F",
    fontSize: 18,
    fontWeight: "700",
  },
  menuListInfo: {
    marginRight: 20,
  },
});
