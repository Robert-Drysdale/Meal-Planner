// App.js
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Modal, TextInput, useColorScheme, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_MEALS = {
  breakfast: [
    {
      title: 'Greek Yogurt with Berries',
      ingredients: ['200g Greek yogurt', '100g mixed berries', '1 tbsp honey'],
      instructions: 'Mix yogurt with berries and drizzle honey on top.',
      macros: { calories: 250, protein: 20, carbs: 25, fat: 8 },
      batch: false,
    },
    {
      title: 'Oats with Almond Butter',
      ingredients: ['50g oats', '250ml almond milk', '1 tbsp almond butter'],
      instructions: 'Cook oats in almond milk and top with almond butter.',
      macros: { calories: 300, protein: 10, carbs: 40, fat: 12 },
      batch: false,
    },
    {
      title: 'Scrambled Eggs and Avocado Toast',
      ingredients: ['2 eggs', '1 slice whole grain bread', '1/2 avocado'],
      instructions: 'Scramble eggs and serve on toast with smashed avocado.',
      macros: { calories: 350, protein: 18, carbs: 20, fat: 22 },
      batch: false,
    },
    {
      title: 'Protein Pancakes',
      ingredients: ['1 scoop protein powder', '1 banana', '2 eggs'],
      instructions: 'Blend ingredients and cook pancakes in a pan.',
      macros: { calories: 400, protein: 30, carbs: 35, fat: 15 },
      batch: false,
    },
    {
      title: 'Chia Pudding',
      ingredients: ['3 tbsp chia seeds', '250ml almond milk', '1 tsp maple syrup'],
      instructions: 'Mix and refrigerate overnight.',
      macros: { calories: 200, protein: 6, carbs: 15, fat: 12 },
      batch: false,
    },
    {
      title: 'Smoothie Bowl',
      ingredients: ['1 banana', '100g mixed berries', '50g Greek yogurt'],
      instructions: 'Blend and serve in a bowl with toppings.',
      macros: { calories: 280, protein: 12, carbs: 35, fat: 10 },
      batch: false,
    },
    {
      title: 'Boiled Eggs & Fruit',
      ingredients: ['2 boiled eggs', '1 apple'],
      instructions: 'Boil eggs and serve with a fresh apple.',
      macros: { calories: 250, protein: 14, carbs: 22, fat: 13 },
      batch: false,
    },
    {
      title: 'Quinoa Porridge',
      ingredients: ['50g quinoa', '250ml milk', '1 tsp honey'],
      instructions: 'Cook quinoa in milk and top with honey.',
      macros: { calories: 290, protein: 10, carbs: 38, fat: 9 },
      batch: false,
    },
    {
      title: 'Avocado & Cottage Cheese Toast',
      ingredients: ['1 slice whole grain bread', '1/2 avocado', '50g cottage cheese'],
      instructions: 'Toast bread and top with avocado and cottage cheese.',
      macros: { calories: 320, protein: 15, carbs: 25, fat: 18 },
      batch: false,
    },
    {
      title: 'Tofu Scramble',
      ingredients: ['100g tofu', '1/4 onion', '1/4 bell pepper'],
      instructions: 'Crumble and sauté tofu with vegetables.',
      macros: { calories: 270, protein: 20, carbs: 10, fat: 18 },
      batch: false,
    },
  ],
  lunch: [
    {
      title: 'Chicken Salad Bowl',
      ingredients: ['150g grilled chicken', '100g mixed greens', '1 tbsp olive oil'],
      instructions: 'Combine all ingredients in a bowl.',
      macros: { calories: 350, protein: 35, carbs: 10, fat: 20 },
      batch: false,
    },
    {
      title: 'Tuna Wrap',
      ingredients: ['100g tuna', '1 whole grain wrap', 'lettuce', '1 tbsp Greek yogurt'],
      instructions: 'Fill wrap with tuna and veggies, roll and serve.',
      macros: { calories: 400, protein: 30, carbs: 25, fat: 18 },
      batch: false,
    },
    {
      title: 'Turkey and Hummus Pita',
      ingredients: ['100g turkey breast', '1 whole wheat pita', '30g hummus'],
      instructions: 'Fill pita with turkey and hummus.',
      macros: { calories: 370, protein: 28, carbs: 30, fat: 15 },
      batch: false,
    },
    {
      title: 'Quinoa & Chickpea Salad',
      ingredients: ['100g cooked quinoa', '100g chickpeas', 'mixed veggies'],
      instructions: 'Mix all ingredients and season to taste.',
      macros: { calories: 420, protein: 20, carbs: 45, fat: 14 },
      batch: false,
    },
    {
      title: 'Grilled Tofu & Veggie Bowl',
      ingredients: ['100g tofu', '100g brown rice', 'assorted vegetables'],
      instructions: 'Grill tofu and serve with rice and veggies.',
      macros: { calories: 430, protein: 25, carbs: 40, fat: 18 },
      batch: false,
    },
  ],
  dinner: [
    {
      title: 'Salmon and Sweet Potato',
      ingredients: ['150g baked salmon', '200g roasted sweet potatoes', '100g broccoli'],
      instructions: 'Bake salmon and serve with roasted sweet potatoes and steamed broccoli.',
      macros: { calories: 500, protein: 40, carbs: 35, fat: 25 },
      batch: false,
    },
    {
      title: 'Beef Stir Fry',
      ingredients: ['150g beef strips', '150g mixed vegetables', '100g brown rice'],
      instructions: 'Stir fry beef and veggies, serve with rice.',
      macros: { calories: 480, protein: 42, carbs: 38, fat: 22 },
      batch: false,
    },
    {
      title: 'Vegetable Curry',
      ingredients: ['150g mixed vegetables', '100g chickpeas', '150ml coconut milk'],
      instructions: 'Cook vegetables and chickpeas in coconut milk with spices.',
      macros: { calories: 450, protein: 18, carbs: 50, fat: 15 },
      batch: false,
    },
    {
      title: 'Chicken and Quinoa',
      ingredients: ['150g grilled chicken', '100g quinoa', '100g steamed vegetables'],
      instructions: 'Grill chicken and serve with quinoa and veggies.',
      macros: { calories: 470, protein: 40, carbs: 35, fat: 12 },
      batch: false,
    },
    {
      title: 'Pasta Primavera',
      ingredients: ['150g whole wheat pasta', '150g mixed vegetables', '30g parmesan cheese'],
      instructions: 'Cook pasta and veggies, toss with cheese.',
      macros: { calories: 520, protein: 22, carbs: 60, fat: 18 },
      batch: false,
    },
    {
      title: 'Grilled Shrimp Salad',
      ingredients: ['150g grilled shrimp', '100g mixed greens', '1 tbsp olive oil'],
      instructions: 'Grill shrimp and toss with greens and olive oil.',
      macros: { calories: 390, protein: 38, carbs: 10, fat: 20 },
      batch: false,
    },
    {
      title: 'Stuffed Peppers',
      ingredients: ['2 bell peppers', '100g ground turkey', '50g rice'],
      instructions: 'Stuff peppers with turkey and rice mixture, bake until cooked.',
      macros: { calories: 430, protein: 35, carbs: 30, fat: 15 },
      batch: false,
    },
    {
      title: 'Lentil Soup',
      ingredients: ['150g lentils', '100g vegetables', 'vegetable broth'],
      instructions: 'Cook lentils and veggies in broth until tender.',
      macros: { calories: 400, protein: 25, carbs: 40, fat: 5 },
      batch: false,
    },
    {
      title: 'Tofu Stir Fry',
      ingredients: ['150g tofu', '150g mixed vegetables', '100g rice noodles'],
      instructions: 'Stir fry tofu and veggies, serve with noodles.',
      macros: { calories: 460, protein: 30, carbs: 50, fat: 15 },
      batch: false,
    },
    {
      title: 'Baked Cod and Veggies',
      ingredients: ['150g baked cod', '150g roasted vegetables'],
      instructions: 'Bake cod and serve with roasted veggies.',
      macros: { calories: 420, protein: 38, carbs: 20, fat: 10 },
      batch: false,
    },
  ],
  snacks: [
    {
      title: 'Protein Shake',
      ingredients: ['1 scoop whey protein', '250ml water'],
      instructions: 'Mix the protein powder with water.',
      macros: { calories: 150, protein: 25, carbs: 3, fat: 2 },
      batch: false,
    },
    {
      title: 'Greek Yogurt with Honey',
      ingredients: ['150g Greek yogurt', '1 tsp honey'],
      instructions: 'Mix yogurt with honey.',
      macros: { calories: 120, protein: 12, carbs: 10, fat: 3 },
      batch: false,
    },
    {
      title: 'Mixed Nuts',
      ingredients: ['30g mixed nuts'],
      instructions: 'Eat as a snack.',
      macros: { calories: 200, protein: 5, carbs: 8, fat: 18 },
      batch: false,
    },
    {
      title: 'Apple with Peanut Butter',
      ingredients: ['1 apple', '1 tbsp peanut butter'],
      instructions: 'Slice apple and dip in peanut butter.',
      macros: { calories: 180, protein: 4, carbs: 25, fat: 7 },
      batch: false,
    },
    {
      title: 'Carrot Sticks with Hummus',
      ingredients: ['100g carrot sticks', '50g hummus'],
      instructions: 'Dip carrot sticks in hummus.',
      macros: { calories: 150, protein: 5, carbs: 15, fat: 6 },
      batch: false,
    },
    {
      title: 'Boiled Eggs',
      ingredients: ['2 boiled eggs'],
      instructions: 'Boil eggs and eat as is.',
      macros: { calories: 140, protein: 12, carbs: 1, fat: 9 },
      batch: false,
    },
    {
      title: 'Cottage Cheese and Pineapple',
      ingredients: ['100g cottage cheese', '50g pineapple'],
      instructions: 'Mix cottage cheese with pineapple.',
      macros: { calories: 160, protein: 14, carbs: 10, fat: 5 },
      batch: false,
    },
    {
      title: 'Rice Cakes with Avocado',
      ingredients: ['2 rice cakes', '1/2 avocado'],
      instructions: 'Spread avocado on rice cakes.',
      macros: { calories: 190, protein: 3, carbs: 30, fat: 8 },
      batch: false,
    },
    {
      title: 'Edamame',
      ingredients: ['100g edamame'],
      instructions: 'Steam edamame and sprinkle with salt.',
      macros: { calories: 120, protein: 11, carbs: 9, fat: 5 },
      batch: false,
    },
    {
      title: 'Dark Chocolate',
      ingredients: ['30g dark chocolate'],
      instructions: 'Eat as a treat.',
      macros: { calories: 170, protein: 2, carbs: 15, fat: 12 },
      batch: false,
    },
  ],
};

const BUTTON_COLORS = {
  add: '#4CAF50',     // green
  refresh: '#2196F3', // blue
  edit: '#FF9800',    // orange
  save: '#4CAF50',    // green
  cancel: '#f44336',  // red
};

export default function App() {
  const [meals, setMeals] = useState(INITIAL_MEALS);
  const [indices, setIndices] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snacks: 0,
  });

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentMealType, setCurrentMealType] = useState(null);
  const [currentMealIndex, setCurrentMealIndex] = useState(null);
  const [editMealData, setEditMealData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    macros: { calories: '', protein: '', carbs: '', fat: '' },
  });

  // Load saved meals from AsyncStorage on mount
  useEffect(() => {
    const loadMeals = async () => {
      try {
        const savedMeals = await AsyncStorage.getItem('@meals');
        if (savedMeals !== null) {
          setMeals(JSON.parse(savedMeals));
        }
      } catch (e) {
        console.error('Failed to load meals:', e);
      }
    };
    loadMeals();
  }, []);

  // Save meals to AsyncStorage whenever meals state changes
  useEffect(() => {
    const saveMeals = async () => {
      try {
        await AsyncStorage.setItem('@meals', JSON.stringify(meals));
      } catch (e) {
        console.error('Failed to save meals:', e);
      }
    };
    saveMeals();
  }, [meals]);

  const rotateMeal = (mealType) => {
    setIndices((prev) => {
      const newIndex = (prev[mealType] + 1) % meals[mealType].length;
      return { ...prev, [mealType]: newIndex };
    });
  };

  const addMeal = (mealType) => {
    const newMeal = {
      title: 'New Meal',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: 'Add instructions here.',
      macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      batch: false,
    };
    setMeals((prev) => ({
      ...prev,
      [mealType]: [...prev[mealType], newMeal],
    }));
    setIndices((prev) => ({
      ...prev,
      [mealType]: meals[mealType].length, // set index to new meal
    }));
  };

  const openEditModal = (mealType, index) => {
    const meal = meals[mealType][index];
    setCurrentMealType(mealType);
    setCurrentMealIndex(index);
    setEditMealData({
      title: meal.title,
      ingredients: meal.ingredients.join('\n'),
      instructions: meal.instructions,
      macros: {
        calories: meal.macros.calories.toString(),
        protein: meal.macros.protein.toString(),
        carbs: meal.macros.carbs.toString(),
        fat: meal.macros.fat.toString(),
      },
    });
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    // Validate macro numbers
    const calories = parseInt(editMealData.macros.calories, 10);
    const protein = parseInt(editMealData.macros.protein, 10);
    const carbs = parseInt(editMealData.macros.carbs, 10);
    const fat = parseInt(editMealData.macros.fat, 10);
    if (
      isNaN(calories) ||
      isNaN(protein) ||
      isNaN(carbs) ||
      isNaN(fat)
    ) {
      Alert.alert('Invalid Input', 'Please enter valid numbers for macros.');
      return;
    }

    const updatedMeal = {
      title: editMealData.title,
      ingredients: editMealData.ingredients
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0),
      instructions: editMealData.instructions,
      macros: { calories, protein, carbs, fat },
      batch: false,
    };

    setMeals((prev) => {
      const updatedMeals = [...prev[currentMealType]];
      updatedMeals[currentMealIndex] = updatedMeal;
      return { ...prev, [currentMealType]: updatedMeals };
    });

    setEditModalVisible(false);
  };

  const cancelEdit = () => {
    setEditModalVisible(false);
  };

  const colorScheme = useColorScheme();
  const isDarkMode = true; // force dark mode as requested

  const styles = createStyles(isDarkMode);

  const renderMeal = (mealType) => {
    const meal = meals[mealType][indices[mealType]];
    return (
      <View key={mealType} style={styles.mealContainer}>
        <Text style={styles.mealTitle}>{mealType.toUpperCase()}</Text>
        <Text style={styles.mealName}>{meal.title}</Text>
        <Text style={styles.subheading}>Ingredients:</Text>
        {meal.ingredients.map((item, i) => (
          <Text key={i} style={styles.text}>
            - {item}
          </Text>
        ))}
        <Text style={styles.subheading}>Instructions:</Text>
        <Text style={styles.text}>{meal.instructions}</Text>
        <Text style={styles.subheading}>Macros (cal/prot/carbs/fat):</Text>
        <Text style={styles.text}>
          {meal.macros.calories} / {meal.macros.protein} / {meal.macros.carbs} / {meal.macros.fat}
        </Text>

        {/* Buttons container */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: BUTTON_COLORS.refresh }]}
            onPress={() => rotateMeal(mealType)}
          >
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: BUTTON_COLORS.edit }]}
            onPress={() => openEditModal(mealType, indices[mealType])}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: BUTTON_COLORS.add }]}
            onPress={() => addMeal(mealType)}
          >
            <Text style={styles.buttonText}>Add Meal</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {['breakfast', 'lunch', 'dinner', 'snacks'].map(renderMeal)}
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Meal</Text>

            <Text style={styles.modalLabel}>Title:</Text>
            <TextInput
              style={styles.modalInput}
              value={editMealData.title}
              onChangeText={(text) => setEditMealData((prev) => ({ ...prev, title: text }))}
            />

            <Text style={styles.modalLabel}>Ingredients (one per line):</Text>
            <TextInput
              style={[styles.modalInput, { height: 80 }]}
              multiline
              value={editMealData.ingredients}
              onChangeText={(text) => setEditMealData((prev) => ({ ...prev, ingredients: text }))}
            />

            <Text style={styles.modalLabel}>Instructions:</Text>
            <TextInput
              style={[styles.modalInput, { height: 80 }]}
              multiline
              value={editMealData.instructions}
              onChangeText={(text) => setEditMealData((prev) => ({ ...prev, instructions: text }))}
            />

            <Text style={styles.modalLabel}>Macros:</Text>
            <View style={styles.macrosRow}>
              <View style={styles.macroInputContainer}>
                <Text style={styles.macroLabel}>Calories:</Text>
                <TextInput
                  style={styles.macroInput}
                  keyboardType="numeric"
                  value={editMealData.macros.calories}
                  onChangeText={(text) =>
                    setEditMealData((prev) => ({
                      ...prev,
                      macros: { ...prev.macros, calories: text },
                    }))
                  }
                />
              </View>

              <View style={styles.macroInputContainer}>
                <Text style={styles.macroLabel}>Protein:</Text>
                <TextInput
                  style={styles.macroInput}
                  keyboardType="numeric"
                  value={editMealData.macros.protein}
                  onChangeText={(text) =>
                    setEditMealData((prev) => ({
                      ...prev,
                      macros: { ...prev.macros, protein: text },
                    }))
                  }
                />
              </View>
            </View>
            <View style={styles.macrosRow}>
              <View style={styles.macroInputContainer}>
                <Text style={styles.macroLabel}>Carbs:</Text>
                <TextInput
                  style={styles.macroInput}
                  keyboardType="numeric"
                  value={editMealData.macros.carbs}
                  onChangeText={(text) =>
                    setEditMealData((prev) => ({
                      ...prev,
                      macros: { ...prev.macros, carbs: text },
                    }))
                  }
                />
              </View>

              <View style={styles.macroInputContainer}>
                <Text style={styles.macroLabel}>Fat:</Text>
                <TextInput
                  style={styles.macroInput}
                  keyboardType="numeric"
                  value={editMealData.macros.fat}
                  onChangeText={(text) =>
                    setEditMealData((prev) => ({
                      ...prev,
                      macros: { ...prev.macros, fat: text },
                    }))
                  }
                />
              </View>
            </View>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: BUTTON_COLORS.save }]} onPress={saveEdit}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalButton, { backgroundColor: BUTTON_COLORS.cancel }]} onPress={cancelEdit}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const createStyles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#121212' : '#fff',
      paddingTop: 40,
    },
    scrollContent: {
      paddingBottom: 100,
      paddingHorizontal: 20,
    },
    mealContainer: {
      backgroundColor: darkMode ? '#1E1E1E' : '#f5f5f5',
      borderRadius: 8,
      padding: 15,
      marginBottom: 20,
      shadowColor: darkMode ? '#000' : '#aaa',
      shadowOpacity: 0.3,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    mealTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? '#fff' : '#000',
      marginBottom: 10,
      textTransform: 'capitalize',
    },
    mealName: {
      fontSize: 16,
      fontWeight: '600',
      color: darkMode ? '#ccc' : '#333',
      marginBottom: 10,
    },
    subheading: {
      fontWeight: 'bold',
      color: darkMode ? '#ddd' : '#555',
      marginTop: 8,
      marginBottom: 4,
    },
    text: {
      color: darkMode ? '#eee' : '#222',
      fontSize: 14,
      marginBottom: 2,
    },
    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 15,
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 6,
      minWidth: 80,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    modalContainer: {
      backgroundColor: darkMode ? '#222' : '#fff',
      borderRadius: 10,
      padding: 20,
      width: '100%',
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: darkMode ? '#fff' : '#000',
      marginBottom: 15,
      textAlign: 'center',
    },
    modalLabel: {
      color: darkMode ? '#ddd' : '#333',
      fontWeight: '600',
      marginTop: 10,
    },
    modalInput: {
      backgroundColor: darkMode ? '#333' : '#f0f0f0',
      color: darkMode ? '#eee' : '#000',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 6,
      marginTop: 4,
    },
    macrosRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    macroInputContainer: {
      flex: 1,
      marginRight: 10,
    },
    macroLabel: {
      color: darkMode ? '#ddd' : '#333',
      fontWeight: '600',
      marginBottom: 4,
    },
    macroInput: {
      backgroundColor: darkMode ? '#333' : '#f0f0f0',
      color: darkMode ? '#eee' : '#000',
      borderRadius: 5,
      paddingHorizontal: 8,
      paddingVertical: 6,
    },
    modalButtonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    modalButton: {
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 6,
      minWidth: 100,
      alignItems: 'center',
    },
  });
