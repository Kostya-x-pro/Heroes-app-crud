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

export const heroesHandleDelete = (heroes, heroId) => {
    return {
        type: 'HEROES_DELETE',
        payload: heroes.filter(item => item.id !== heroId)
    }
}

export const heroHandleAdded = (newHero) => {
    return {
        type: 'HERO_ADDED',
        payload: newHero
    }
}