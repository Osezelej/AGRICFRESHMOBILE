import { View,Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, TouchableHighlight, Pressable, ScrollView, Alert } from "react-native";
import {styles} from './signUp';
import { useEffect, useState } from "react";
import { ActivityIndicator } from "@react-native-material/core";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

export function Login({navigation, route, saveUserData}){
    let email = ''
    navigation.canGoBack(false)
    if (route.params != undefined){
        email = route.params.email
    }
        
    const [Email, setEmail] = useState(email);
    const [Password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [activeActivity, setActiveActivity] = useState(false);

    let character = ['!', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', ':', '"', "'", '<', '>', '?', '/', '~', '`', '\\', '=', '-', '_', ',', ';'];
    useEffect(()=>{
        let active = false;
        character.forEach((value)=>{
            if (Email.includes(value)){
                setShowError(true)
                active = true
                
            }
        })
        if(!active){
            setShowError(false)
        }
    }, [Email])
    function handlePress(){
        console.log('pressed')
        navigation.navigate('Forgot password')
    }
    async function toMarketPlace(Email, Password, showError) {
        if(Email.length > 0 && Password.length > 0 && !showError){
            setActiveActivity(true)
            await axios.post('https://4v6gzz-3001.csb.app/v1/login', {email:Email, password:Password})
            .then((res)=>{
                if(res.data && res.status == 200){
                    Alert.alert(`WELCOME BACK, ${res.data[0].name.toUpperCase()}`,'LOGIN SUCCESS!', [{
                        text:'0K',
                        onPress:async ()=>{
                            let data = res.data;
                            let email = data[0].email;
                            let name = data[0].name;
                            let walletBal = data[0].walletBal
                            let userImg = data[0].user_img

                            console.log(res.data);
                            setPassword('');
                        
                            saveUserData(email, name, walletBal, userImg).then(()=>{
                                navigation.navigate('MarketPlace', {email:Email})
                            })
                           
                    
                        }
                    }])
                }
            })
            .catch((e)=>{
                Alert.alert('NETWORK ERROR', 'Invalid Email or Password', [
                    {
                        text:'Cancel',
                        onPress:()=>{
                                setEmail('');
                                setPassword('');
                        }
                    }
                ])
                
            })
            .finally(()=>{
                setTimeout(()=>{
                    setActiveActivity(false)
                }, 800)
            })
        }
        // navigation.navigate('')
    }
    return<TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.body}>
                <StatusBar style='dark'  />
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Sign in</Text>
                </View>
                <View style={styles.formbody}>
                    {showError && <Text style = {{
                        color:'red',
                        fontSize:16,
                        fontWeight:'500'
                    }}>Please Enter a valid Emaill Address</Text>}
                    
                    <View style={styles.nameContainer}>
                        <Text style={styles.Label}>Email</Text>
                        <TextInput 
                        placeholder='Enter your email' 
                        style={styles.Field} 
                        keyboardType={'email-address'} 
                        selectionColor={'black'}
                        value = {Email}
                        onChangeText={setEmail}

                        />
                    </View>

                    <View style={styles.nameContainer}>
                        <Text style={styles.Label}>Password</Text>
                        <TextInput 
                        placeholder='Enter your password' 
                        style={styles.Field} 
                        selectionColor={'black'} 
                        secureTextEntry={true}
                        value = {Password}
                        onChangeText={setPassword}
                        />
                    </View>

                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.submit} onPress={()=>{toMarketPlace(Email, Password, showError)}}>
                        <View style={{
                            flexDirection:'row'
                        }}>
                        
                        <Text style={styles.submitText}>Sign in</Text>
                        {activeActivity && <ActivityIndicator color="black" size={'small'}/>}

                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                    <Pressable onPress={handlePress}>
                        <Text style={styles.bottomText}>Forgot password?</Text>
                    </Pressable>
                
                </View>

                    <View style={styles.createAcctContainer}>
                        <TouchableHighlight style={styles.createContainer} onPress={()=>(navigation.navigate('Sign up'))} underlayColor={'#ffaf06'}>
                            <Text style={{fontSize:17, fontWeight:'600'}}>Create account</Text>
                        </TouchableHighlight>

                    </View>
                </View>
                
            </View>
            
    
    </TouchableWithoutFeedback>
}