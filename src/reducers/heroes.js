import { createReducer } from "@reduxjs/toolkit"
// Экшены импортированы для того что бы не повторять по нескольку раз "строку экшенов"
import { 
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
 } from "../actions"

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
}

// создание редюсера встроенным методом в RTK
const heroes = createReducer(initialState, builder => {
    // builder - это функция которая конструирует редюсер
    builder
        // метод addCase принимает 2 аргумента (экшен, и стейт(который можно писать не соблюдая принципа имутабельности) т.е не нужно получать старый стейт и что то возвращать return с функции createReducer сделает всё внутри сам.)
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroCreated, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addDefaultCase(() => {});
})

// оригинальный reduser 
// const heroes = (state = initialState, action) => {
//   switch (action.type) {
//       case 'HEROES_FETCHING':
//           return {
//               ...state,
//               heroesLoadingStatus: 'loading'
//           }
//       case 'HEROES_FETCHED':
//           return {
//               ...state,
//               heroes: action.payload,
//               heroesLoadingStatus: 'idle'
//           }
//       case 'HEROES_FETCHING_ERROR':
//           return {
//               ...state,
//               heroesLoadingStatus: 'error'
//           }
//       case 'HERO_CREATED':
//           return {
//               ...state,
//               heroes: [...state.heroes, action.payload]
//           }
//       case 'HERO_DELETED': 
//           return {
//               ...state,
//               heroes: state.heroes.filter(item => item.id !== action.payload)
//           }
//       default: return state
//   }
// }

export default heroes;