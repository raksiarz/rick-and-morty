export type Status = "alive" | "dead" | "unknown"
export type Species = "human" | "humanoid"
type FilteredParams = {
    name?: string
    status?: Status[]
    species?: Species[]
    id?: number | number[] | undefined
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

export function getFiltered({name, status, species, id}: FilteredParams) {
    const params = []
    let ids = ''
    if(typeof id === 'number') {
        ids = `${'' + id}`
    } else if(!!id?.length){
        ids = `${id.join(',')}`
    }

    if(name) {
        params.push(`name=${name}`)
    }
    if(status) {
        params.push(`status=${status}`)
    }
    if(species) {
        params.push(`species=${species}`)
    }

    return api(`character/${ids}/?${params.join('&')}`)
}
