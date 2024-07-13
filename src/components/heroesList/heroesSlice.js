// createSlice - это аналог createReducer и createAction
// createAsyncThunk - это функционал для создания комплексных экшен креэйтеров в нутри среза
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
}

/* Аргумента createAsyncThunk:
    1. имя среза \ тип действия
    2. функция которая должна вернуть промис (Асинхронный кода) (функция которая внутри принимает 2 ещё аргумениа)
        2.1 - то что приходит при dispatch этого действия
        2.2 - API самого Thunk
*/
export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    // в нашем случаии аргументы не нужны (первым арг у нас авт. придёдет request, Thunk API (внутри него getState, dispatch и тд но они используются редко))
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes"); 
        // нам вернется 3 actionCreator (pending/ fulfield/ rejected) см. heroesSlice
    }
);

/* createSlice принимает в себя 4 аргумента:
  1. name - string
  2. intitialState - начальное состояние
  3. reducers - объект с обработчиками
  4. extraReducers - Объект который содержит редюсеры другого среза 
*/
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        // Эта часть больше  не нужна потому что она прописана в ExtraReducers !!!

        // heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        // heroesFetched: (state, action) => {
        //     state.heroesLoadingStatus = 'idle';
        //     state.heroes = action.payload;
        // },
        // heroesFetchingError: state => {
        //     state.heroesLoadingStatus = 'error';
        // },
        heroCreated: (state, action) => {
            state.heroes.push(action.payload);
        },
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error';})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;



