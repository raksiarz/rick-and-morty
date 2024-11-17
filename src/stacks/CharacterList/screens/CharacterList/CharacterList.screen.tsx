import React, { useEffect } from 'react';
import { View, Button, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import {CharacterListStackNavigationProp} from '../../CharacterList.routes';
import * as api from '../../../../fetch';
import {styles} from './CharacterList.styled';

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

interface CharacterCardProps {
  character: CharacterInfo
}

const charactersAtom = atom<CharacterInfo[]>([])
export const selectedCharacterAtom = atom<number>()
const searchAtom = atom('')

const CharacterCard = ({ character }: CharacterCardProps) => {
  const setSelectedCharacter = useSetAtom(selectedCharacterAtom)

  const {navigate} = useNavigation<CharacterListStackNavigationProp>();
  return (
    <TouchableOpacity
      onPress={(): void => {
        setSelectedCharacter(character.id)
        navigate('CharacterDetailsStack', {
          screen: 'CharacterDetailsScreen',
        });
      }}
    >
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Text>Name {character.name}</Text>
          <Text>Status {character.status}</Text>
          <Text>Species {character.species}</Text>
        </View>
        <Image style={styles.image} source={{ uri: character.image }} />
      </View>
    </TouchableOpacity>
  )
}

const CharactersList = () => {
  const characters = useAtomValue(charactersAtom)

  return (
    <ScrollView style={styles.listContainer}>
      {characters.map(el => (
        <CharacterCard key={el.id} character={el} />
      ))}
    </ScrollView>
  )
}

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
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
      <CharacterSearch />
      <CharactersList />
    </View>
  );
};

export default CharacterListScreen;
