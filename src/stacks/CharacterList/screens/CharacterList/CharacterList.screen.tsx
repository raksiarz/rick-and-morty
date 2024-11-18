import React, { useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, Pressable } from 'react-native';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import {useNavigation} from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { CharacterListStackNavigationProp } from '../../CharacterList.routes';
import CharacterCard from '../../../../components/CharacterCard/CharacterCard';
import PaginationButtons, { paginationAtom } from '../../../../components/PaginationButtons/PaginationButtons';
import {styles} from './CharacterList.styled';
import * as api from '../../../../api';

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

export const selectedCharacterAtom = atom<number>()
const charactersAtom = atom<CharacterInfo[]>([])
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

const Card = ({ item }: {item: CharacterInfo}) => {
  const setSelectedCharacter = useSetAtom(selectedCharacterAtom)

  const {navigate} = useNavigation<CharacterListStackNavigationProp>();
  return (
    <TouchableOpacity
      key={item.id}
      onPress={(): void => {
        setSelectedCharacter(item.id)
        navigate('CharacterDetailsStack', {
          screen: 'CharacterDetailsScreen',
        });
      }}
    >
      <CharacterCard key={item.id} character={item} />
    </TouchableOpacity>
  )
}

const renderCard = ({ item }: {item: CharacterInfo}) => {
  return (
    <Card item={item} />
  )
}

const CharactersList = () => {
  const charactersInfo = useAtomValue(charactersAtom)
  return (
    <FlatList
      data={charactersInfo}
      renderItem={renderCard}
      keyExtractor={item => '' + item.id}
    />
  )
}

const CharacterListScreen = () => {
  const setCharacters = useSetAtom(charactersAtom)
  const pagination = useAtomValue(paginationAtom)
  const isFocused = useIsFocused()
  
  useEffect(() => {
    async function getCharacters() {
      try {
        const resp = await api.getAll(pagination)
        const json = await resp.json()
        setCharacters(() => [
          ...json.results as CharacterInfo[]
        ])
      } catch(err) {
        console.log('There was error getting all characters: ', err)
      }
    }
    getCharacters()
  }, [isFocused, pagination])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
      <CharacterSearch />
      <CharactersList />
      <PaginationButtons />
    </View>
  );
};

export default CharacterListScreen;
