import { TouchableWithoutFeedback, Keyboard, View, StyleSheet,Text, ScrollView, FlatList, TouchableOpacity, Image, Animated } from "react-native";
import { useState, useEffect,useCallback, useRef } from 'react';
import { dataApi } from "../data/data";
import MarketItems from "../components/marketItems";
import OptionHeader from "../components/optionHeader";

const styles = StyleSheet.create({
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
        backgroundColor:'#ffdb28',
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
        marginVertical:5,
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
        backgroundColor:'#ffdb28',
        padding:10,
        paddingHorizontal:19,
        borderRadius:10,
        elevation:5,
        marginVertical:5

    },
    likeCommentBuy:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:29,
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
        backgroundColor:'#ffab4b',
        position:'absolute',
        flex:1,
        width:'100%',
        padding:5,
        alignItems:'center'
    },
    alertText:{
        color:'white',
        fontSize:16,
    }
    
})


export default function MarketPlace({navigation, images, contentImages, Modal, state, setState, manageCart}){
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
}
])
const [names, setNames] = useState('MarketPlace')
const [active, setActive] = useState('#ffdb28')
const [image, setImage] = useState(images)
const [itemName, setItemName] = useState('')
let d = true;
let handleChange = useCallback((item)=>{
    let item_id = item.item.id;
    options.map((value)=>{
       if(value.id == item_id){
        value.isActive = true;
        
       }else{
        value.isActive = false
       }
    });
    setoptions(options)
    if (d) {
        d = false;
        setNames('MarketPlace ');
    }else{
        d = true;
        setNames('MarketPlace')
    }
})
    
useEffect(()=>{if (d) {
    d = false;
    setNames('MarketPlace ');
}else{
    d = true;
    setNames('MarketPlace')
}}, [names])

let buyClicked = useCallback((item_name)=>{
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
})
    return<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.TextContainer}>
                        <Text style = {styles.header}>{names}</Text>
                    </View>
                    <View style={styles.optionHeader}>
                        <OptionHeader styles={styles} handleChange={handleChange} options={options} active={active}/>
                    </View>
                </View>
                <View style = {styles.body}>
                    <FlatList
                        data={dataApi}
                        keyExtractor={items=>items.id}
                        refreshing={true}
                        renderItem ={({item})=>(<MarketItems 
                        styles={styles} 
                        item = {item}  
                        contentImages = {contentImages} 
                        navigation = {navigation} 
                        handlePress={buyClicked}
                        manageCart={manageCart}
                        />)}
                    />
                    
                    <Animated.View style={[styles.alertbody, {opacity:currentData}]}>
                        <Text style={styles.alertText}>{itemName} have been added to cart!!</Text>
                    </Animated.View>
                </View>
                <Modal 
                    styles={styles}
                    state={state}
                    setState={setState}
                    starImage = {contentImages[1]}

                />
            </View> 


        </TouchableWithoutFeedback>
    
}


