import { memo } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white',
    },
    TextContainer:{
        height:60,
        paddingHorizontal:20,
        elevation:5,
        backgroundColor:'white',
        justifyContent:"center",
    },
    header:{
        color:'black',
        fontSize:29,
        fontWeight:'800',
    },
});

function Order (){
    return <View style = {styles.body}>
                <View style={styles.TextContainer}>
                    <Text style = {styles.header}>Order</Text>
                </View>
    </View>
}
export default memo(Order)