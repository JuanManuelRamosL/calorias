const { analyzeFoodText } = require("../services/nutritionix");
const { recognizeFoodFromImage } = require("../services/promptLayerService");

const processImage = async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Falta la imagen en base64" });
    }

    const foodLabels = await recognizeFoodFromImage(imageBase64);
    const query = foodLabels.join(" and "); // ej: "pizza and soda"

    const foods = await analyzeFoodText(query);

    const result = foods.map((food) => ({
      name: food.food_name,
      calories: food.nf_calories,
      portion: `${food.serving_qty} ${food.serving_unit}`,
    }));

    const totalCalories = result.reduce(
      (sum, item) => sum + (item.calories || 0),
      0
    );

    res.json({ detected: foodLabels, foods: result, totalCalories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al analizar la imagen" });
  }
};

const processText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Texto requerido para analizar" });
    }

    // 1. Analizar el texto con Nutritionix
    const recognizedFoods = await analyzeFoodText(text);

    // 2. Mapear el resultado
    const result = recognizedFoods.map((food) => ({
      name: food.food_name,
      calories: food.nf_calories,
      portion: `${food.serving_qty} ${food.serving_unit}`,
    }));

    // 3. Calcular total
    const totalCalories = result.reduce(
      (sum, food) => sum + (food.calories || 0),
      0
    );

    res.json({ foods: result, totalCalories });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar el texto del alimento" });
  }
};
module.exports = { processText, processImage };
