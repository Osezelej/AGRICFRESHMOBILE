import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, Text } from "react-native";
import { memo, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

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
    const isfocused = useIsFocused();
    useEffect(()=>{
        console.log(isfocused)
    }, [isfocused])
    return<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex:1}}>
        <View style={styles.body}>
            <Text>No notifications</Text>
        </View>
    </TouchableWithoutFeedback> 
}

export default memo(NewsFeed);