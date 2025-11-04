import Link from "next/link";
import React from "react";

const meals = [
  {
    season: "Spring",
    emoji: "🌸",
    months: "March–May",
    items: [
      {
        title: "Spring Veggie & Egg Bowl (~850 cal)",
        foods: [
          "2 poached eggs (140)",
          "1 cup farro or barley (220)",
          "1 cup asparagus + peas + radishes (100)",
          "2 Tbsp goat cheese (70)",
          "2 Tbsp olive oil & lemon (240)",
          "1 slice sourdough (100)",
        ],
      },
      {
        title: "Salmon & Greens (~950 cal)",
        foods: [
          "5 oz baked salmon (280)",
          "1 cup roasted new potatoes (160)",
          "1 cup sautéed spinach (50)",
          "1 Tbsp butter (100)",
          "½ cup strawberries or rhubarb compote (100)",
          "1 cup quinoa (220)",
        ],
      },
    ],
  },
  {
    season: "Summer",
    emoji: "☀️",
    months: "June–August",
    items: [
      {
        title: "Tomato & Grain Salad (~850 cal)",
        foods: [
          "1 cup bulgur or couscous (220)",
          "1 cup cherry tomatoes + cucumbers + herbs (100)",
          "½ cup chickpeas (120)",
          "2 Tbsp feta (70)",
          "2 Tbsp olive oil (240)",
          "1 slice watermelon (100)",
        ],
      },
      {
        title: "Grilled Chicken & Corn (~950 cal)",
        foods: [
          "5 oz grilled chicken (200)",
          "2 ears grilled corn with lime & cotija (300)",
          "1 cup zucchini & bell peppers, sautéed (100)",
          "1 cup rice (200)",
          "1 nectarine or peach (150)",
        ],
      },
    ],
  },
  {
    season: "Autumn",
    emoji: "🍂",
    months: "Sept–Nov",
    items: [
      {
        title: "Harvest Grain Bowl (~850 cal)",
        foods: [
          "1 cup roasted butternut squash (100)",
          "1 cup wild rice (220)",
          "½ cup roasted beets (75)",
          "2 Tbsp pumpkin seeds (100)",
          "2 Tbsp olive oil (240)",
          "½ apple (60)",
          "1 boiled egg (80)",
        ],
      },
      {
        title: "Turkey & Root Veggies (~950 cal)",
        foods: [
          "5 oz roasted turkey breast (200)",
          "1 cup roasted sweet potato (180)",
          "1 cup roasted carrots & parsnips (120)",
          "1 cup farro (220)",
          "1 Tbsp cranberry sauce or cooked cranberries (50)",
          "1 Tbsp butter (100)",
        ],
      },
      {
        title: "Citrus Lentil Salad (~850 cal)",
        foods: [
          "1 cup lentils (230)",
          "1 cup roasted Brussels sprouts (100)",
          "1 blood orange or grapefruit segments (80)",
          "2 Tbsp walnuts (130)",
          "2 Tbsp olive oil (240)",
          "1 slice hearty rye bread (70)",
        ],
      },
      {
        title: "Hearty Stew & Grain (~950 cal)",
        foods: [
          "5 oz beef or lamb stew meat (250)",
          "1 cup carrots, celery, turnips, cabbage (100)",
          "1 cup barley (220)",
          "1 Tbsp olive oil (120)",
          "½ cup pomegranate seeds (70)",
          "1 slice whole grain bread with butter (190)",
        ],
      },
    ],
  },
];

export default function OverviewSeasonsPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-xl font-bold mb-6 text-blue-700"><Link href={"/blue-binder/seasonal-eating/autumn-1-claude"}>Autumn Variation 1 with Turkey Sando and Lentil Bowl</Link></div>
      <div className="text-xl font-bold mb-6 text-blue-800"><Link href={"/blue-binder/seasonal-eating/autumn-2-chatgpt"}>Autumn Variation 2 with Grain Bowl and Turkey Sweet Potato Skillet</Link></div>
			<h1 className="text-3xl font-bold mb-6">Seasonal Eating Meal Ideas</h1>
      {meals.map((season) => (
        <section key={season.season} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            <span className="mr-2">{season.emoji}</span>
            {season.season} <span className="text-base font-normal">({season.months})</span>
          </h2>
          {season.items.map((meal) => (
            <div key={meal.title} className="mb-4">
              <h3 className="text-lg font-medium mb-1">{meal.title}</h3>
              <ul className="list-disc ml-6">
                {meal.foods.map((food, i) => (
                  <li key={i}>{food}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
