export type Status = Array<"alive" | "dead" | "unknown">
export type Species = Array<"human" | "humanoid">
type FilteredParams = {
    name?: string,
    status?: Status,
    species?: Species
}

function api(route: string) {
    return fetch(`https://rickandmortyapi.com/api/${route}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
}

export function getAll(pagination: number) {
    if(pagination < 1) {
        pagination = 1
    }
    return api(`character/?page=${'' + pagination}`)
}

export function getFiltered({name, status, species}: FilteredParams) {
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

    return api(`character/?${params.join('&')}`)
}

export function getCharacterInfo(id: number | number[] | undefined) {
    if(typeof id === 'number') {
        return api(`character/${'' + id}`)
    }

    return api(`character/${id?.join(',')}`)
}
