import {
	View,
	Text,
	Pressable,
	Image,
	StyleSheet,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MealDetails from "./MealDetails";

const MealItem = (props) => {
	const navigation = useNavigation();

	//exercice
	const selectMealHandler = () => {
		// props.onPress();
		navigation.navigate("MealDetails", {
			mealId: props.id,
		});
	};

	return (
		<View style={styles.mealItem}>
			<Pressable
				android_ripple={{ color: "#ccc" }}
				style={({ pressed }) => {
					return pressed ? styles.buttonPressed : null;
				}}
				//Exercice
				onPress={selectMealHandler}
			>
				<View>
					<View>
						<Image source={{ uri: props.imageUrl }} style={styles.image} />
						<Text style={styles.title}>{props.title}</Text>
					</View>

					<MealDetails
						duration={props.duration}
						complexity={props.complexity}
						affordability={props.affordability}
					></MealDetails>
				</View>
			</Pressable>
		</View>
	);
};

export default MealItem;

const styles = StyleSheet.create({
	mealItem: {
		margin: 16,
		borderRadius: 8,
		// overflow: "hidden",
		backgroundColor: "white",
		elevation: 4,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.35,
		shadowRadius: 16,

		overflow: Platform.OS === "android" ? "hidden" : "visible",
	},

	innerContainer: {
		borderRadius: 8,
		overflow: "hidden",
	},

	image: {
		width: "100%",
		height: 200,
	},

	title: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 18,
		padding: 8,
	},

	buttonPressed: {
		opacity: 0.75,
	},
});
