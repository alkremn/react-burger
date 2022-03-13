export const baseURL = 'https://norma.nomoreparties.space/api';
export const titles = ['Булки', 'Соусы', 'Начинки'];
export const titlesEn = ['buns', 'sauces', 'mains'];

export function filterIngredients(ingredients) {
  const buns = [];
  const mains = [];
  const sauces = [];

  ingredients.forEach(i => {
    switch (i.type) {
      case 'bun':
        buns.push(i);
        break;
      case 'main':
        mains.push(i);
        break;
      default:
        sauces.push(i);
        break;
    }
  });

  return { buns, mains, sauces };
}

export function getRandomIntredients(ingredients) {
  const unique_indexes = new Set();
  const count = Math.random() * 3 + 1;

  while (unique_indexes.size < count) {
    const idx = Math.floor(Math.random() * ingredients.length);
    unique_indexes.add(idx);
  }

  const result = [];
  for (let idx of unique_indexes) {
    result.push(ingredients[idx]);
  }

  return result;
}

export function calculateTotalCost(bun, ingredients) {
  const bunCost = bun.price;
  const ingredientsCost = ingredients.reduce((totalCost, currentItem) => {
    return totalCost + currentItem.price;
  }, 0);

  return (bunCost + ingredientsCost).toLocaleString('en-US');
}

export function getIngredientIds(bun, ingredients) {
  return [bun._id, ...ingredients.map(i => i._id)];
}
