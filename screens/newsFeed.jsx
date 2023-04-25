import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, Text } from "react-native";
import { memo } from "react";

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})
function NewsFeed({navigation}){
    return<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex:1}}>
        <View style={styles.body}>
            <Text>No notifications</Text>
        </View>
    </TouchableWithoutFeedback>
}

export default memo(NewsFeed);