import {View, Text, StyleSheet, TouchableHighlight, Image, Pressable} from 'react-native';
import { memo } from 'react';
const styles = StyleSheet.create({
imageStyle:{
    width:20,
    height:20,

},
Search:{
    flexDirection:'row',
    width:'100%'
},
titleSearch:{
    borderColor:'green',
    borderWidth:1.5,
    paddingVertical:3,
    paddingHorizontal:7,
    width:'60%',
    marginRight:30,
    borderRadius:15
},
searchContainer:{
    flexDirection:'row',
},
container:{
    width:'100%',

}

})

function SearchHeader({image, setState}){
    return(
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.titleSearch}>
                    <TouchableHighlight  >
                        <View style={styles.Search}>
                            <Image source={image[0]} style={styles.imageStyle}/>
                            <Text style={styles.searchText}>search items...</Text>
                        </View>
                        
                    </TouchableHighlight>
                </View>
                    <Pressable style={styles.imageContainer} onPressIn={()=>{setState()}}>
                        <Image source={image[1]} style={styles.imageStyle}/>
                    </Pressable>
            </View>

        </View>
        );
}
export default memo(SearchHeader);