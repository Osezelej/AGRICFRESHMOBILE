import {View, FlatList, Text, StyleSheet, Animated, BackHandler, Alert} from 'react-native';
import {ActivityIndicator} from '@react-native-material/core'
import {memo, useState, useRef, useEffect} from 'react';
import MarketItems from '../components/marketItems';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white'
    },
    alertbody:{
        backgroundColor:'#4f9d5c',
        position:'absolute',
        flex:1,
        width:'100%',
        padding:5,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center'
    },
    alertText:{
        color:'white',
        fontSize:18,
        fontWeight:'700',
        marginLeft:10,
    },
    contentContainer:{
        backgroundColor:'white',
        marginVertical:3,
        paddingVertical:10,
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
    contentImage:{
        width:23, 
        height:23,
    },
    contentimagescontainer:{
        display:'flex',
        flexDirection:'row',

    },
    contentImagecontainer:{
        flexDirection:'row',
        marginHorizontal:10,
        alignItems:'center',
    },
    imageText:{
        marginLeft:10,
        fontSize:14,
        fontWeight:'600'
    },
    buyContainer:{
        backgroundColor:'#ffaf28',
        padding:7,
        paddingHorizontal:19,
        borderRadius:10,
        elevation:5,
        marginVertical:5,
        paddingVertical:10,

    },
    likeCommentBuy:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:22,
    },
    buyText:{
        fontSize:17,
        fontWeight:'800',
    },
    contentImageStyle:{
        width:'100%',
        height:200,
        aspectRatio:3/2,
        objectFit:'Fill'
        },
})

function Search({
    activeIndicator, 
    searchData, 
    contentImages, 
    navigation,
    cartData,
    setSearchWord
}){
    
    let currentData = useRef(new Animated.Value(0)).current
    const [itemName, setItemName] = useState('');
    const [email, setEmail] = useState('');
    
let buyClicked = async (item_name)=>{

    setItemName(item_name)
    Animated.sequence([
    Animated.timing(currentData, {
        toValue:1,   
        duration: 5,
       useNativeDriver: true,
    }),
    Animated.timing(currentData, {
        toValue:1,   
        duration: 1000,
       useNativeDriver: true,
    }),
    Animated.timing(currentData, {
        toValue:0,   
        duration: 500,
       useNativeDriver: true,
    }),
]).start()
}
    async function getEmail(){
        await AsyncStorage.getItem('userEmail').then((data)=>{
            setEmail(JSON.parse(data).email)
        })
    }

    useEffect(()=>{
        getEmail()
    }, [])
    return<View style={styles.body}>
        {activeIndicator && <ActivityIndicator color='#ffaf28' size={'large'}/>}
        <FlatList
            data = {searchData}
            renderItem={({item})=><MarketItems 
                                        styles={styles} 
                                        item = {item}  
                                        contentImages = {contentImages} 
                                        navigation = {navigation} 
                                        handlePress={buyClicked}
                                        cartData={cartData}
                                        email={email}
                                        />
            }
            ListEmptyComponent={<View style={{
                flexDirection:'row', 
                justifyContent:'center'
                }}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'400'
                     }}>
                    No available data.
                </Text>
            </View>}
        />
         <Animated.View style={[styles.alertbody, {opacity:currentData}]}>
                                        <Ionicons name="checkmark-sharp" size={24} color="white" />
                                        <Text style={styles.alertText}>{itemName} have been added to cart!!</Text>
                                    </Animated.View>

    </View>
}

export default memo(Search);

