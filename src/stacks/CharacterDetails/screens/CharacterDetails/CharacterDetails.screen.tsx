import React, { useEffect } from 'react';
import {Text, View, Image } from 'react-native';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { CharacterInfo, selectedCharacterAtom } from '../../../CharacterList/screens/CharacterList/CharacterList.screen';
import LikeButton from '../../../../components/LikeButton/LikeButton';
import * as api from '../../../../fetch';
import {styles} from './CharacterDetails.styled';

const characterInfoAtom = atom<CharacterInfo>({} as CharacterInfo)

const isEmptyAtom = atom((get) => {
  const info = get(characterInfoAtom)
  return !Object.keys(info).length
})

const CharacterCard = () => {
  const characterInfo = useAtomValue(characterInfoAtom)

  return (
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: characterInfo.image }} />
        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTitle}>name</Text>
            <Text style={styles.name}>{characterInfo.name}</Text>
          </View>
          <View>
            <Text>status</Text>
            <Text>{characterInfo.status}</Text>
          </View>
          <View>
            <Text>origin</Text>
            <Text>{characterInfo.origin.name}</Text>
          </View>
          <View>
            <Text>species</Text>
            <Text>{characterInfo.species}</Text>
          </View>
          <View>
            <Text>gender</Text>
            <Text>{characterInfo.gender}</Text>
          </View>
        </View>
        <LikeButton inDetails id={characterInfo.id} />
      </View>
  )
}

const Comp = () => {
  const isEmpty = useAtomValue(isEmptyAtom)

  if(isEmpty) {
    return <Text>Loading...</Text>
  }

  return (
    <CharacterCard />
  )
}

const CharacterDetailsScreen = () => {
  const setCharacterInfo = useSetAtom(characterInfoAtom)
  const selectedCharacter = useAtomValue(selectedCharacterAtom)

  useEffect(() => {
    async function getCharacter() {
      try {
        const resp = await api.getCharacterInfo(selectedCharacter)
        const json = await resp.json()
        setCharacterInfo(json)
      } catch(err) {
        console.log('There was error getting all characters: ', err)
      }
    }
    getCharacter()
  }, [])

  return (
    <View style={styles.container}>
      <Comp />
    </View>
  );
};

export default CharacterDetailsScreen;
