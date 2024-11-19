export type CharacterInfo = {
  created: string,
  episoded: string[],
  gender: string,
  id: number,
  image: string,
  location: {
    name: string,
    url: string,
  },
  name: string,
  origin: {
    name: string,
    url: string
  },
  species: string,
  status: string,
  type: string,
  url: string
}
export type Status = "alive" | "dead" | "unknown" | null
export type Species = "human" | "humanoid" | null
export type FilteredParams = {
    name?: string
    status?: Status
    species?: Species
    page?: number
}