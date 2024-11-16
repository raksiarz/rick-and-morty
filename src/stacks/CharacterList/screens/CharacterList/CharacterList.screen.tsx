import React, { useEffect } from 'react';
import { View, Button, Text, FlatList, TextInput } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import {CharacterListStackNavigationProp} from '../../CharacterList.routes';
import { getAll, getfiltered } from '../../../../fetch';
import {styles} from './CharacterList.styled';

type CharacterInfo = {
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

const CharactersList = () => {
  const characters = useAtomValue(charactersAtom)

  return (
    <>
      {characters.map(el => (
        <Text key={el.id}>{ el.name }</Text>
      ))}
    </>
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
      const resp = await getfiltered(search)
      const json = await resp.json()
      setCharacters(() => [
        ...json.results as CharacterInfo[]
      ])
    } catch (err) {
      console.log("there was error gettin filtered items: ", err)
    }
  }

  return (
    <TextInput onSubmitEditing={onSubmit} onChangeText={onChange} value={search} style={styles.input}/>
  )
}

const CharacterListScreen = () => {
  const setCharacters = useSetAtom(charactersAtom)
  const setSelectedCharacter = useSetAtom(selectedCharacterAtom)
  
  useEffect(() => {
    async function getCharacters() {
      try {
        const resp = await getAll()
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

  const {navigate} = useNavigation<CharacterListStackNavigationProp>();
  return (
    <View style={styles.container}>
      <Text>Characters</Text>
      <CharacterSearch />
      <CharactersList />
      <Button
        title="Navigate to Details screen"
        onPress={(): void => {
          setSelectedCharacter(1)
          navigate('CharacterDetailsStack', {
            screen: 'CharacterDetailsScreen',
          });
        }}
      />
    </View>
  );
};

export default CharacterListScreen;
