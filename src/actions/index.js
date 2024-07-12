import { heroesFetched, heroesFetching, heroesFetchingError, heroDeleted } from "../components/heroesList/heroesSlice";

// Комплексный actionCreator (для того что бы если нам нужно получить персонажей в разных компонентах нам уже не нужно повторять этот функционал) когда мы подключили redux-thunk мы можем делать какие то побочные действия прямо в actions (расширить возможности наших actions действия других actions выполняются прямо в этом методе)
export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilterHeroes = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

export const fetchDeleteHeroes = (request, id) => (dispatch) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
    .then(dispatch(heroDeleted(id)))
    .catch(err => console.log(err));
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}


export const activeFilterChanged = (filter) => {
  return {
    type: 'ACTIVE_FILTER_CHANGED',
    payload: filter
  }
}
