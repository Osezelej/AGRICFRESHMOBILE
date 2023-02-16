import { memo } from "react";
import { View, ScrollView, Image, StyleSheet, Text, Pressable } from "react-native";
const styles = StyleSheet.create({
    image:{
        width:'98%',
        height:247,
        aspectRatio:3/2.2,
        
    },
    imageContainer:{
        backgroundColor:'white',
        paddingHorizontal:10,
    },
    header:{
        color:'black',
        fontSize:27,
        fontWeight:'800',
    },
    TextContainer:{
        paddingHorizontal:20,
        elevation:5,
        backgroundColor:'white',
        justifyContent:"center",
       paddingBottom:20
        
    },
    body:{
        backgroundColor:'white',
        flex:1,
        
    },
    container:{
        flex:1
    },
    smallImage:{
        width:50,
        height:45,
    },
    smallImageContainer:{
        padding:5,
        borderRadius:10,
        borderWidth:2,
        borderColor:'green',
        width:'19%'
    },
    buyContainer:{
        backgroundColor:'#ffdb28',
        padding:10,
        paddingHorizontal:19,
        borderRadius:10,
        elevation:5,
        marginVertical:5,
        marginRight:20,
    },
    buyText:{
        fontSize:17,
        fontWeight:'800',
    },
    contentPrice:{
        color:'red',
        fontSize:17,
        fontWeight:'900',
        marginRight:20,
    },
    buyPriceContainer:{
        alignItems:'flex-end',

    },
    description:{
        fontSize:13.5,
        textAlign:'justify'
    },
    descriptionContainer:{
        paddingVertical:20,
        paddingHorizontal:10,
    },
    smallImageBuyPriceContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        paddingLeft:10,
    },
    contentHeader:{
        paddingHorizontal:20,
        paddingVertical:5,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',

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
    bottomText:{
        color:'#2d69be',
        textAlign:'center',
        fontWeight:'bold',
        fontStyle:'italic',
        fontSize:15,
        
    },
    bottomTextContainer:{
        position:'absolute',
        bottom: 15,
        alignSelf:'center'
    }

})
function Description ({route}){
    const {image, price, farmName, rating} = route.params;
   
    return<View style={styles.container}>
        <View style={styles.headerContainer}>
                    <View style={styles.TextContainer}>
                        <Text style = {styles.header}>Description</Text>
                    </View>
        </View>
        <Pressable name='contentHeaderPress'>
            <View style={styles.contentHeader}>
                <View style={styles.farmIconContainer}></View>
                <View style={styles.contentTitleRating}>
                    <View >
                        <Text style ={styles.farmTitle}>{farmName} | </Text>
                        <Text>.Sponsored</Text>
                    </View>
                    <View style={styles.contentRatingContainer}>
                        <Text style={styles.contentRating}>{rating}.0</Text>
                    </View>
                </View>
            </View>                                                                
        </Pressable>
        <ScrollView style={styles.body}>
            <View style={styles.imageContainer}>
                <Image source={{uri:image}} style={styles.image}/>
                
            </View>
            <View style={styles.smallImageBuyPriceContainer}>
                <View style={styles.smallImageContainer}>
                        <Image source={{uri:image}} style={styles.smallImage}/>
                </View>
                <View style={styles.buyPriceContainer}>
                    <Text style={styles.contentPrice}>{price}.00</Text>
                    <Pressable>
                        <View style={styles.buyContainer}>
                        
                            <Text style={styles.buyText}> Buy </Text>
                        </View>
                    </Pressable>
                </View>
                
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>This is a little Description about my product please buy it and enjoy your life thanks i really appreciate thank you very much.This is a little Description about my product please buy it and enjoy your life thanks i really appreciate thank you very much.This is a little Description about</Text>
            </View>
        </ScrollView>
        <Pressable style={styles.bottomTextContainer}>
                <Text style={styles.bottomText}>See more from {farmName}?</Text>
             </Pressable>
    </View>
}


export default memo(Description);
