import { Pressable, Image, View } from "react-native";
import {memo} from 'react';
function FootIcons({styles, image, handlePress}) {
    return <View style = {styles.footIcons}>
    {image.map((value, id)=>(id == 2 ? <Pressable key={id} style={(value.isactive )?styles.cartImageStyleActive:null} onPressIn = {()=>(handlePress(value))}>
                                            <Image source={value.image}  style={styles.cartImageStyle} />
                                        </Pressable> :
                                        <Pressable key={id} style={value.isactive?styles.cartImageStyleActive:null} onPressIn = {()=>(handlePress(value))}>
                                            <Image source={value.image}  style={styles.imageStyle} />
                                        </Pressable>

    ))}
</View>
}

export default memo(FootIcons);