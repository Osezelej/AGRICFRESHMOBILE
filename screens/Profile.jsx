import { TouchableWithoutFeedback, Keyboard,  } from "react-native";
import { memo } from "react";
function Profile({navigation}) {

    return<TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    </TouchableWithoutFeedback>
}
export default memo(Profile);
