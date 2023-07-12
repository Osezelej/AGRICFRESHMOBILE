import {View, Text, Pressable, StyleSheet } from 'react-native';
import { memo, useEffect, useState, useRef } from "react";
import { ActivityIndicator, Avatar, ListItem } from "@react-native-material/core";

const styles = StyleSheet.create({
    buyContainer:{
        backgroundColor:'#ffaf36',
        width:50,
        height:40,
        elevation:5,
        marginRight:15,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10


    },
    buyText:{
        fontSize:17,
        fontWeight:'800'
    },
})
function ChatComp({navigation, item, handleEvent, activeActivity_, setNewMessageId, setChatBadge}){
const [isNew, setIsNew] = useState(item.isNew)
    return <ListItem
    leadingMode="avatar"
    title={isNew ? <View style={{flexDirection:'row', alignItems:'center'}}>
        <Text style={{fontWeight:'bold'}}>{item.farmName.toUpperCase()}</Text>
        <View style={{marginLeft:10, height:7, width:7, borderRadius:30, backgroundColor:'#ffaf36'}}></View>
    </View>:<Text style={{fontWeight:'bold'}}>{item.farmName.toUpperCase()}</Text>}
    leading={<Avatar image={{uri:item.Image}}/>}
    trailing={()=><Pressable style={[styles.buyContainer, {flexDirection:'row', alignItems:'center'}]} onPress={()=>{ handleEvent(item)}}>
                        <Text style={styles.buyText}> Buy </Text>

                        {activeActivity_ && <ActivityIndicator size={10} color='black'/>}
        </Pressable>}
        secondaryText={'FOR: ' + item.Name.toUpperCase()}
        overline={<Text style={{color:'green', fontSize:12}}>{item.Price}</Text>}
    onPress={()=>{
        setNewMessageId((prev)=>{
            return prev.filter((data)=>{
                return data != item._id
            })
        })
        navigation.navigate('Comment', {item:item} );
        }}
    />
}

export default ChatComp;