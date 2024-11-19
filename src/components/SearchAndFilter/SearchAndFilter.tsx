import { View, Pressable, Image, TextInput, Text } from 'react-native'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { CharacterInfo, charactersAtom, fetchingAtom } from '../../stacks/CharacterList/screens/CharacterList/CharacterList.screen';
import { Species, Status } from '../../api';
import CheckBox from '../CheckBox/CheckBox';
import * as api from '../../api'
import styles from "./SearchAndFilter.styled";

const searchAtom = atom('')
const visibleAtom = atom(false)
const statusAtom = atom<Status[]>([])
const speciesAtom = atom<Species[]>([])

const Dropdown = () => {
  const [visible, setVisible] = useAtom(visibleAtom)
  const [status, setStatus] = useAtom(statusAtom)
  const [species, setSpecies] = useAtom(speciesAtom)
  const setFetching = useSetAtom(fetchingAtom)
  const setCharacters = useSetAtom(charactersAtom)

  const reset = () => {
    setStatus([])
    setSpecies([])
  }

  const apply = async () => {
    try {
      setFetching(true)
      setVisible(false)
      const resp = await api.getFiltered({status: status, species: species})
      const json = await resp.json()
      setCharacters(() => [
        ...json.results as CharacterInfo[]
      ])
    } catch (err) {
      console.log("there was error getting filtered items: ", err)
    } finally {
      setFetching(false)
    }
  }

  const onPressStatus = (s: Status) => {
    setStatus(prev => prev.includes(s) ? prev = prev.filter(p => p !== s) : [...prev, s])
  }

  const onPressSpecies = (s: Species) => {
    setSpecies(prev => prev.includes(s) ? prev = prev.filter(p => p !== s) : [...prev, s])
  }

  if(visible) {
    return (
      <View style={styles.dropdownContainer}>
        <View>
          <Text style={styles.dropdownContainerText}>status</Text>
          <View style={styles.optionsContainer}>
            <CheckBox text={'Alive'} isChecked={status.includes('alive')} onPress={() => onPressStatus('alive')} />
            <CheckBox text={'Dead'} isChecked={status.includes('dead')} onPress={() => onPressStatus('dead')} />
            <CheckBox text={'Unknown'} isChecked={status.includes('unknown')} onPress={() => onPressStatus('unknown')} />
          </View>
        </View>
        <View >
          <Text style={styles.dropdownContainerText}>species</Text>
          <View style={styles.optionsContainer}>
            <CheckBox text={'Human'} isChecked={species.includes('human')} onPress={() => onPressSpecies('human')} />
            <CheckBox text={'Humanoid'} isChecked={species.includes('humanoid')} onPress={() => onPressSpecies('humanoid')} />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Pressable style={[styles.dropdownButton, styles.resetButton]} onPress={reset}>
            <Text style={{ color: '#224229', textTransform: 'uppercase' }}>reset</Text>
          </Pressable>
          <Pressable style={[styles.dropdownButton, styles.applyButton]} onPress={apply}>
            <Text style={{ color: '#fff', textTransform: 'uppercase' }}>apply</Text>
          </Pressable>
        </View>
      </View>
    )
  }
}

const CharacterFilter = () => {
  const [visible, setVisible] = useAtom(visibleAtom)

  const chevronIcon = visible ? require('../../icons/chevron-up.png') : require('../../icons/chevron-down.png')

  return (
    <View>
      <Pressable
        onPress={() => setVisible((prev) => prev = !prev)}
        style={styles.filterButton}
      >
        <Text style={styles.filterText}>filter</Text>
        <Image source={chevronIcon} />
      </Pressable>
      <Dropdown />
    </View>
  )
}

const CharacterSearch = () => {
  const [search, setSearch] = useAtom(searchAtom)
  const setFetching = useSetAtom(fetchingAtom)
  const setCharacters = useSetAtom(charactersAtom)

  const onChange = (value: string) => {
    setSearch(value)
  }

  const onSubmit = async () => {
    try {
      setFetching(true)
      const resp = await api.getFiltered({name: search})
      const json = await resp.json()
      setCharacters(() => [
        ...json.results as CharacterInfo[]
      ])
    } catch (err) {
      console.log("there was error getting filtered items: ", err)
    } finally {
      setFetching(false)
    }
  }

  return (
    <View style={styles.inputContainer}>
      <Image source={require('../../icons/magnifying-glass.png')} style={styles.inputIcon} />
      <TextInput
        onSubmitEditing={onSubmit}
        onChangeText={onChange}
        value={search}
        style={styles.input}
        placeholder='Search the characters'
        textAlignVertical='center'
        placeholderTextColor={'#59695C'}
      />
    </View>
  )
}

const SearchAndFilter = () => {
    return (
        <View>
            <CharacterSearch />
            <CharacterFilter />
        </View>
    )
}

export default SearchAndFilter
