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

export interface IOrder {
  _id: string;
  number: number;
  name?: string;
  ingredients: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderIngredient {
  ingredient: IIngredient;
  count?: number;
}

export interface IOrderData {
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export interface IUser {
  name: string;
  email: string;
  accessToken?: string;
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

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}
