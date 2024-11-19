import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    checkboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    tickBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 16,
        height: 16,
        padding: 2,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#DAE4DC'
    },
    tickBoxChecked: {
        backgroundColor: '#162C1B'
    },
    checkboxText: {
        fontSize: 16,
        color: '#162C1B'
    }
})

export default styles
