import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealsList/MealItem";
import { useEffect, useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";
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

	return <MealsList items={displayedMeals}></MealsList>;
};

export default MealsOverviewScreen;
