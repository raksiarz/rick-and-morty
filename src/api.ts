import { FilteredParams } from "./types"

function api(route: string) {
    return fetch(`https://rickandmortyapi.com/api/${route}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
}

export function getFiltered({name, status, species, page}: FilteredParams) {
    const params = []

    if(name) {
        params.push(`name=${name}`)
    }
    if(status) {
        params.push(`status=${status}`)
    }
    if(species) {
        params.push(`species=${species}`)
    }
    if(page) {
        params.push(`page=${page}`)
    }

    return api(`character/?${params.join('&')}`)
}

export function getCharacterInfo(id: number | number[] | undefined) {
    if(typeof id === 'number') {
        return api(`character/${'' + id}`)
    }
    return api(`character/${id?.join(',')}`)
}
