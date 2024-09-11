import { categories } from "./categories";
import { events } from "./event";

export const services = {
  [events.reducerPath]: events.reducer,
  [categories.reducerPath]: categories.reducer,
};

export const rtkMiddlewares = [events.middleware, categories.middleware];
