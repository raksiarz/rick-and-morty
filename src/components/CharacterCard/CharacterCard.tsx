import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { CharacterInfo } from '../../stacks/CharacterList/screens/CharacterList/CharacterList.screen';
import LikeButton from '../LikeButton/LikeButton';
import { styles } from './CharacterCard.styled';

interface CharacterCardProps {
  character: CharacterInfo
}

const CharacterCard = ({ character }: CharacterCardProps) => {

  return (
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
  )
}

export default CharacterCard
