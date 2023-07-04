import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailsScreen";
import FavoriteScreen from "./screens/FavoriteScreen";

import FavoritesContextProvider from "./store/context/favorites-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: "#351401" },
				headerTintColor: "white",
				sceneContainerStyle: { backgroundColor: "#3f2f25" },
				drawerContentStyle: { backgroundColor: "#351401" },
				drawerInactiveTintColor: "white",
				drawerActiveTintColor: "#351401",
				drawerActiveBackgroundColor: "#e4baa1",
			}}
		>
			<Drawer.Screen
				name="Categories"
				component={CategoriesScreen}
				options={{
					title: "All Categories",
					drawerIcon: ({ color, size }) => {
						return <Ionicons name="list" color={color} size={size} />;
					},
				}}
			/>
			<Drawer.Screen
				name="Favorites"
				component={FavoriteScreen}
				options={{
					title: "Favorites",
					drawerIcon: ({ color, size }) => {
						return <Ionicons name="star" color={color} size={size} />;
					},
				}}
			/>
		</Drawer.Navigator>
	);
}

export default function App() {
	const [fontsLoaded] = useFonts({
		"butler-regular": require("./assets/font/Butler_Regular.otf"),
		"butler-bold": require("./assets/font/Butler_Bold.otf"),
	});

	if (!fontsLoaded) {
		return <AppLoading></AppLoading>;
	}

	return (
		<>
			<StatusBar style="dark" />

			<FavoritesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: "#351401" },
							headerTintColor: "white",
							contentStyle: { backgroundColor: "#3f2f25" },
						}}
					>
						<Stack.Screen
							name="MealsCategories"
							component={DrawerNavigator}
							options={{
								headerShown: false,
							}}
						></Stack.Screen>
						{/* <Stack.Screen
						name="MealsCategories"
						component={CategoriesScreen}
						options={{
							title: "All Categories",
						}}
					></Stack.Screen> */}
						<Stack.Screen
							name="MealsOverview"
							component={MealsOverviewScreen}
						></Stack.Screen>
						<Stack.Screen
							name="MealDetails"
							component={MealDetailScreen}
							options={{ title: "About the Meal" }}
						></Stack.Screen>
					</Stack.Navigator>
				</NavigationContainer>
			</FavoritesContextProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {},
});
