type FetchMethod = "POST" | "GET"
type Status = "alive" | "dead" | "unknown"
type Gender = "male" | "female" | "genderless" | "unknown"

function api(route: string, method: FetchMethod) {
    return fetch(`https://rickandmortyapi.com/api/${route}`, {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
}

export function getAll() {
    return api('character', 'GET')
}

export function getfiltered(name: string, status?: Status, species?: string, type?: string, gender?: Gender) {
    let url =  `character/?name=${name}`
    if(status) {
        url += `&status=${status}`
    }
    if(species) {
        url += `&species=${species}`
    }
    if(type) {
        url += `&type=${type}`
    }
    if(gender) {
        url += `&gender=${gender}`
    }
    return api(url, 'GET')
}

export function getCharacterInfo(id: number | undefined) {
    return api(`character/${'' + id}`, 'GET')
}
