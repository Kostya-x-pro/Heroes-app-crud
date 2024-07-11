import { createStore, combineReducers } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

// enhanser - это функция которая возвращает другую функцию и является усилителем "Store"
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
const store = createStore( combineReducers({heroes:heroes, filters}), enhancer);

export default store;


// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()