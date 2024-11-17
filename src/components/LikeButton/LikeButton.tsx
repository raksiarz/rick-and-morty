import { Text, Pressable } from "react-native"
import { atom, useSetAtom } from "jotai"
import { styles } from './LikeButton.styled'

interface LikeButtonProps {
    inDetails?: boolean
    id: number
}

export const likesAtom = atom<number[]>([])

const LikeButton = ({ inDetails, id }: LikeButtonProps) => {
    const setLike = useSetAtom(likesAtom)

    const onPress = () => {
        console.log('liked')
        setLike((likes) => [
            ...likes,
            id
        ])
    }

    return (
        <Pressable onPress={onPress} style={[styles.button, inDetails && styles.inDetails]}>
            <Text style={styles.buttonText}>like</Text>
        </Pressable>
    )
}

export default LikeButton
