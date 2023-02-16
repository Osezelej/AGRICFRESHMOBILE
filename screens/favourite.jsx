import {View, StyleSheet, TouchableWithoutFeedback, Text, Keyboard, FlatList} from 'react-native';
import { memo, useState, useCallback, useEffect } from 'react';
import { FavouritesData } from '../components/marketItems';
import FavMarketItems from '../components/favMarketItems';

const styles = StyleSheet.create({
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
    container:{
        flex:1,
    },
    body:{
        flex:1,
    }
})
function Favourites ({navigation}){
    const [title , settitle] = useState('Favourites')
    let handlePress = useCallback(()=>{
        title == 'Favourites'? settitle('Favourites '): settitle('Favourites')
    })
    return <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
        <View style={styles.body}>
            <View style={styles.headerContainer}>
                    <View style={styles.TextContainer}>
                        <Text style = {styles.header}>{title}</Text>
                    </View>
            </View>
            <FlatList
                data={FavouritesData}
                renderItem = {({item})=>(<FavMarketItems item={item} changeTitle= {handlePress}/>)}
                keyExtractor = {(item) => item.id}
            />
            
        </View>
    </TouchableWithoutFeedback>
}

export default memo(Favourites);
