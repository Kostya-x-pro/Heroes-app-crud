import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {thunk as ReduxThunk} from 'redux-thunk';
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

// В функцию combinerReducers нужно передовать объект (ключ и значение которых наши разбитые на кусочки части функции reducer (heroes и filters в дилнной и короткой записи))
// Функция "compose" помогает сделать композицию функций (скомбинировать несколько функций в одну) 
// !!!В этой функции  важен порядок подключения enhancer-ов (если поменять enhancer и длинную строку window.__REDUX..... то работать не будет!!!)
const store = createStore( 
  combineReducers({heroes:heroes, filters}),
  compose(
      applyMiddleware(ReduxThunk, stringMiddlewara), 
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) 
);

export default store;