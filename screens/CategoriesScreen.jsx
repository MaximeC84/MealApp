import { FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

//le prop "navigation" est donnée naturellement par react-navigation
const CategoriesScreen = ({ navigation }) => {
	const renderCategoryItem = (itemData) => {
		const pressHandler = () => {
			navigation.navigate("MealsOverview", {
				categoryId: itemData.item.id,
			});
		};

		return (
			<CategoryGridTile
				title={itemData.item.title}
				color={itemData.item.color}
				onPress={pressHandler}
			></CategoryGridTile>
		);
	};

	return (
		<FlatList
			data={CATEGORIES}
			keyExtractor={(item) => item.id}
			renderItem={renderCategoryItem}
			numColumns={2}
		></FlatList>
	);
};

export default CategoriesScreen;
