// Комплексный actionCreator (для того что бы если нам нужно получить персонажей в разных компонентах нам уже не нужно повторять этот функционал) когда мы подключили redux-thunk мы можем делать какие то побочные действия прямо в actions (расширить возможности наших actions действия других actions выполняются прямо в этом методе)
export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
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

// Поскольку мы подключили middleWare теперь в actions мы можем передовать не только объекты но и функции (поэтому наша функция может быть расширена) Этот функционал позволяет нам сделать то что наши фильтры персонажей будут срабатывать через 1 секунду
// export const activeFilterChanged = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'ACTIVE_FILTER_CHANGED',
//             payload: filter
//         })
//     }, 1000)
// }

export const activeFilterChanged = (filter) => {
  return {
    type: 'ACTIVE_FILTER_CHANGED',
    payload: filter
  }
}

export const heroCreated = (hero) => {
    return {
        type: 'HERO_CREATED',
        payload: hero
    }
}

export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id
    }
}