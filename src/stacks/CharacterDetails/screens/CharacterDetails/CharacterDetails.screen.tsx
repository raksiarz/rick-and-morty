import React, { useEffect } from 'react';
import {Text, View, Image } from 'react-native';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { CharacterInfo, selectedCharacterAtom } from '../../../CharacterList/screens/CharacterList/CharacterList.screen';
import LikeButton from '../../../../components/LikeButton/LikeButton';
import * as api from '../../../../api';
import {styles} from './CharacterDetails.styled';

interface TextTagProps {
  title: string
  value: string
}

export const characterInfoAtom = atom<CharacterInfo>({} as CharacterInfo)

const isEmptyAtom = atom((get) => {
  const info = get(characterInfoAtom)
  return !Object.keys(info).length
})

const TextTag = ({title, value}: TextTagProps) => {
  return (
    <View style={styles.textTagContainer}>
      <Text style={styles.textTagTitle}>{title}</Text>
      <Text style={styles.textTagValue}>{value}</Text>
    </View>
  )
}

const CharacterCard = () => {
  const characterInfo = useAtomValue(characterInfoAtom)

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: characterInfo.image }} />
      <View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTitle}>name</Text>
          <Text style={styles.name}>{characterInfo.name}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <TextTag title={'status'} value={characterInfo.status} />
          <TextTag title={'origin'} value={characterInfo.origin.name} />
          <TextTag title={'species'} value={characterInfo.species} />
          <TextTag title={'gender'} value={characterInfo.gender} />
        </View>
      </View>
      <LikeButton inDetails id={characterInfo.id} />
    </View>
  )
}

const Comp = () => {
  const isEmpty = useAtomValue(isEmptyAtom)

  if (isEmpty) {
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
        const resp = await api.getFiltered({id: selectedCharacter})
        const json = await resp.json()
        setCharacterInfo(json)
      } catch (err) {
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
