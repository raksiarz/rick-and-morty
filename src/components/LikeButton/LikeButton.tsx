import { Text, Pressable, Image } from "react-native"
import { atom, useAtomValue, useAtom } from "jotai"
import { styles } from './LikeButton.styled'

interface LikeButtonProps {
    inDetails?: boolean
    id: number
}

export const favouritesIdsAtom = atom<number[]>([])

const Star = ({ id, inDetails }: any) => {
    const favouritesIds = useAtomValue(favouritesIdsAtom)
    let star 

    if(favouritesIds.includes(id)) {
        star = require('../../icons/gold-star-full.png')
    } else if(inDetails) {
        star = require('../../icons/white-star-empty.png')
    } else {
        star = require('../../icons/dark-star-empty.png')
    }

    return (
        <Image source={star} style={styles.icon} />
    )
}

const LikeButton = ({ inDetails, id }: LikeButtonProps) => {
    const [favouritesIds, setFavouritesIds] = useAtom(favouritesIdsAtom)

    const onPress = () => {
        setFavouritesIds((likes) => likes.includes(id) ? likes = likes.filter(l => l !== id) : [...likes, id])
    }

    const text = inDetails && favouritesIds.includes(id) ? 'remove from Liked' : inDetails ? 'add to liked' : 'like'
    const likedInList = favouritesIds.includes(id) && !inDetails

    return (
        <Pressable onPress={onPress} style={[styles.button, likedInList && styles.likedButton, inDetails && styles.buttonInDetails]}>
            <Star inDetails={inDetails} id={id}/>
            <Text style={[styles.text, inDetails && styles.textInDetails]}>{ text }</Text>
        </Pressable>
    )
}

export default LikeButton
