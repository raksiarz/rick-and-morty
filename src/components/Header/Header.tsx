import { View, Image } from 'react-native'
import styles from './Header.styled'

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Image style={styles.logo} source={require('../../icons/rick-and-morty-small.png')} />
        </View>
    )
}

export default Header
