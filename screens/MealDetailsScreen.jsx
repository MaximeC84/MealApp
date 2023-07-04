import {
	Text,
	View,
	Image,
	StyleSheet,
	ScrollView,
	Button,
} from "react-native";
import { useContext, useLayoutEffect } from "react";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";
const MealDetailScreen = ({ route, navigation }) => {
	const favoriteMealsCtx = useContext(FavoritesContext);

	const mealId = route.params.mealId;

	const selectedMeal = MEALS.find((item) => {
		return item.id === mealId;
	});

	const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

	const changeFavoriteStatusHandler = () => {
		if (mealIsFavorite) {
			favoriteMealsCtx.removeFavorite(mealId);
		} else {
			favoriteMealsCtx.addFavorite(mealId);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: selectedMeal.title,
			headerRight: () => {
				return (
					<IconButton
						onPress={changeFavoriteStatusHandler}
						color="white"
						icon={mealIsFavorite ? "star" : "star-outline"}
					></IconButton>
				);
			},
		});
	}, [navigation, changeFavoriteStatusHandler]);

	return (
		<ScrollView style={styles.rootContainer}>
			<Image
				source={{ uri: selectedMeal.imageUrl }}
				style={styles.image}
			></Image>
			<Text style={styles.title}>{selectedMeal.title}</Text>

			<View>
				<MealDetails
					duration={selectedMeal.duration}
					complexity={selectedMeal.complexity}
					affordability={selectedMeal.affordability}
					textStyle={styles.detailText}
				></MealDetails>
			</View>

			<View style={styles.listOuterContainer}>
				<View style={styles.listContainer}>
					<Subtitle>Ingredients</Subtitle>
					<List data={selectedMeal.ingredients}></List>
					<Subtitle>Steps</Subtitle>
					<List data={selectedMeal.steps}></List>
				</View>
			</View>
		</ScrollView>
	);
};

export default MealDetailScreen;

const styles = StyleSheet.create({
	rootContainer: {
		marginBottom: 32,
	},
	image: {
		width: "100%",
		height: 350,
	},
	title: {
		fontWeight: "bold",
		fontSize: 24,
		margin: 8,
		textAlign: "center",
		color: "white",
	},
	detailText: {
		color: "white",
	},
	listOuterContainer: {
		alignItems: "center",
	},
	listContainer: {
		width: "80%",
	},
});
