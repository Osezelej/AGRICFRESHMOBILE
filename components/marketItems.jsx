import {memo, useState, useCallback, useEffect, } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { ActivityIndicator, Avatar } from '@react-native-material/core';
import axios from 'axios';

let FavouritesData = [];
function removeFavContent (id){
    console.log(id)
    FavouritesData = FavouritesData.filter((value)=>(value.id != id))
}
function MarketItems({
    styles, 
    item, 
    contentImages, 
    navigation, 
    handlePress, 
    cartData,
    from,
    email,

} ) {
    
    const [activeActivity, setActiveActivity] = useState(false)
    const [favImage, setFavImage] = useState(false);
    
    useEffect(()=>{
        if (item.isFav){
        setFavImage(true)
    }
}, [])
    

    async function addToFav(){
        await axios.get(`https://4v6gzz-3001.csb.app/v1/updateUserFav/${email}`, {
                    params:{
                        productId:item.id,
                        task:'add'
                    }
            })
            .then((res)=>{
                console.log(res.data)

            })
            .catch((err)=>{
                console.log(err)
            })
    }

    async function removeFromFav(){
        await axios.get(`https://4v6gzz-3001.csb.app/v1/updateUserFav/${email}`, {
                    params:{
                        productId:item.id,
                        task:'remove'
                    }
            })
            .then((res)=>{
                console.log(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    function handlePressFavAdd(){
        setFavImage(true);
        addToFav();
    }
    function handlePressFavRemove(){
        setFavImage(false);
        removeFromFav();
    }

    async function handleEvent(){
        setActiveActivity(true);
        setTimeout(()=>{
            cartData(item)
        .then(()=>{
           
                handlePress(item.Name)
                .then(()=>{
                    setTimeout(()=>{
                        setActiveActivity(false);
                    }, 500)
                })
         
        })
        }, 300)
        
    }

    return(<View style={styles.contentContainer}>
        <Pressable name='contentHeaderPress'>
            <View style={styles.contentHeader}>
            
                 
                        <Avatar label={item.farmName} autoColor style={{marginRight:10}}/>
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
        <Pressable name='contentImagePress' onPress={()=>navigation.navigate('Description', {image:item.Image, price:item.Price, farmName:item.farmName, rating:item.rating})}>
            <View style={styles.contentImageContainer}>
                <Image source={{uri:item.Image}} style={styles.contentImageStyle}/>
            </View>
        </Pressable>
        <View style={styles.contentNamePrice}>
            <Text style={styles.contentName}>{item.Name}</Text>
            <Text style={styles.contentPrice}>{item.Price}.00</Text>
        </View>
        <Pressable style={[styles.likeCommentBuy, {marginLeft:15}]} >
        
            <View style={styles.contentimagescontainer}>
            {from != 'favourite' && ( favImage ? <Pressable style={styles.contentImagecontainer} onPress={handlePressFavRemove}>
                        <Image source={contentImages[1]} style={styles.contentImage}/>
                    <Text style={styles.imageText}>Like</Text>
                </Pressable>:<Pressable style={styles.contentImagecontainer} onPress={handlePressFavAdd}>
                        <Image source={contentImages[0]} style={styles.contentImage}/>
                    <Text style={styles.imageText}>Like</Text>
                </Pressable>)}
                
                <Pressable style={styles.contentImagecontainer} onPress={()=>{
                    navigation.navigate('Comment')
                }}>
                    <Image source={contentImages[2]} style={styles.contentImage}/>
                    <Text style={styles.imageText}>Negotiate</Text>
                </Pressable>
            </View>
            <Pressable style={[styles.buyContainer, {flexDirection:'row', alignItems:'center'}]} onPress={()=>{
                
                // handleCartName();
                handleEvent()
               }
                }
                >
                <Text style={styles.buyText}> Buy </Text>

                {activeActivity && <ActivityIndicator size={'small'} color='black'/>}

            </Pressable>
        </Pressable>
   </View>)
    
}

export default memo(MarketItems);

export {FavouritesData, removeFavContent};