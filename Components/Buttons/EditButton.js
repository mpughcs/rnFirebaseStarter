import PressableContainer from "../PressableContainer";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from "../../../constants/Colors";
import { View, StyleSheet } from "react-native";


export default function EditButton({ onPress, color, size }) {
    return (
        <PressableContainer style={styles.editEventIcon} onPress={onPress}>
            <MaterialCommunityIcons name="pencil-outline" size={size} color={color} />
            <View style={styles.circle}></View>
        </PressableContainer>
    );
}

const styles = StyleSheet.create({
    editEventIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .5,
        borderRadius: 50,
        borderColor: Colors.text,
        padding: 10,
        backgroundColor: 'white',
    }
});
