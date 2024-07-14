import { 
    createSlice, 
    createAsyncThunk,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filterAdapter = createEntityAdapter();

const initialState = filterAdapter.getInitialState({
    // filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
})

export const fetchFilterHeroes = createAsyncThunk(
    'filters/fetchFilters',
    // без async / await потому что они прописанны в useHttp (но если оставить как в heroes Slice то хуже от этого не станет.)
     () => {
        const {request} = useHttp();
        return  request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    }, 
    extraReducers: builder => {
        builder
            .addCase(fetchFilterHeroes.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilterHeroes.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filterAdapter.setAll(state, action.payload);
                
            })
            .addCase(fetchFilterHeroes.rejected, state => {
                state.filtersLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;

export const {selectAll} = filterAdapter.getSelectors(state => state.filters); 

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;