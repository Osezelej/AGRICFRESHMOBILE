import {View, Text, StyleSheet, TouchableHighlight, Image, Pressable, TouchableOpacity} from 'react-native';
import { memo } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
const styles = StyleSheet.create({

logoImage:{
    width:100,
    height:100,
    position:'absolute',
    top:-50,
    left:-22
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


