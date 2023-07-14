import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, Text, FlatList,  Animated, } from "react-native";
import { memo, useEffect, useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, Avatar, ListItem } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons } from '@expo/vector-icons';
import ChatComp from "../components/chatComp";
import { StatusBar } from "expo-status-bar";

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        backgroundColor:'white',
        flex:1

    },
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
function NewsFeed({navigation, cartData, setChatBadge,newMessageId,setNewMessageId }){

    const [activeActivity, setActiveActivity] = useState(true);
    const [email, setEmail] = useState('');
    const [data, setData] = useState([]);
    const [itemName, setItemName] = useState('');
    const [activeActivity_, setActiveActivity_] = useState(false)
    let currentData = useRef(new Animated.Value(0)).current;

    async function getEmail(){
        await AsyncStorage.getItem('userEmail').then((data)=>{
            let res = JSON.parse(data).email
            setEmail(res)
        })
    }
    const isfocused = useIsFocused();
    useEffect(()=>{
        if(isfocused){    
            getEmail()
            setChatBadge(0)
            setActiveActivity(true)
            setTimeout(()=>{
                setActiveActivity(false)
            }, 20)
            
        getChatData()
        }
    }, [isfocused])
 
    async function getChatData(){
        let comment = []
        await AsyncStorage.getItem('yourChatData').then((data)=>{
            if(data){
               let res = JSON.parse(data)
               res.forEach((item)=>{
                if(newMessageId.includes(item._id)){
                    item.isNew = true
                }else{
                    item.isNew = false
                }
               })
               comment = res.reverse();
               console.log(comment)
            }
        })
        setData(comment)
    }
    
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
    async function handleEvent(item){
        setActiveActivity_(true);
        setTimeout(()=>{
            cartData(item)
        .then(()=>{
                buyClicked(item.Name)
                .then(()=>{
                    setTimeout(()=>{
                        setActiveActivity_(false);
                    }, 500)
                })
        })
        }, 300)
        
    }


    if(activeActivity){
        return<View  style={[styles.body, {flex:1}]}>
                <StatusBar style='dark'  />
                <ActivityIndicator color="#ffaf36" size={45}/>
                <Text>No notifications</Text>
        </View>
    }else{
        return<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex:1}}>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({item})=><ChatComp
                        navigation={navigation}
                        item={item}
                        handleEvent={handleEvent}
                        activeActivity_={activeActivity_}
                        setNewMessageId={setNewMessageId}
                        
                    />}
                />
                 <Animated.View style={[styles.alertbody, {opacity:currentData}]}>
                                        <Ionicons name="checkmark-sharp" size={24} color="white" />
                                        <Text style={styles.alertText}>{itemName} have been added to cart!!</Text>
                                    </Animated.View>
            </View>
        </TouchableWithoutFeedback> 
    }
    
}

export default memo(NewsFeed);