import { TouchableWithoutFeedback, View, Keyboard, StyleSheet, Text, Pressable, TouchableOpacity, TextInput, ScrollView, Button, Image, Alert } from "react-native";
import { memo, useState, useEffect } from "react";
import {AntDesign, Feather} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "../data/database";
import { decode } from 'base64-arraybuffer';
import { imageUrl } from "../data/database";
import axios from "axios";
import { ActivityIndicator } from "@react-native-material/core";
import { StatusBar } from "expo-status-bar";


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
        width:145,
        height:147,
        backgroundColor:'#e3e3e3',
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
    },
    editIconContainer:{
        position:'absolute',
        right:5,
        padding:3,
        backgroundColor:'#ffaf28',
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
        backgroundColor:'#ffaf28',
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
    const [EditUsername, setEditUserName] = useState('');
    const [email, setEmail] = useState('');
    const [editEmail, setEditEmail] = useState('')
    const [imgUrl, setImgUrl] = useState(null);
    const [userimageFilename, setImageFilename] = useState('');
    const [userData, setUserData] = useState('');
    const [showError, setShowError] = useState(false);
    const [activeActivity, setActiveActivity] = useState(false);
    let character = ['!', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', ':', '"', "'", '<', '>', '?', '/', '~', '`', '\\', '=', '-', '_', ',', ';'];

    async function getImageurl(){
        
        await AsyncStorage.getItem('userData').then((data)=>{
            let res =JSON.parse(data).userImg;
            let name_ = JSON.parse(data).name;
            let email_ = JSON.parse(data).email;

            setUserData(JSON.parse(data));
            if(res){
                let img_url = imageUrl + res;
                setImgUrl(img_url)
                setImageFilename(res)
            }else{
                setImgUrl(null)
            }
            setEditUserName(name_);
            setEditEmail(email_);
        })
    }

    async function pickImage(){

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4, 4],
            allowsMultipleSelection:false,
            quality:0.5,
            base64:true,
        });

        let index = result.assets[0].uri.lastIndexOf('/');
        let fileName = result.assets[0].uri.slice(index + 1);
        if(!result.canceled){

                if (imageUrl){
                    await axios.get(`https://4v6gzz-3001.csb.app/v1/deleteuserImg/${userimageFilename}`)
                    .then((res)=>{
                        console.log(res.data)
                        setImage({uri:result.assets[0].uri, fileName:fileName, base64:result.assets[0].base64});

                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }else{
                    setImage({uri:result.assets[0].uri, fileName:fileName, base64:result.assets[0].base64});
                }
        }else{
            Alert.alert('Canceled', 'The image selection have been canceled');
        }
    }
    

    async function getUsername(){
        await AsyncStorage.getItem('userData', (err, res)=>{
            setUserName(JSON.parse(res).name) 
        });
    }

    async function uploadImage(){
        let filename = `${generateTransactionRef(15)}-${image.fileName}`;
        let ext = image.fileName.slice(image.fileName.lastIndexOf('.') + 1);
        
        const {data, error} = await supabase.storage
        .from('images')
        .upload(`userImage/${filename}`,  decode(image.base64), {
            cacheControl: "3600",
            upsert: false,
            contentType:`image/${ext}`
          })
          if(data){
            await axios.get(`https://4v6gzz-3001.csb.app/v1/updateProfile/image/${email}/${filename}`)
            .then(async(res)=>{
                if(res.data == 0){
                    Alert.alert('NETWORK ERROR', 'There is an error please check your network and try again.')
                    const {data, error} = await supabase
                    .storage
                    .from('images')
                    .remove([`userImage/${filename}`])
                }else{
                    let data = JSON.stringify({
                        ...userData,
                        userImg:res.data
                    })
                    await AsyncStorage.setItem('userData', data);
                    setImgUrl(imageUrl + res.data);
                    setImageFilename(res.data);
                }
            })
            .catch(async(err)=>{
                Alert.alert('NETWORK ERROR', 'There is an error please check your network and try again.')
                const {data, error} = await supabase
                    .storage
                    .from('images')
                    .remove([`userImage/${filename}`])
            })
          }
    }

    useEffect(()=>{
        if(image){
            uploadImage().catch((err)=>{
                console.log(err)
            })
        }
    },[image])
    useEffect(()=>{
        let active = false;
        character.forEach((value)=>{
            if (editEmail.includes(value)){
                setShowError(true)
                active = true
                
            }
        })
        if(!active){
            setShowError(false)
        }
    }, [editEmail])

    const generateTransactionRef = (length) => {
        var result = '';
        var characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return `AgFh_img_ref_${result}`;
      };


    async function getEmail(){
        await AsyncStorage.getItem('userEmail').then((res)=>{
            setEmail(JSON.parse(res).email)
        })
    }

    useEffect(()=>{
        getUsername()
        getImageurl()
        getEmail()
    }, []);


// to handle applyChange 
    function handleApplyChange(){
        if (showError == false){
            if ((userName == EditUsername)){
                console.log('pass')
            }else{    
                setActiveActivity(true)
                Alert.alert('Warning', 'Are you sure you want to update your profile details?', [{
                    text:'ok',
                    onPress:async()=>{
                        let useremail = '';
                        let name = '';
    
                        if (userName == EditUsername){
                            name = '';
                        }else{
                            name = EditUsername;
                        }
    
                        console.log(useremail, name)
                        await axios.post(`https://4v6gzz-3001.csb.app/v1/update/${email}`, {name:name, walletBal:''})
                        .then(async (res)=>{
                            let data = JSON.stringify({
                                ...userData,
                                name:res.data.name
                            })
                            await AsyncStorage.setItem('userData', data);
                        }).catch((err)=>{
                            console.log(err);
                        })
                        .finally(()=>{
                            setTimeout(()=>{
                                
                            setActiveActivity(false)
                            }, 500)
                        })
                    }  
                }])
            }
        }
        
    }



    return  <ScrollView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.body}>
                <StatusBar style='dark'  />
                    <View style={styles.topContainer}>

                        <View style={styles.profileImageContainer}>
                            {imgUrl?<Image source={{uri:imgUrl}} style={{width:143, height:145, borderRadius:100}}/>:<AntDesign name="user" size={100} color="#3b3b3b" />}
                            
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
                        <TouchableOpacity activeOpacity={0.5} style={[styles.applyChanges, {flexDirection:'row',}]} onPress={handleApplyChange}>
                                <Text style={{fontSize:18, fontWeight:'500'}}>Apply Changes</Text>
                                {activeActivity && <ActivityIndicator size={"small"}/>}
                            </TouchableOpacity>
                            
                        
                            
                    </View>
                   
                    
                </View>
    </TouchableWithoutFeedback>
    
    </ScrollView> 
}

export default memo(UserProfile);
