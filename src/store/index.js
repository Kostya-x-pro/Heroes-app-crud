import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api/apiSlice';

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
    filters,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  // подключение всех встроенных middleware + наш собственный 
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddlewara, apiSlice.middleware),
  // включаем наш redux-devtools (если просто передадим true то наш девтулс будет работать и на этапе bilda поэтому лучше использовать конструкцию которая показана ниже!)
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;