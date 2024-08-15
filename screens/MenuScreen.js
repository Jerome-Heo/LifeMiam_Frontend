import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../utilities/color";
import { updateList } from "../reducers/lists";
import { useIsFocused } from "@react-navigation/native";

export default function MenuScreen({ navigation }) {
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.user.value.token);
  const courselist = useSelector((state) => state.lists.value);
  const URL = "https://lifemiam-backend.vercel.app";

  const [menus, setMenus] = useState([]);
  const [isCreatingMenu, setIsCreatingMenu] = useState(false);
  const [createBarTxt, setCreateBarTxt] = useState("");
  const [isMenuAdded, setIsMenuAdded] = useState(false);
  const [jauges, setJauges] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    fetch(`${URL}/menus/getMenus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) setMenus(data);
      });
  }, [isMenuAdded]);

  useEffect(() => {
    const fetchJauges = async () => {
      const newJauges = {};
      for (let i = 0; i < menus.length; i++) {
        const jauge = await calculateJauge(menus[i]._id);
        newJauges[menus[i]._id] = jauge;
      }
      setJauges(newJauges);
    };

    fetchJauges();
  }, [menus]);

  const handleCreateMenu = () => {
    fetch(`${URL}/menus/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userToken, name: createBarTxt }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsCreatingMenu(false);
        setIsMenuAdded(!isMenuAdded);
        setCreateBarTxt("");
      });
  };

  const handleShoppingList = (id) => {
    navigation.navigate("List", { menuId: id });
  };

  const handleRecipeDisplay = (id, name) => {
    navigation.navigate("RecipesModal", { menuId: id, menuName: name });
  };

  const calculateJauge = async function (menuId) {
    try {
      const response = await fetch(`${URL}/shop/getlist/${menuId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: userToken }),
      });
      const data = await response.json();
      if (data.result === true) {
        dispatch(
          updateList({
            menuId: menuId,
            ingredients: data.data.Ingredients,
          })
        );
        const oneList = courselist.find((e) => e.menuId === menuId);
        if (oneList) {
          let ingCounter = 0;
          oneList.ingredients.forEach((e) => {
            if (e.isBuyed) ingCounter++;
          });
          const jauge = Math.floor((100 / oneList.ingredients.length) * ingCounter);
          return jauge;
        }
      }
    } catch (error) {
      console.error("Failed to calculate jauge:", error);
    }
    return 0; // Default value if calculation fails
  };

  const createMenuButton = isCreatingMenu ? (
    <View style={styles.validCont}>
      <TextInput
        style={styles.validBar}
        onChangeText={(e) => setCreateBarTxt(e)}
        value={createBarTxt}
        placeholder="Votre nouveau menu..."
      />
      <TouchableOpacity
        style={styles.validMenu}
        onPress={() => handleCreateMenu(createBarTxt)}
      >
        <Image source={require("../assets/ValidMenu.png")}></Image>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.contentCont}>
      <TouchableOpacity
        style={styles.createMenu}
        onPress={() => setIsCreatingMenu(true)}
      >
        <Text style={styles.createMenuTxt}>Créer un menu</Text>
      </TouchableOpacity>
    </View>
  );

  const menusDisplay =
    menus &&
    menus.map((data, i) => {
      const jauge = jauges[data._id] || 0;
      return (
        <View key={i} style={styles.menuCont}>
          <Text style={styles.H3}>{`${data.name}`}</Text>
          <View style={styles.PHCont}>
            <TouchableOpacity
              onPress={() => handleShoppingList(data._id)}
              style={styles.PHProgressBar}
            >
              <Text style={styles.courseTitleText}>Courses {jauge}%</Text>
            </TouchableOpacity>
            {data.menu_recipes.length > 0 ? (
              <TouchableOpacity
                style={styles.PHButton}
                onPress={() => handleRecipeDisplay(data._id, data.name)}
              >
                <Image
                  source={require("../assets/cooking.png")}
                  style={styles.imageCooking}
                ></Image>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.disabledPHButton} disabled={true}>
                <Image
                  source={require("../assets/cooking.png")}
                  style={[styles.imageCooking, styles.disabledIcon]}
                ></Image>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    });

  const display =
    menus.length > 0 ? (
      <View style={styles.fetchMenusCont}>
        <ScrollView
          style={{ height: "78%" }}
          showsVerticalScrollIndicator={false}
        >
          {menusDisplay}
        </ScrollView>
        <View style={styles.createMenuAlign}>{createMenuButton}</View>
      </View>
    ) : (
      <View>
        <View style={styles.contentCont}>
          <Image
            style={styles.logoImg}
            source={require("../assets/logo.png")}
          />
          <Text style={styles.H3}>Vous n'avez pas de menus...</Text>
          <Text style={styles.H3}>Commencer une liste ?</Text>
        </View>
        <View>{createMenuButton}</View>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={[styles.H1, styles.title]}>Menus</Text>
      <View style={styles.contentCont}>
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher un menu..."
        />
        {display}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentCont: {
    alignItems: "center",
  },
  title: {
    marginTop: 50,
  },
  searchBar: {
    height: 60,
    fontSize: 17,
    borderColor: "#81A263",
    borderWidth: 2,
    paddingLeft: 8,
    marginBottom: 10,
    width: "96%",
    borderRadius: 10,
  },
  H1: {
    fontSize: 30,
    color: "#365E32",
    marginLeft: 10,
    fontWeight: "700",
    margin: 5,
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
    marginBottom: 0,
  },

  courseTitleText: {
    fontSize: 26,
  },
  logoImg: {
    width: 300,
    height: 300,
  },
  createMenu: {
    height: 70,
    width: "100%",
    backgroundColor: "#365E32",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 50,
  },
  createMenuAlign: {
    width: "98%",
    position: "absolute",
    top: "95%",
    left: 3,
  },
  createMenuTxt: {
    fontSize: 20,
    fontWeight: "700",
    color: "#E7D37F",
  },
  validCont: {
    padding: 25,
    flexDirection: "row",
  },
  validBar: {
    marginRight: 10,
    height: 60,
    fontSize: 17,
    borderColor: "#81A263",
    borderWidth: 2,
    paddingLeft: 8,
    width: "80%",
    borderRadius: 10,
  },
  fetchMenusCont: {
    width: "100%",
  },
  menuCont: {
    width: "100%",
    height: 100,
  },
  PHCont: {
    flexDirection: "row",
  },
  PHProgressBar: {
    borderWidth: 1,
    height: 40,
    marginLeft: 15,
    margin: 5,
    borderRadius: 5,
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
  },
  PHShoppingList: {},
  PHButton: {
    backgroundColor: Colors.DARK_GREEN,
    height: 40,
    alignItems: "center",
    paddingTop: 2,
    paddingBottom: 2,
    marginLeft: 15,
    margin: 5,
    borderRadius: 5,
    width: "20%",
  },
  disabledPHButton: {
    backgroundColor: Colors.DARK_GREEN,
    opacity: 0.5,
    height: 40,
    alignItems: "center",
    paddingTop: 2,
    paddingBottom: 2,
    marginLeft: 15,
    margin: 5,
    borderRadius: 5,
    width: "20%",
  },
  imageCooking: {
    height: 35,
    resizeMode: "contain",
  },
  disabledIcon: {
    opacity: 0.5,
  },
  icon: {},
});
