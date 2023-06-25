import { TouchableWithoutFeedback, View, Keyboard, StyleSheet, Text, Pressable, TouchableOpacity, TextInput, ScrollView, Button, Image, Alert } from "react-native";
import { memo, useState, useEffect } from "react";
import {AntDesign, Feather} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding:10,
    },
    topContainer:{
        alignItems:"center",
        flex:1
    },
    username:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:5
    },
    profileImageContainer:{
        width:155,
        height:157,
        backgroundColor:'#e3e3e3',
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
    },
    editIconContainer:{
        position:'absolute',
        right:5,
        padding:3,
        backgroundColor:'#ffdb28',
        top:8,
        borderRadius:10

    },
    bottomContainer:{
        backgroundColor:'white',
        flex:2,
        paddingBottom:20,
        paddingHorizontal:5

        
    },
    nameContainer:{
        marginBottom:10
    },
    Label:{
        fontSize:18,
        paddingBottom:10
    },
    Field:{
        backgroundColor:'white',
        padding:10,
        borderRadius:10,
        elevation:5,
        fontSize:16
    },
    body:{
        flex:1
    },
    nameContainers:{
        marginBottom:25
    },
    applyChanges:{
        backgroundColor:'#ffdb28',
        elevation:5,
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        paddingVertical:10
    }
})

function UserProfile({navigation}) {
    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState('');
    const [EditUsername, setEditUserName] = useState(userName);
    const [email, setEmail] = useState('');
    async function pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4, 4],
            allowsMultipleSelection:false,
            quality:0.5,
            
        });
        if(!result.canceled){
                setImage(result.assets[0].uri);
        }else{
            Alert.alert('Canceled', 'The image selection have been canceled');
        }
    }
    
    async function getUsername(){
        await AsyncStorage.getItem('userData', (err, res)=>{
            setUserName(JSON.parse(res).name) 
        });
    }



    useEffect(()=>{getUsername()}, []);


    return  <ScrollView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.body}>
                    <View style={styles.topContainer}>

                        <View style={styles.profileImageContainer}>
                            {image ?<Image source={{uri:image}} style={{width:153, height:155, borderRadius:100}}/>:<AntDesign name="user" size={100} color="#3b3b3b" />}
                            
                            <TouchableOpacity style={styles.editIconContainer} activeOpacity={0.5} onPress={pickImage}>
                                <Feather name="edit-2" size={20} color="black" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.username}>{userName}</Text>

                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.Label}>Name:</Text>
                            <TextInput 
                                placeholder='Enter your name' 
                                style={styles.Field} 
                                selectionColor={'black'}
                                value={EditUsername}
                                onChangeText={setEditUserName}
                            />
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.Label}>Email:</Text>
                            <TextInput 
                                placeholder='Enter your Email' 
                                style={styles.Field} 
                                selectionColor={'black'} 
                                keyboardType={'email-address'}
                                value = {email}
                                onChangeText={setEmail}
                            />
                        </View>
                            <TouchableOpacity activeOpacity={0.5} style={styles.applyChanges}>
                                <Text style={{fontSize:18, fontWeight:'500'}}>Apply Changes</Text>
                            </TouchableOpacity>
                    </View>
                   
                    
                </View>
    </TouchableWithoutFeedback>
    
    </ScrollView> 
}

export default memo(UserProfile);