import { View, Pressable, Text, Image } from 'react-native'
import styles from './CheckBox.styled'

interface CheckBoxProps {
    text: string
    isChecked: boolean
    onPress(): void 
}

const CheckBox = ({text, isChecked, onPress}: CheckBoxProps) => {

    return (
        <Pressable onPress={onPress} style={styles.checkboxContainer}>
            <View style={[styles.tickBox, isChecked && styles.tickBoxChecked]}>
                { isChecked && <Image style={styles.tickLogo} source={require('../../icons/tick-mark.png')}/> }
            </View>
            <Text style={styles.checkboxText}>{text}</Text>
        </Pressable>
    )
}

export default CheckBox
