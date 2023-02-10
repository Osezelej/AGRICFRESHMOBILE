import {View, Text, StyleSheet, TouchableHighlight, Image, Pressable} from 'react-native';
import { memo } from 'react';
const styles = StyleSheet.create({
searchContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    width:'100%',
    margin:0,
    alignItems:'center'
   
},
titleSearch:{
    backgroundColor:'white',
    flex:3,
    paddingVertical:3,
    borderWidth:1.5,
    paddingHorizontal:7,
    borderRadius:30,
    borderColor:'green',
    height:30,
    width:'100%'
    

},

imageStyle:{
    width:25,
    height:25
},

searchText:{
    fontSize:16,
    color:'#aaaaaa',
    marginLeft:20,
},

Search:{
    display:'flex',
    flexDirection:'row',
    flex:1,
    elevation:4,
    
}, 
imageContainer:{
    backgroundColor:'white',
    flex:1,
    alignItems:'flex-end',
    justifyContent:'center',
},
container:{
paddingHorizontal:10,
marginHorizontal:10,
width:'100%'
},
title:{
    textAlign:'center',
    marginBottom:10,
    fontSize:20,
    fontWeight:'800',
    position:'absolute',
    top:0,
    zIndex:2,display:'none'
    
}, 
image:{
    width: 110,
    height:90
}

})

function SearchHeader({image, setState, logoImage}){
    return(
        <View style={styles.container}>
            

            <View style={styles.searchContainer}>
                <View style={styles.imageContainer}>
                    <Image source={logoImage} style={styles.image}/>
                </View>
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