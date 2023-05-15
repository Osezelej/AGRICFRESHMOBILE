import {Text, View, StyleSheet, TouchableWithoutFeedback, TextInput, TouchableOpacity, Keyboard, ScrollView,Pressable, Image, Alert} from 'react-native'
import { styles } from './signUp';
import { useState, useRef, useEffect } from 'react';
import VerificationComp from '../components/verificfationComp';
import { ActivityIndicator } from '@react-native-material/core';
import axios from 'axios';


export function ResetPassword ({navigation, visibleImage, notVisibleImage, route}){
    navigation.canGoBack(false)
    const {data} = route.params
    console.log(data)


    const [verficationData, setVerificationData] = useState([
        {
            id:1,
            text:'1 Special character',
            isActive:false
        },
        {
            id:2,
            text:'1 Uppercase Alphabet',
            isActive:false
        },
        {
            id:3,
            text:'1 Lowercase Alphabet',
            isActive:false
        },
        {
            id:4,
            text:'1 Number',
            isActive:false
        },
        {
            id:5,
            text:'At least 8 character',
            isActive:false
        }
    ]);
    const [displayVeriData, setDisplayVeriData] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    var [isSmallalpha, setSmallalpha] =useState(false);
    var [isBigalpha, setBigalpha] = useState(false);
    var [isNum, setNum] = useState(false);
    var [isChar, setChar] = useState(false);
    
    const checkCapAlpha = useRef(false);
    const checkSmallAlpha = useRef(false);
    const checkNum = useRef(false);
    const checkChar = useRef(false);

   
  
    const [confirmPassword, setConfirmPassword] = useState('')
    const [correctPassword, setCorrectPassword] = useState('#3131313c')
    const [active, setActive] = useState(false)

    const [password, setPassword] = useState('')
  
   

    const [animating, setAnimating] = useState(false)


    function handleChangeText(text){
        checkCapAlpha.current = false;
        checkSmallAlpha.current = false;
        checkNum.current = false;
        checkChar.current = false;

        let capitalAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let smallAlpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'];
        let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
        let character = ['+','!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', ':', '"', "'", '<', '>', '?', '/', '~', '`', '|','\\','=', '-', '_', '.',',', ';'];
        
        if(text.length > 0){
            setDisplayVeriData(true)
        }else{
            setDisplayVeriData(false)
        }


        // for length of password
        let minPasswordLength = 8;
        if(text.length < minPasswordLength){
            setVerificationData((prev)=>{
                for (let data of prev){
                    if (data.id == 5){
                        data.isActive = false
                    }
                }
                return [...prev]
            })
        }else{
            setVerificationData((prev)=>{
                for (let data of prev){
                    if (data.id == 5){
                        data.isActive = true
                    }
                }
                return [...prev]
            })
        }

        // for capital alphabets
        for (let w of capitalAlpha){
            if (text.includes(w)){
            
                checkCapAlpha.current = true;
                setBigalpha(true)
                break;
            }
        }
       
        if(!checkCapAlpha.current){
           
            checkCapAlpha.current = false;
            setBigalpha(0);
        }

// for small alphabets
        for (let w of smallAlpha){
            
            if (text.includes(w)){
            
                checkSmallAlpha.current = true;
                setSmallalpha(true);
                
                break;
            }
        }
       
        if(!checkSmallAlpha.current){
           
            checkSmallAlpha.current = false;
            setSmallalpha(0);
        }

// for small number
        for (let w of number){
            
            if (text.includes(w)){
            
                checkNum.current = true;
                setNum(true);
                
                break;
            }
        }
       
        if(!checkNum.current){
           
            checkNum.current = false;
            setNum(0);
        }


// for char

for (let w of character){
            
    if (text.includes(w)){
    
        checkChar.current = true;
        setChar(true);
        
        break;
    }
}

if(!checkChar.current){
    checkChar.current = false;
    setChar(0);
}

     

        setPassword(text)
    }

    // useEffect for Big alphabets
    useEffect(()=>{
        if(checkCapAlpha.current){
            console.log('positive')
            console.log(checkCapAlpha.current)
            setVerificationData((prev)=>{
                for (let data of prev){
                    if (data.id == 2){
                        data.isActive = true
                    }
                }
                return [...prev]
            })
        }else{
            console.log('negative')
            setVerificationData((prev)=>{
                for (let data of prev){
                    if (data.id == 2){
                        data.isActive = false
                    }
                }
                return [...prev]
            })
        }
    }, [isBigalpha])

// useEffect for Small alphabets
    useEffect(()=>{
        if(checkSmallAlpha.current){
            setVerificationData((prev)=>{
                for (let data of prev){
                    if (data.id == 3){
                        data.isActive = true
                    }
                }
                return [...prev]
            })
        }else{
            console.log('negative')
            setVerificationData((prev)=>{
                for (let data of prev){
                    if (data.id == 3){
                        data.isActive = false
                    }
                }
                return [...prev]
            })
        }
    }, [isSmallalpha])

// useEffect for numbers
    useEffect(()=>{
        if(checkNum.current){
            setVerificationData((prev)=>{
                for (let data of prev){
                    if (data.id == 4){
                        data.isActive = true
                    }
                }
                return [...prev]
            })
        }else{
            setVerificationData((prev)=>{
                for (let data of prev){
                    if (data.id == 4){
                        data.isActive = false
                    }
                }
                return [...prev]
            })
        }
    }, [isNum])


    //useEffect for characters

    useEffect(()=>{
        if(checkChar.current){
            setVerificationData((prev)=>{
                for (let data of prev){
                    if (data.id == 1){
                        data.isActive = true
                    }
                }
                return [...prev]
            })
        }else{
            setVerificationData((prev)=>{
                for (let data of prev){
                    if (data.id == 1){
                        data.isActive = false
                    }
                }
                return [...prev]
            })
        }
    }, [isChar])

    function changeConfirmPassword (text){
        console.log(text)
     
        if(text == password){
            setCorrectPassword('#3131313c');
            setActive(true)
        }else{
            setCorrectPassword('red')
            setActive(false)
        }
        setConfirmPassword(text)

    }


    function handleSubmit(){
        setAnimating(true)
        Alert.alert('Warning', 'Are you sure you want to change your password? \nCannot be undone once done', [{
            text:'ok',
            onPress: async ()=>{
                await axios.post('https://4v6gzz-3001.csb.app/v1/rstpswd', {email:data.email, password:confirmPassword})
                .then((res)=>{
                    console.log(res.data)
                    if(res.status == 200){
                        navigation.navigate('Login', {email:data.email})
                    }

                })
                .finally(()=>{
                    setTimeout(()=>{
                        setAnimating(false)
                    }, 800)

                })
            }
        },
        {
            text:'cancel',
            onPress:()=>{
                setPassword('')
                setConfirmPassword('')
            }
        }
    ])
    }

    return(<ScrollView style={styles.body}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
           <View >
                <View style={styles.formbody}>
                <View style={styles.nameContainer}>
                        <Text style={styles.Label}>Password</Text>
                        <View style = {{flexDirection:'row', 
                        alignItems:'center',
                        flex:1,  
                        width:'100%', 
                        }}>
                            <TextInput 
                            placeholder='Enter your password' 
                            style={[styles.Field, {width:'90%'}]} 
                            selectionColor={'black'} 
                            secureTextEntry={showPassword}
                            onChangeText={handleChangeText}
                            value={password}
                            />
                            {
                               displayVeriData && (showPassword ? <Pressable onPress={()=>{setShowPassword(false)}} style = {{padding:5}}>
                                <Image source={visibleImage} style = {{width:20, height:20}}/>
                            </Pressable>:<Pressable   onPress={()=>{setShowPassword(true)}}>
                                <Image source={notVisibleImage} style = {{width:20, height:20}}/>
                            </Pressable>) 
                            }
                            
                        </View>
                        
                    </View>
                    {displayVeriData && <View style = {styles.veribody}>
                                            {verficationData.map((item)=><VerificationComp item={item} key ={item.id}/>)}
                                        </View>
                    }

                    <View style={styles.nameField}>
                        <Text style={styles.Label}>Confirm Password</Text>
                        <TextInput 
                        placeholder='confirm password' 
                        style={[styles.Field, {borderBottomColor: correctPassword}]} 
                        selectionColor={'black'} 
                        secureTextEntry={true}
                        onChangeText={changeConfirmPassword}
                        value={confirmPassword}
                        />
                    </View>
                    
                   {
                    active && <View style={styles.submitContainer}>
                        <TouchableOpacity style={[styles.submit, {flexDirection:'row'}]} activeOpacity={0.6} onPress={handleSubmit}> 
                            <Text style={styles.submitText}>Send</Text>
                            {animating && <ActivityIndicator size={'small'} color='black' />}
                        </TouchableOpacity>
                    </View>
                   } 
                </View>
           </View>
            
        </TouchableWithoutFeedback>
    </ScrollView>
       
    )
}