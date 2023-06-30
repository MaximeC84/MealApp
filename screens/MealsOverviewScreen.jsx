import { View, Text, StyleSheet, FlatList } from "react-native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import { useEffect, useLayoutEffect } from "react";
// import { useRoute } from "@react-navigation/native";

const MealsOverviewScreen = ({ route, navigation }) => {
	//On peut utiliser ce hook pour avoir les informations de la route actuelle depuis un composant nested
	// const route = useRoute();

	const categoryId = route.params.categoryId;

	//Les plats à afficher selon la catégorie
	const displayedMeals = MEALS.filter((mealItem) => {
		return mealItem.categoryIds.indexOf(categoryId) >= 0;
	});

	//On modifie le titre de la page en fonction de la catégorie
	useLayoutEffect(() => {
		const categoryTitle = CATEGORIES.find((category) => {
			return category.id === categoryId;
		}).title;

		navigation.setOptions({ title: categoryTitle });
	}, [categoryId, navigation]);

	//exercice
	const onPressHandler = () => {
		navigation.navigate("MealDetails");
	};

	const renderMealItem = (itemData) => {
		const item = itemData.item;

		const mealItemProps = {
			id: item.id,
			title: item.title,
			imageUrl: item.imageUrl,
			duration: item.duration,
			complexity: item.complexity,
			affordability: item.affordability,

			//Exercice OK
			// onPress: onPressHandler,
		};

		return <MealItem {...mealItemProps}></MealItem>;
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={displayedMeals}
				keyExtractor={(item) => item.id}
				renderItem={renderMealItem}
				style={styles.list}
			></FlatList>
		</View>
	);
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	list: {
		flex: 1,
	},
});
