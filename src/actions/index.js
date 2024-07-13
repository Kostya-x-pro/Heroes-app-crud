import {heroDeleted } from "../components/heroesList/heroesSlice";
import {filtersFetching, filtersFetched, filtersFetchingError} from "../components/heroesFilters/filtersSlice";

// Комплексный actionCreator (для того что бы если нам нужно получить персонажей в разных компонентах нам уже не нужно повторять этот функционал) когда мы подключили redux-thunk мы можем делать какие то побочные действия прямо в actions (расширить возможности наших actions действия других actions выполняются прямо в этом методе)

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
