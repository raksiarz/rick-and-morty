import { View, Pressable, Text, Image } from 'react-native'
import { atom, useAtom } from 'jotai'
import styles from './CheckBox.styled'

interface CheckBoxProps {
    value: string
    text: string
}

const checkedAtom = atom(false)

const CheckBox = ({value, text}: CheckBoxProps) => {
    const [checked, setChecked] = useAtom(checkedAtom)

    const onPress = () => {
        setChecked(prev => prev = !prev)
    }

    return (
        <Pressable onPress={onPress} style={styles.checkboxContainer}>
            <View style={[styles.tickBox, checked && styles.tickBoxChecked]}>
                { checked && <Image source={require('../../icons/tick-mark.png')}/> }
            </View>
            <Text style={styles.checkboxText}>{text}</Text>
        </Pressable>
    )
}

export default CheckBox
