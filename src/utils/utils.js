export const baseURL = 'https://norma.nomoreparties.space/api';
export const titles = ['Булки', 'Соусы', 'Начинки'];
export const titlesEn = ['bun', 'sauce', 'main'];
export const FORGOT_PASSWORD_URL = '/forgot-password';

export const WRONG_EMAIL_TITLE = 'Некорректный E-mail';
export const ENTER_NAME_TITLE = 'Введите имя';
export const MAX_PASSWORD_LENGTH = 5;

export function filterIngredients(ingredients) {
  const buns = [];
  const mains = [];
  const sauces = [];

  ingredients.forEach(item => {
    switch (item.type) {
      case 'bun':
        buns.push(item);
        break;
      case 'main':
        mains.push(item);
        break;
      default:
        sauces.push(item);
        break;
    }
  });

  return [buns, sauces, mains];
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
  const ingredientsCost = ingredients.reduce((totalCost, currentItem) => {
    return totalCost + currentItem.price;
  }, 0);
  return ingredientsCost + (bun ? bun.price : 0);
}

export function getIngredientIds(bun, ingredients) {
  return [bun._id, ...ingredients.map(i => i._id)];
}

export function checkResponse(response) {
  if (!response.ok) {
    return Promise.reject(`Ошибка ${response.status}`);
  }
  return response.json();
}

export function validateEmail(email) {
  return String(email)
    .toLocaleLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function isEmailEmpty(email) {
  return email === '';
}

export function isPasswordEmpty(password) {
  return password === '';
}

export function isPasswordShort(password, minLength) {
  return password.length < minLength;
}
