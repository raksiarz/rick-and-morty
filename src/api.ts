type FetchMethod = "POST" | "GET"
type Status = "alive" | "dead" | "unknown"
type Species = "human" | "humanoid"

function api(route: string, method: FetchMethod) {
    return fetch(`https://rickandmortyapi.com/api/${route}`, {
        method,
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
    return api(`character/?page=${'' + pagination}`, 'GET')
}

export function getfiltered(name?: string, status?: Status, species?: Species, ) {
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

    console.log('fetch: ', `?${params.join('&')}`)

    return api(`character/?${params.join('&')}`, 'GET')
}

export function getCharacterInfo(id: number | number[] | undefined) {
    if(typeof id === 'number') {
        return api(`character/${'' + id}`, 'GET')
    }

    return api(`character/${id?.join(',')}`, "GET")
}
