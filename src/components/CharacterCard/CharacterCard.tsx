import { View, Text, Image } from 'react-native'
import { CharacterInfo } from '../../stacks/CharacterList/screens/CharacterList/CharacterList.screen';
import LikeButton from '../LikeButton/LikeButton';
import { styles } from './CharacterCard.styled';

interface CharacterCardProps {
  character: CharacterInfo
}

interface TextTagProps {
  title: string
  value: string
}

const TextTag = ({ title, value}: TextTagProps) => {
  return (
    <View style={styles.textTagContainer}>
      <Text style={styles.textTagTitle}>{ title }</Text>
      <Text style={styles.textTagValue}>{ value }</Text>
    </View>
  )
} 

const CharacterCard = ({ character }: CharacterCardProps) => {

  return (
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <TextTag title='name' value={character.name} />
          <TextTag title='status' value={character.status} />
          <TextTag title='species' value={character.species} />
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: character.image }} />
          <LikeButton id={character.id} />
        </View>
      </View>
  )
}

export default CharacterCard
