import {View, FlatList, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import Comments from '../components/commentComp';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from '@react-native-material/core';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    body:{
        flex:1,

    },
    textInputContainer:{
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center'

    },
    textInput:{
        borderWidth:1.4,
        borderRadius:20,
        paddingHorizontal:10,
        paddingVertical:5.7,
        fontSize:16, 
        width:'86%',
        borderColor:'#d0d0d0'
    },
    sendContainer:{
        paddingHorizontal:5,
        justifyContent:'center',
        marginLeft:5,
        minHeight:45
    },
    commentContainer:{
        flexDirection:'row',
        marginVertical:5,
    }
})

function Comment({route, socket}){
    const [CommentData, setCommentData] = useState([]);

    const [productData, setProductData] = useState(null);
    const [commentTyped, setCommentTyped] = useState('');
    const [email, setEmail] = useState('');
    let chatid = useRef(true);

    let handlePress = useCallback(()=>{
        if (commentTyped.length > 0){
            setCommentData((prev)=>{
                    setchatData();
                if(prev.length < 1){
                    setItemData();
                    return[
                        {id:1, message:commentTyped, type:'sent',}
                    ]
                }else{
                    return[...prev, {id: prev[prev.length - 1].id + 1, message:commentTyped, type:'sent'}]
                }
            })
            socket.emit('private_message',{
                message:commentTyped,
                to:productData._id
            })
        }else{
            Alert.alert('Error', 'Type a message before you send')
        }
        
        setCommentTyped('')
    })

    async function getEmail(){
        await AsyncStorage.removeItem(productData._id)
        await AsyncStorage.removeItem('yourChatData')
        // await AsyncStorage.getItem('userEmail').then((data)=>{
        //     setEmail(JSON.parse(data).email)
        // })
   }
   async function setchatData(){
    let isPresent = false
    await AsyncStorage.getItem('yourChatData').then(async(data)=>{
        
        
        if (data){
            console.log(data)
            let res = JSON.parse(data)

           for (let i of res){
            if(i._id == productData._id){
                console.log('they are the same')
                isPresent = true
                break;
            }
           }
           if(!isPresent){
            res.push(productData)
            console.log(res)
           }
        await AsyncStorage.setItem('yourChatData', JSON.stringify(res))
        }else{
            await AsyncStorage.setItem('yourChatData', JSON.stringify([productData]))
        }
    })
   }
   async function getItemData(){
    await AsyncStorage.getItem('productData').then((data)=>{
        setProductData(JSON.parse(data).item)
    })
   }
   async function setItemData(){
    let data = {item:route.params.item}
    let jsonData = JSON.stringify(data)
    await AsyncStorage.setItem('productData',jsonData)
   }

   async function saveCommentData(){
    let data = {messages:CommentData}
    let jsonData = JSON.stringify(data)
    await AsyncStorage.setItem(productData._id, jsonData)
   }

   async function savedata(message){
    setCommentData((prev)=>{
        setchatData();
    if(prev.length < 1){
        setItemData();

        return[
            {id:1, message:message, type:'recieved' }
        ]
    }else{
        return[...prev,{id: prev[prev.length - 1].id + 1, message:message, type:'recieved'}]
    }
})

   }

   async function getCommentData(){
    await AsyncStorage.getItem(productData._id).then((data)=>{
  
        if(data){
            let res = JSON.parse(data).messages
            setCommentData(res)
        }
        
    })
   }


    useEffect(()=>{
        
        if (route.params){
            setProductData(route.params.item)

        }else{
            getItemData()
        }

       
    }, [])

    useEffect(()=>{
        if(productData){
            getCommentData()
            socket.on('private_message', (message)=>{
                console.log(message);
                savedata(message);
             })

            // getEmail()
        }
        
    }, [productData])

    useEffect(()=>{

    }, [email])

    useEffect(()=>{
        if(CommentData.length > 0){
            saveCommentData()
           
        }
        
    }, [CommentData])

    let mychats  = useRef(null)

    if (productData){
        return<KeyboardAvoidingView style={styles.container}>
            <View style={styles.body}>
                <View style={{alignItems:'center', flexDirection:'row', justifyContent:'center'}}>
                    <Text style={{color:'#818181'}}>You are Negotiating with</Text>
                    <Text style={{fontSize:16, fontWeight:'bold'}}> {productData.farmName} </Text> 
                    <Text style={{color:'#818181'}}>base on</Text>
                    <Text style={{fontSize:16, fontWeight:'bold'}}> {productData.Name}</Text>
                </View>
                <FlatList 
                 ref={mychats}
                    data={CommentData}
                    renderItem={({item})=>{
                        if (item.type == 'sent'){
                                return <View style = {[styles.commentContainer, {flexDirection:'row-reverse', justifyContent:'flex-end'}]} key ={item.id}>
                                            <Comments data={item} productData={productData}/>
                                        </View>
                            }else{
                                return <View style = {[styles.commentContainer,{flexDirection:'row-reverse', justifyContent:'flex-end'}]} key ={item.id}>
                                            <Comments data={item} productData={productData}/>
                                        </View>
                }
                    }}
                    onLayout={()=>{mychats.current.scrollToEnd()}}
                    onContentSizeChange={()=>{
                        mychats.current.scrollToEnd()
                    }}
                />
            </View>
            <View style={styles.textInputContainer}>
                <TextInput 
                    value = {commentTyped}
                    placeholder='Type here...'
                    style={styles.textInput}
                    collapsable = {true}
                    selectionColor = '#d0d0d0'
                    multiline = {true}
                    onChangeText = {(text)=>{setCommentTyped(text)}}
                   
                />
                <TouchableOpacity style={styles.sendContainer} onPress={handlePress} activeOpacity={0.5}>
                    <MaterialIcons name="send" size={34} color="#ffaf28" />
                </TouchableOpacity>
            </View>
    </KeyboardAvoidingView>
    }else{
        return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator color='#ffaf38' size={40}/>
        </View>
    }
    
}

export default memo(Comment);
