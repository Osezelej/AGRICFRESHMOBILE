import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { memo, useCallback } from "react";
import { removeFavContent } from "./marketItems";

const styles = StyleSheet.create({
    body:{
        backgroundColor:'white',
        flex:1,
        marginBottom:5

},
    contentHeader:{
        paddingHorizontal:20,
        paddingVertical:5,
        flexDirection:'row',
        alignItems:'center',
    },
    farmIconContainer:{
        width:50,
        height:50,
        backgroundColor:'#ffdb28',
        borderRadius:40,
        marginRight:25,
    },
    farmTitle:{
        fontSize:17,
        fontWeight:'800',
    },
    contentImageContainer:{
        height:210,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'

    },
    contentTitleRating:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        width:'42%'

    },
    contentRating:{
        fontSize:16,
        fontWeight:'800',
        color:'white',
        
    },
    contentRatingContainer:{
        backgroundColor:'#ff3838b0',
        padding:2,
        borderRadius:5,
    },
    
    contentImageStyle:{
        width:'100%',
        height:200,
        aspectRatio:3/2,
        objectFit:'Fill'
        },
        contentNamePrice:{
            flexDirection:'row',
            justifyContent:'space-between',
            paddingVertical:5,
            borderBottomColor:'#d4d4d477',
            borderBottomWidth:1,
            marginHorizontal:25,
        },
        contentName:{
            fontSize:17,
            fontWeight:'700',
    
        },
        contentPrice:{
            color:'red',
            fontSize:17,
            fontWeight:'900',
        },
        contentimagescontainer:{
            display:'flex',
            flexDirection:'row',
    
        },
        contentBottom:{
            flexDirection:'row',
            justifyContent:'center',
            paddingVertical:5
        },
        text:{
            fontSize:14,
            fontWeight:'600',
            color:'#2d69be',
        }
})
function FavMarketitem ({item, changeTitle}){
    let handlePress = useCallback((id)=>{removeFavContent(id); changeTitle();})

    return <View style={styles.body}>
     <Pressable name='contentHeaderPress' onLongPress={()=>handlePress(item.id)}>
            <View style={styles.contentHeader} >
                <View style={styles.farmIconContainer}></View>
                <View style={styles.contentTitleRating}>
                    <View >
                        <Text style ={styles.farmTitle}>{item.farmName} | </Text>
                        <Text>.Sponsored</Text>
                    </View>
                    <View style={styles.contentRatingContainer}>
                        <Text style={styles.contentRating}>{item.rating}.0</Text>
                    </View>
                </View>
            </View>                                                                
        </Pressable>
        <View name='contentImagePress' onPress={()=>console.log("im Pressed")}>
            <View style={styles.contentImageContainer}>
                <Image source={{uri:item.Image}} style={styles.contentImageStyle}/>
            </View>
        </View>
        <View style={styles.contentNamePrice}>
            <Text style={styles.contentName}>{item.Name}</Text>
            <Text style={styles.contentPrice}>{item.Price}.00</Text>
        </View>
        <View style={styles.contentBottom}>
            <Text style={styles.text}>See More from {item.farmName}</Text>
        </View>
    </View>
}

export default memo(FavMarketitem)
