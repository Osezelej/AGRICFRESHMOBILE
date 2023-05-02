import {memo, useState, useCallback, } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Avatar } from '@react-native-material/core';

let FavouritesData = [];
function removeFavContent (id){
    console.log(id)
    FavouritesData = FavouritesData.filter((value)=>(value.id != id))
}
function MarketItems({styles, item, contentImages, navigation, handlePress, handleCartName, cartData} ) {
    
    const [favImage, setFavImage] = useState({image:contentImages[0], valid:false});
    
    const handlePressFav = useCallback(()=>{
    
       setFavImage((prev)=>{
            if (prev.valid){
               FavouritesData = FavouritesData.filter((value)=>{
                    
                    return value.id != item.id})
                return{image:contentImages[0], valid:false}
            }else{
                FavouritesData.push(item)
            return { valid:true, image:contentImages[1]}
            }
            
       },[favImage])

    });

    
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
        <View style={styles.likeCommentBuy}>
            <View style={styles.contentimagescontainer}>
                <Pressable style={styles.contentImagecontainer} onPress={handlePressFav}>
                        <Image source={favImage.image} style={styles.contentImage}/>
                    <Text style={styles.imageText}>Like</Text>
                </Pressable>
                <Pressable style={styles.contentImagecontainer} onPress={()=>{
                    navigation.navigate('Comment')
                }}>
                    <Image source={contentImages[2]} style={styles.contentImage}/>
                    <Text style={styles.imageText}>Negotiate</Text>
                </Pressable>
            </View>
            <Pressable style={styles.buyContainer} onPress={()=>{
                handlePress(item.Name);
                handleCartName();
                cartData(item);
               }
                }
                >
                <Text style={styles.buyText}> Buy </Text>

            </Pressable>
        </View>
   </View>)
    
}

export default memo(MarketItems);

export {FavouritesData, removeFavContent};