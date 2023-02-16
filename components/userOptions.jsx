import { View, StyleSheet, Image, Pressable } from "react-native";
import { memo, useCallback, useState } from "react";

const styles = StyleSheet.create({
    imageContainer:{
        padding:20,
        borderWidth:1,
        borderRadius:25,
        borderColor:'#C2C1C1',
    },
    image:{
        width:40,
        height:40
    }
})
function UserOption ({image, navigation, navigationLink}){
    const [active, setActive] = useState('white')
    let handlePress = useCallback(()=>{active == '#ffdb28'?setActive('white'):setActive('#ffdb28')})
    return <Pressable style={{
        padding:10,
        borderWidth:1,
        borderRadius:15,
        borderColor:'#C2C1C1',
        backgroundColor:active,
        marginHorizontal:20,
        marginVertical:10     
    }} onPress={()=>(navigation.navigate(navigationLink))} onPressIn={handlePress} onPressOut={handlePress}>
            <Image source={image} style={styles.image}/>
    </Pressable>
}


export default memo(UserOption);
