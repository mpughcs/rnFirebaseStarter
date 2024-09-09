import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'
import { StyleSheet, View } from 'react-native'
import { Platform } from 'react-native'
import Colors from '../../../constants/Colors'


export default function CircledBackButton(props) {
  const navigation = useNavigation()

  return (
    <HeaderBackButton
      {...props}
      style={styles.HeaderBackButton}
      onPress={() => {
        if (props.canGoBack) {
          navigation.goBack()
        }
      }}
    >
    </HeaderBackButton>
  )
}

const styles = StyleSheet.create({
  HeaderBackButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 50,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  }


})