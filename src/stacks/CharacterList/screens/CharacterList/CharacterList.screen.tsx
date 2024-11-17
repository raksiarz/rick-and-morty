import React, { useEffect } from 'react';
import { View, Button, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as api from '../../../../fetch';
import {styles} from './CharacterList.styled';
import CharactersList from '../../../../components/CharactersList/CharactersList';

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

const charactersAtom = atom<CharacterInfo[]>([])
export const selectedCharacterAtom = atom<number>()
const searchAtom = atom('')


const CharacterSearch = () => {
  const [search, setSearch] = useAtom(searchAtom)
  const setCharacters = useSetAtom(charactersAtom)

  const onChange = (value: string) => {
    setSearch(value)
  }

  const onSubmit = async () => {
    try {
      const resp = await api.getfiltered(search)
      const json = await resp.json()
      setCharacters(() => [
        ...json.results as CharacterInfo[]
      ])
    } catch (err) {
      console.log("there was error gettin filtered items: ", err)
    }
  }

  return (
    <View style={styles.inputContainer}>
      <Image source={require('../../../../icons/magnifying-glass.png')} style={styles.inputIcon} />
      <TextInput
        onSubmitEditing={onSubmit}
        onChangeText={onChange}
        value={search}
        style={styles.input}
        placeholder='Search the characters'
      />
    </View>
  )
}

const Comp = () => {
  const charactersInfo = useAtomValue(charactersAtom)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
      <CharacterSearch />
      <CharactersList charactersList={charactersInfo} />
    </View>
  )
}

const CharacterListScreen = () => {
  const setCharacters = useSetAtom(charactersAtom)
  
  useEffect(() => {
    async function getCharacters() {
      try {
        const resp = await api.getAll()
        const json = await resp.json()
        setCharacters(() => [
          ...json.results as CharacterInfo[]
        ])
      } catch(err) {
        console.log('There was error getting all characters: ', err)
      }
    }
    getCharacters()
  }, [])

  return (
    <Comp />
  );
};

export default CharacterListScreen;
