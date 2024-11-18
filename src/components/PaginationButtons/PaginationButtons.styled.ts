import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    paginationContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },
    paginationButton: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#224229',
    },
    text: {
        color: '#fff'
    }
})

export default styles
