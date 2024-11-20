import { View, Image } from "react-native"
import styles from "./Footer.styled"

const Footer = () => {
    return (
        <View style={styles.footerContainer}>
            <Image source={require('../../icons/rick-and-morty-big.png')} style={styles.footerImage} />
        </View>
    )
}

export default Footer
