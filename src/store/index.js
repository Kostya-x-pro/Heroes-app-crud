import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
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

// Enhancer — это функция, которая принимает создание хранилища как аргумент и возвращает новую функцию создания хранилища с расширенными возможностями. (он может расширять любую часть Store)
const enhancer = (createStore) => (...args) => {
  const store = createStore(...args);

  const oldDispatch = store.dispatch;
  store.dispatch = (action) => {
    if (typeof action === 'string') {
      return oldDispatch({
        type: action
      })
    }
    return oldDispatch(action)
  }

  return store;
}

// В функцию combinerReducers нужно передовать объект (ключ и значение которых наши разбитые на кусочки части функции reducer (heroes и filters в дилнной и короткой записи))
// Функция "compose" помогает сделать композицию функций (скомбинировать несколько функций в одну) 
// !!!В этой функции  важен порядок подключения enhancer-ов (если поменять enhancer и длинную строку window.__REDUX..... то работать не будет!!!)
const store = createStore( 
  combineReducers({heroes:heroes, filters}),
  compose(
      applyMiddleware(stringMiddlewara), 
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) 
  // compose(
  //   enhancer,
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);

export default store;