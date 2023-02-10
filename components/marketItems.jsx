import {memo, } from 'react';
import { View, Text, Pressable, Image } from 'react-native';


function MarketItems({styles, item, contentImages, navigation} ) {
    
    
    return(<View style={styles.contentContainer}>
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
   </View>)
    
}

export default memo(MarketItems);