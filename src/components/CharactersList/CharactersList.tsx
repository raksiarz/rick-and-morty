import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useSetAtom, useAtomValue } from "jotai";
import {useNavigation} from '@react-navigation/native';
import { CharacterListStackNavigationProp } from '../../stacks/CharacterList/CharacterList.routes'; 
import { CharacterInfo } from '../../stacks/CharacterList/screens/CharacterList/CharacterList.screen';
import LikeButton from '../LikeButton/LikeButton';
import { styles } from './CharactersList.styled';
import { selectedCharacterAtom } from '../../stacks/CharacterList/screens/CharacterList/CharacterList.screen';

interface CharactersListProps {
    charactersList: CharacterInfo[]
}

interface CharacterCardProps {
  character: CharacterInfo
}

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
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: character.image }} />
          <LikeButton id={character.id} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const CharactersList = ({ charactersList }: CharactersListProps) => {
  return (
    <ScrollView style={styles.listContainer}>
      {charactersList.map(el => (
        <CharacterCard key={el.id} character={el} />
      ))}
    </ScrollView>
  )
}

export default CharactersList
