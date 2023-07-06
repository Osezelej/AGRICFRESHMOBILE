import {View, FlatList, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { memo, useCallback, useEffect, useState } from 'react';
import Comments from '../components/commentComp';
import { MaterialIcons } from '@expo/vector-icons';
import { io } from 'socket.io-client';


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
        width:'83%',
        borderColor:'#d0d0d0'
    },
    sendContainer:{
        paddingHorizontal:10,
        justifyContent:'center',
        marginLeft:10,
        minHeight:45
    },
    commentContainer:{
        flexDirection:'row',
        marginHorizontal: 10,
        marginVertical:5,
    }
})

function Comment(){
    const [CommentData, setCommentData] = useState([{
        id:1, 
        message:'Hello',
        type:'sent'
    }, 
    {
        id:2, 
        message:'Hi',
        type:'recived'
    }

])

    const [commentTyped, setCommentTyped] = useState('')

    let handlePress = useCallback(()=>{
        if (commentTyped.length > 0){
            setCommentData((prev)=>{
                if (prev.length >= 1){
                
                return[...prev, {id: prev[prev.length - 1].id + 1, message:commentTyped, type:'sent'}] 
                }
            })
        }else{
            Alert.alert('Error', 'Type a message before you send')
        }
        
        setCommentTyped('')
    })

    useEffect(()=>{
        var socket = io('https://4v6gzz-3001.csb.app')
        socket.connect()
    }, [])
    return<View style={styles.container}>
            <View style={styles.body}>
                <FlatList 
                    data={CommentData}
                    renderItem={({item})=>{
                        if (item.type == 'sent'){
                                return <View style = {[styles.commentContainer, {flexDirection:'row-reverse'}]} key ={item.id}>
                                            <Comments data={item}/>
                                        </View>
                            }else{
                                return <View style = {[styles.commentContainer,]} key ={item.id}>
                                            <Comments data={item}/>
                                        </View>
                }
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
    </View>
}

export default memo(Comment);