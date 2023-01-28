import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
const styles = StyleSheet.create({
searchContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    margin:0,
   
},
titleSearch:{
    backgroundColor:'white',
    flex:6.5,
    paddingVertical:3,
    borderWidth:1.5,
    paddingHorizontal:3,
    borderRadius:30,
    borderColor:'green'

},

imageStyle:{
    width:20,
    height:20
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
    marginLeft:5
},
container:{
    width:'93%',
    position:"relative",
    right:25,
    marginVertical:5


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

})

export function SearchHeader({image}){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>MarketPlace</Text>
            <View style={styles.searchContainer}>
                <View style={styles.titleSearch}>
                    <TouchableHighlight >
                        <View style={styles.Search}>
                            <Image source={image[0]} style={styles.imageStyle}/>
                            <Text style={styles.searchText}>search items...</Text>
                        </View>
                        
                    </TouchableHighlight>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={image[1]} style={styles.imageStyle}/>
                </View>

            </View>

        </View>
        );
}