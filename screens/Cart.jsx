import { TouchableWithoutFeedback, Keyboard, View } from "react-native"
import { memo } from "react"

function Cart({navigation}){
    return<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>

        </View>
    </TouchableWithoutFeedback>
}

export default memo(Cart);