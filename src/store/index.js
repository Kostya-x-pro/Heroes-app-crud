import { createStore, combineReducers } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';
// В функцию combinerReducers нужно передовать объект (ключ и значение которых наши разбитые на кусочки части функции reducer (heroes и filters в дилнной и короткой записи))
const store = createStore( combineReducers({heroes:heroes, filters}),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;