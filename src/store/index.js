import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../reducers/filters';

// middleWarare - рассширяет только возможности dispatch (это функция которая возвращает функцию которая в свою очередь возвращает ещё одну функцию)
const stringMiddlewara = (store) => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    })
  }
  return next(action)
};

// Создание store (с помощью Redux-toolkit)
const store = configureStore({
  // создаём наш разделённый на части редюсер
  reducer: {
    heroes,
    filters
  },
  // подключение всех встроенных middleware + наш собственный 
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddlewara),
  // включаем наш redux-devtools (если просто передадим true то наш девтулс будет работать и на этапе bilda поэтому лучше использовать конструкцию которая показана ниже!)
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;