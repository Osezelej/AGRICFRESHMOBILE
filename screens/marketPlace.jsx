import { TouchableWithoutFeedback, Keyboard, View, StyleSheet,Text, ScrollView, FlatList, TouchableOpacity, Image, Animated, useColorScheme,  } from "react-native";
import { useState, useEffect,useCallback, useRef, memo,  } from 'react';
import MarketItems, {  FavouritesData } from "../components/marketItems";
import OptionHeader from "../components/optionHeader";
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from "@react-native-material/core";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";



export const styles = StyleSheet.create({
    body:{
        flex:1,

    },
    footIcons:{
        flexDirection:'row',
        paddingVertical:10,
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'white',
        elevation:10,
        borderTopRadius:10,
        marginHorizontal:2,
        

    },
    container:{
        flex:1,
    },
    TextContainer:{
        height:60,
        paddingHorizontal:20,
        elevation:5,
        backgroundColor:'white',
        justifyContent:"center",
    },
    headerContainer:{
        

    },  
    header:{
        color:'black',
        fontSize:27,
        fontWeight:'800',
    },
    optionHeader:{
        paddingHorizontal:10,
        paddingVertical:0,
        backgroundColor:'white'
    
    },
    background:{
        marginHorizontal:9,
        marginBottom:10,
        paddingVertical:5
    },

    optionContainer:{
        backgroundColor:'white',
        paddingVertical:3,
        paddingHorizontal:15,
        borderRadius:30,
        elevation:10

    },
    activeOptionContainer:{
        backgroundColor:'#ffaf36',
        paddingVertical:3,
        paddingHorizontal:15,
        borderRadius:30,
        elevation:10,
        
    },
    imageStyle:{
        width:22,
        height:22
    },
    cartImageStyle:{
        height:40,
        width:40
    },
    cartImageStyleActive:{
        display:'flex',
        borderColor:'green',
        borderWidth:1.5,
        borderRadius:7,
        width: 50,
        height:50,
        justifyContent:'center',
        alignItems:'center'
        
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
        backgroundColor:'#ffaf36',
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
        backgroundColor:'#ffaf36',
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
    modalcontainer:{
        flex:1,
        backgroundColor:'#29292988',

    },
    modalbody:{
        position:'absolute',
        bottom:0,
        backgroundColor:'white',
        width:'100%',
        paddingVertical:20,
        borderRadius:10,
        paddingHorizontal:15

    },
    modaltitle:{
        fontSize:22,
        fontWeight:'bold'
        
    }, 
    modalheader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center"
    },
    line:{
        height:2.2,
        width:'90%',
        backgroundColor:'#d0d0d088',
        marginVertical:10,
        borderRadius:4,
        alignSelf:'center'
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
    }
    
})


                
export default function MarketPlace({
    navigation,
    images, 
    contentImages,
    handleCartName, 
    cartData, 
    email,
    handleActivity,
    marketData,
    setMarketData, 
    d,
    setD,
    filteredData,


}){
    navigation.canGoBack(false)
   
    
let currentData = useRef(new Animated.Value(0)).current
const [options, setoptions] = useState([{
    id:1,
    option:'All',
    isActive:true,
},
{
    id:2,
    option:'Poultry',
    isActive:false,
},
{
    id:3,
    option:'Beef',
    isActive:false,
},
{
    id:4,
    option:'Pork',
    isActive:false,
},
{
    id:5,
    option:'Diary',
    isActive:false,

},
{
    id:6,
    option:'Eggs',
    isActive:false,
},
{
    id:7,
    option:'Fish',
    isActive:false,
}, 
{
    id:8,
    option:'vegetable',
    isActive:false
},
{
    id:9,
    option:'Fruit',
    isActive:false
}
]);

const [dataApi, setDataApi] = useState('');
const [names, setNames] = useState('MarketPlace');
const [active, setActive] = useState('#ffdb28');
const [image, setImage] = useState(images);
const [itemName, setItemName] = useState('');
const [optionSelected, setOptionSelected] = useState('')


let handleChange = useCallback((item)=>{

    setD(true)
    let item_id = item.id;
    setoptions((prev)=>{
        console.log(prev);
        for (let n of prev){
            if (item_id != n.id){
                n.isActive = false;
            }else{
                n.isActive = true;
                setOptionSelected(n.option)
            }
        }
        return[...prev]
    })
}, )

let handleOptionData = async(text)=>{
    let data ;
    await axios.put(`https://4v6gzz-3001.csb.app/v1/search/${email}/${text}`)
    .then((res)=>{
        data = res.data
    })
    .catch((err)=>{
        console.log(err)
    })

    return data
}

useEffect(()=>{

    if (d){
        setMarketData([])
        if(optionSelected.toLowerCase() == 'all'){
            fetchData(email)
            .then((data)=>{
                setMarketData(data);
            })
        }else{
            handleOptionData(optionSelected.toLowerCase())
            .then((data)=>{
                setMarketData(data)
            })
        }
       
    }
   
}, [options])

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

async function fetchData (email){
    let data;
    await axios.get(`https://4v6gzz-3001.csb.app/v1/marketData/${email}`)
    .then((res)=>{
        if(res.status ==  200){
            data = res.data
        }
    })
    .catch(e=>console.log(e))

    return data

}

useEffect(()=>{
    console.log('market')
    if(filteredData.length == 0){
        
        if(marketData.length == 0 ){
            console.log(marketData)
            fetchData(email) 
            .then((data)=>{
                setMarketData(data);
                setDataApi(data)
            })
        }
    }else{
        console.log(filteredData)
        setMarketData(filteredData)
    }
}, [filteredData])



     return<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.TextContainer}>
                        <Text style = {styles.header}>{names}</Text>
                    </View>
                    <View style={styles.optionHeader}>
                        <OptionHeader styles={styles} handleChange={handleChange} options={options} active={active} d = {d}/>
                    </View>
                </View>
                {  marketData.length > 0 ? <View style = {[styles.body, {flex:1}]}>
                                    <FlatList
                                        data={marketData}
                                        keyExtractor={items=>items.id}
                                        ListEmptyComponent = {<View style={{flex:1,
                                        backgroundColor:'white',
                                        flexDirection: 'row',
                                        justifyContent:'center',
                                        alignItems:'center', 
                                        }}>
                                            <Text>
                                                No product from {optionSelected}
                                            </Text>
                                        </View>}
                                        renderItem ={({item})=>(<MarketItems 
                                                styles={styles} 
                                                item = {item}  
                                                contentImages = {contentImages} 
                                                navigation = {navigation} 
                                                handlePress={buyClicked}
                                                cartData={cartData}
                                                email={email}
                                                />)}
                                        style={{flex:1}}
                                    />
                    
                                    <Animated.View style={[styles.alertbody, {opacity:currentData}]}>
                                        <Ionicons name="checkmark-sharp" size={24} color="white" />
                                        <Text style={styles.alertText}>{itemName} have been added to cart!!</Text>
                                    </Animated.View>
                    </View>: <View style = {[styles.body, {flex:1, backgroundColor:'white', alignItems:"center", justifyContent:'center'}]}>
                                <ActivityIndicator size={'large'} color="#ffaf28"/> 
                    </View>
                    }
            </View>


        </TouchableWithoutFeedback>
    
}
