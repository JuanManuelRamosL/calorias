// controllers/foodController.js
const { analyzeFoodText } = require('../services/nutritionix');
const foodDB = require('../data/foodDatabase'); // opcional si seguís usando una DB interna

const processText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Texto requerido para analizar' });
    }

    // 1. Analizar el texto con Nutritionix
    const recognizedFoods = await analyzeFoodText(text);

    // 2. Mapear el resultado
    const result = recognizedFoods.map(food => ({
      name: food.food_name,
      calories: food.nf_calories,
      portion: `${food.serving_qty} ${food.serving_unit}`
    }));

    // 3. Calcular total
    const totalCalories = result.reduce((sum, food) => sum + (food.calories || 0), 0);

    res.json({ foods: result, totalCalories });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar el texto del alimento' });
  }
};

module.exports = { processText };
