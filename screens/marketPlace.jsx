import { TouchableWithoutFeedback, Keyboard, View, StyleSheet,Text, ScrollView, FlatList, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from 'react';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { dataApi } from "../data/data";
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
        width:28,
        height:28,
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
        aspectRatio:3/2
    }
    
})



export function MarketPlace({navigation, images, contentImages}){
   
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
let d = true;
function handleChange(item) {
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

    
 
}
useEffect(()=>{if (d) {
    d = false;
    setNames('MarketPlace ');
}else{
    d = true;
    setNames('MarketPlace')
}}, [names])

function handlePress (val){
    
    // setActiveIcon((p)=>(p?setActiveIcon(false):setActiveIcon(false)))
    
    image.forEach(element => {
        if (element.image == val.image){
            element.isactive = true;
            setNames('MarketPlace ');
        }else{
            element.isactive = false;
            setNames('MarketPlace');
        }
        setImage(image)
        
    });

}

    return<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.TextContainer}>
                        <Text style = {styles.header}>{names}</Text>
                    </View>
                    <View style={styles.optionHeader}>
                        <FlatList 
                            data={options}
                            horizontal={true}
                            renderItem ={(item)=>(<TouchableOpacity style={styles.background} onPressIn={()=>{handleChange(item)}}>
                                                        
                                                        <View style = {{ backgroundColor: item.item.isActive ? active:'white',
                                                                         paddingVertical:3,
                                                                         paddingHorizontal:15,
                                                                         borderRadius:30,
                                                                         elevation:10
                                                                        }}>
                                                        <Text style={styles.option}>{item.item.option}</Text>
                                                        </View>
                                                    </TouchableOpacity> )}   
                            keyExtractor={items => items.id}
                            showVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View style = {styles.body}>
                    <FlatList
                        data={dataApi}
                        keyExtractor={items=>items.id}
                        refreshing={true}
                        renderItem ={({item})=>(
                   <View style={styles.contentContainer}>
                        <Pressable name='contentHeaderPress'>
                            <View style={styles.contentHeader}>
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
                        <Pressable name='contentImagePress'>
                            <View style={styles.contentImageContainer}>
                                <Image source={{uri:item.Image}} style={styles.contentImageStyle}/>
                            </View>
                        </Pressable>
                        <View style={styles.contentNamePrice}>
                            <Text style={styles.contentName}>{item.Name}</Text>
                            <Text style={styles.contentPrice}>{item.Price}.00</Text>
                        </View>
                        <View style={styles.likeCommentBuy}>
                            <View style={styles.contentimagescontainer}>
                                <View style={styles.contentImagecontainer}>
                                    <Image source={contentImages[0]} style={styles.contentImage}/>
                                    <Text style={styles.imageText}>Like</Text>
                                </View>
                                <View style={styles.contentImagecontainer}>
                                    <Image source={contentImages[2]} style={styles.contentImage}/>
                                    <Text style={styles.imageText}>comment</Text>
                                </View>
                            </View>
                            <View style={styles.buyContainer}>
                                <Text style={styles.buyText}> Buy </Text>
                            </View>
                        </View>
                   </View>
                   )}
                    />
                </View>
                <View style = {styles.footIcons}>
                    {image.map((value, id)=>(id == 2 ? <Pressable key={id} style={(value.isactive )?styles.cartImageStyleActive:null} onPressIn = {()=>(handlePress(value))}>
                                                            <Image source={value.image}  style={styles.cartImageStyle} />
                                                        </Pressable> :
                                                        <Pressable key={id} style={value.isactive?styles.cartImageStyleActive:null} onPressIn = {()=>(handlePress(value))}>
                                                            <Image source={value.image}  style={styles.imageStyle} />
                                                        </Pressable>

                    ))}
                </View>

            </View> 

        </TouchableWithoutFeedback>
    
}

