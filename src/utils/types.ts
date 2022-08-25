export interface IIngredient {
  _id: string;
  uniqueId?: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  count: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface IOrder {
  number: number;
  name: string;
}

export interface IUser {
  name: string;
  email: string;
}

interface ISyncStore {
  isLoading: boolean;
}

interface IAuthStore {
  user: IUser;
  message: string;
}

interface IIngredientsStore {
  ingredients: IIngredient[];
  selectedBun: IIngredient;
  selectedIngredients: IIngredient[];
  detailedIngredient: IIngredient;
  error: string;
}
interface IOrderStore {
  order: IOrder;
  error: string;
}

export interface IMainStore {
  async: ISyncStore;
  auth: IAuthStore;
  ingredients: IIngredientsStore;
  order: IOrderStore;
}
