// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import {thunk as ReduxThunk} from 'redux-thunk';
import heroes from '../reducers/heroes';
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

  // Подключаем наш middleware (reduxThunk и наш самописный) НО! в RTK есть встроенные middleware!!! (который мы подключаем выше)
  // middleware: [ReduxThunk, stringMiddlewara],
})


// В функцию combinerReducers нужно передовать объект (ключ и значение которых наши разбитые на кусочки части функции reducer (heroes и filters в дилнной и короткой записи))
// Функция "compose" помогает сделать композицию функций (скомбинировать несколько функций в одну) 
// !!!В этой функции  важен порядок подключения enhancer-ов (если поменять enhancer и длинную строку window.__REDUX..... то работать не будет!!!)
// const store = createStore( 
//   combineReducers({heroes:heroes, filters}),
//   compose(
//       applyMiddleware(ReduxThunk, stringMiddlewara), 
//       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) 
// );


export default store;