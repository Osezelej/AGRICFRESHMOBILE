import { TouchableWithoutFeedback, Keyboard, View, StyleSheet } from "react-native"
import { memo } from "react";
const styles = StyleSheet.create({
    header:{
        color:'black',
        fontSize:27,
        fontWeight:'800',
    },
    headerContainer:{

    },
    TextContainer:{
        height:60,
        paddingHorizontal:20,
        elevation:5,
        backgroundColor:'white',
        justifyContent:"center",
    },
})

function Cart({navigation}){
    return<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                    <View style={styles.TextContainer}>
                        <Text style = {styles.header}>Cart</Text>
                    </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
}

export default memo(Cart);