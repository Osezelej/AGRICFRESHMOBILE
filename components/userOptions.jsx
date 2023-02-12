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
        width:50,
        height:50
    }
})
function UserOption ({image, navigation, navigationLink}){
    const [active, setActive] = useState('white')
    let handlePress = useCallback(()=>{active == '#ffdb28'?setActive('white'):setActive('#ffdb28')})
    return <Pressable style={{
        padding:20,
        borderWidth:1,
        borderRadius:25,
        borderColor:'#C2C1C1',
        backgroundColor:active
    }} onPress={()=>(navigation.navigate(navigationLink))} onPressIn={handlePress} onPressOut={handlePress}>
            <Image source={image} style={styles.image}/>
    </Pressable>
}

export default memo(UserOption);