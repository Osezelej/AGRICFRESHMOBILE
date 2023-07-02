import {View, Text, StyleSheet, TouchableHighlight, Image, Pressable, TouchableOpacity} from 'react-native';
import { memo, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { imageUrl } from '../data/database';
const styles = StyleSheet.create({

logoImage:{
    width:55,
    height:45,
    borderRadius:15,
    marginTop:10,
    

},
headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    alignItems:'center',
},
headerSettingImage:{
    width:23,
    height:23,
    marginLeft:15
},
headerSettingImageContainer:{
    flexDirection:'row',
    alignItems:'center'
},
searchSetting:{
    backgroundColor:'#c9c9c9',
    paddingHorizontal:6,
    padding:3,
    borderRadius:30
},
iconStyle:{
    fontWeight:'bold'
}
})

function SearchHeader({image, setState, logoImage, navigation, searchItem}){
    const [userImage, setUserImage ] = useState(null);
    async function getImageData(){
        await AsyncStorage.getItem('userData').then((data)=>{
            let res = JSON.parse(data)
            if(res.userImg != null){
                let image = imageUrl + res.userImg
            }

        })
    }

    return(
        <View style={styles.headerContainer}>
            <View>
                <Image source={logoImage} style={styles.logoImage}/>
            </View>
            <View style={styles.headerSettingImageContainer}>
                <Pressable style={styles.searchSetting} onPress={()=>{navigation.navigate('Search'); }} >
                    <MaterialIcons name="search" size={25} color="black" style={styles.iconStyle}/>
                </Pressable>
                <Pressable onPress={()=>{navigation.navigate('Filter')}}>
                    <Image source={image[1]} style={styles.headerSettingImage}/>
                </Pressable>
            </View>
        </View>
        );
}
export default memo(SearchHeader);


