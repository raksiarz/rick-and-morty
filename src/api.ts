export type Status = "alive" | "dead" | "unknown"
export type Species = "human" | "humanoid"
type FilteredParams = {
    name?: string
    status?: Status[]
    species?: Species[]
    id?: number | number[] | undefined
    page?: number
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

export function getFiltered({name, status, species, id, page}: FilteredParams) {
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
    if(page) {
        params.push(`page=${page}`)
    }

    return api(`character/${ids}/?${params.join('&')}`)
}
