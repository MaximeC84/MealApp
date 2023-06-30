import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailsScreen";

const Stack = createNativeStackNavigator();

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
						component={CategoriesScreen}
						options={{
							title: "All Categories",
						}}
					></Stack.Screen>
					<Stack.Screen
						name="MealsOverview"
						component={MealsOverviewScreen}
					></Stack.Screen>
					<Stack.Screen
						name="MealDetails"
						component={MealDetailScreen}
						// options={{
						// 	headerRight: () => {
						// 		return <Button title="Tap me!"></Button>;
						// 	},
						// }}
					></Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	container: {},
});
