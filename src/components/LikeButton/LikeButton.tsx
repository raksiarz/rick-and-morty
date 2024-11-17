import { Text, Pressable, Image } from "react-native"
import { atom, useAtomValue, useSetAtom } from "jotai"
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
        star = require('../../icons/star-full.png')
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
    const setFavouritesIds = useSetAtom(favouritesIdsAtom)

    const onPress = () => {
        setFavouritesIds((likes) => likes.includes(id) ? likes = likes.filter(l => l !== id) : [...likes, id])
    }

    const text = inDetails ? 'add to liked' : 'like'

    return (
        <Pressable onPress={onPress} style={[styles.button, inDetails && styles.buttonInDetails]}>
            <Star inDetails={inDetails} id={id}/>
            <Text style={[styles.text, inDetails && styles.textInDetails]}>{ text }</Text>
        </Pressable>
    )
}

export default LikeButton
