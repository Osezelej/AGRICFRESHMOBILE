import {View, Text, StyleSheet, TouchableWithoutFeedback,TextInput,TouchableOpacity, Keyboard, ScrollView, Alert} from 'react-native';
import { styles } from './signUp';
import axios from "axios";
import { ActivityIndicator } from '@react-native-material/core';
import { useState } from 'react';


export function ForgotPassword ({navigation}){
    const [email, setEmail] = useState('');
    const [activeActivity, setActiveActivity] = useState(false);

    async function handlePress(email){
        setActiveActivity(true)

        await axios.get('https://4v6gzz-3001.csb.app/v1/frgtPswd', {
            params:{
                email:email
            }
        })
        .then((res)=>{
            console.log(res.data)

            // navigation.navigate('Reset Password');
        })
        .catch((e)=>{
            console.log(e)
            // Alert.alert('Error', `Email: ${email} does not exist`, [{
            //     text:'OK',
            //     onPress:()=>{
            //         setEmail('');
            //     }
            // }])
            

        })
        .finally(()=>{
            setTimeout(()=>{setActiveActivity(false)}, 800)

        })

    }
    return (<ScrollView style={stylea.body}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.body}>
                    <View style={stylea.textContainer} >
                        <Text style={stylea.text}>Please enter your email. you will recieve a link to create a new password via email.</Text>
                    </View>
                    <View style={styles.formbody}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.Label}>Email</Text>
                                <TextInput 
                                placeholder='Enter your email' 
                                style={styles.Field} 
                                keyboardType={'email-address'} 
                                selectionColor={'black'}
                                value = {email}
                                onChangeText={setEmail}
                                />
                            </View>
                            <View style={styles.submitContainer}>
                            <TouchableOpacity style={styles.submit} onPress={()=>(handlePress(email))}> 
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.submitText}>Send</Text>
                                    {activeActivity && <ActivityIndicator size={'small'} color='black'/>}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </TouchableWithoutFeedback>
    </ScrollView>
       
    );
}

export const stylea = StyleSheet.create({
    text: {
        fontSize:15,
        fontWeight:"bold",

    },
    textContainer:{
        marginBottom: 15
    },
    body:{
        display:'flex',
        flex:1,
        backgroundColor:'white'
    }

})