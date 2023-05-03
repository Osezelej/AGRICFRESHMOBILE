import { Pressable, StyleSheet, View, Text, Image } from "react-native";
import { memo } from "react";
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from "@react-native-material/core";

const styles = StyleSheet.create({
    cardBody:{
        borderWidth:1,
        marginRight: 10,
        borderRadius:10,
        borderColor:'#ffdb28',
        width:270,
        marginTop:15,
        paddingVertical:5,
        

    },
    contentContainer:{
        backgroundColor:'white',
        marginVertical:5,
    },
    contentHeader:{
        paddingHorizontal:10,
        paddingVertical:5,
        flexDirection:'row',
        alignItems:'center',
    },
    farmIconContainer:{
        width:35,
        height:35,
        backgroundColor:'#ffdb28',
        borderRadius:40,
        marginRight:20,
    },
    farmTitle:{
        fontSize:14,
        fontWeight:'800',
    },
    contentTitleRating:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',


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
    image:{
        aspectRatio:1.9,
        width:200
    },
    contentImage:{
        alignItems:'center'

    },
    namePrice:{
        marginHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    
    contentName:{
        fontSize:15,
        fontWeight:'700',

    },
    contentPrice:{
        color:'red',
        fontSize:14,
        fontWeight:'900',
    },
    discount:{
        flexDirection:'row',
        marginRight:10
    },
    priceDiscount:{
        flexDirection:'row-reverse',
        alignItems:'center'
    },
    contentDiscount:{
        color:'#239102',
        fontSize:15,
        fontWeight:'900'
    }
})

function marketCard({item}){
    return<Pressable style={styles.cardBody}>
        <View style={styles.contentHeader}>
                <Avatar autoColor label={item.farmName} size={40} style = {{marginRight:10}}/>
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
            <View style={styles.contentImage}>
                <Image  source={{uri:item.Image}} style={styles.image}/>
            </View> 
            <View style={styles.namePrice}>
                <Text style={styles.contentName}>{item.Name}</Text>
                <View style={styles.priceDiscount}>
                    <Text style={styles.contentPrice}>{item.Price}.00</Text>
                    <View style={styles.discount}>
                        <AntDesign name="caretdown" size={15} color="#44ff0b" />
                        <Text style={styles.contentDiscount}>15%</Text>
                    </View>
                </View>
            </View> 
                               
    </Pressable>
}

export default memo(marketCard)