import {View, Text, TextInput,StyleSheet, Keyboard} from 'react-native';

import { memo, useEffect, useRef, useState } from 'react';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white',
       
    },
    TextInputContainer:{
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical:30,

    },
    textInput:{
        borderWidth:1.5,
        marginHorizontal:5,
        padding:5,
        borderRadius:5,
        fontSize:20,
        fontWeight:'bold'
        
        
    },
    sendContainer:{
        backgroundColor:'#ffdb28',
        padding:10,
        marginLeft:5

    }
})

function FrgtpswdCode({navigation, route}){
    const {code} = route.params.data.code
    const {email} = route.params.data
    const data = {
        code:code,
        email:email
    }
    const [active, setActive] = useState(false);
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [active4, setActive4] = useState(false);

    const [firstNum, setFirstNum] = useState('');
    const [secondNum, setSecondNum] = useState('');
    const [thirdNum, setThirdNum] = useState('');
    const [fourthNum, setFourthNum] = useState('');
    const [fifthNum, setFifthtNum] = useState('');
    const [codec, setCodec] = useState('')
    

    const fNum = useRef();
    const sNum = useRef();
    const tNum = useRef();
    const foNum = useRef();
    const fiNum = useRef();




    function handleFirstNum(text){
        if(text.length == 1){
            setFirstNum(text)
            sNum.current.focus();
        }else{
            setFirstNum('');
        }

    }
    function handleSecondNum(text){
        if(text.length == 1){
            setSecondNum(text);
            tNum.current.focus();

        }else{

            setSecondNum('');
        }
    }
    function handleThirdNum(text){
        if(text.length == 1){
            setThirdNum(text)
            foNum.current.focus();
        }else{
            setThirdNum('');
        }

    }
    function handleFourthNum(text){
        console.log(text)
        if(text.length == 1){
            setFourthNum(text)
            fiNum.current.focus();
        }else{
            setFourthNum('');
        }
    }
    function handleFifthNum(text){
        if(text.length == 1){   
        setFifthtNum(text)
        Keyboard.dismiss();
        }else{
            setFifthtNum('');
        }

    }




    function handleFocus(){
        setActive(true)

    }
    function handleFocus1(){
        setActive1(true)
    
    }
    function handleFocus2(){
        setActive2(true)

    }
    function handleFocus3(){
        setActive3(true)

    }
    function handleFocus4(){
        setActive4(true)

    }

    // activate once the send button have been Pressed

        useEffect(()=>{
            
            console.log(codec)
            if(code == codec){
                navigation.navigate('Reset Password', {data:data})
            }
        
        
        }, [codec])


    useEffect(()=>{
        setTimeout(()=>{
            fNum.current.focus()
        }, 150)
        }, [])
    
    return <View style = {styles.body}>
            <View style={styles.TextInputContainer}>
                <TextInput 
                style = {[styles.textInput , {borderColor:active?'#ffdb28':'lightGray'}]}
                keyboardType="number-pad"
                textAlign='center'
                onFocus = {handleFocus}
                value = {firstNum}
                onChangeText = {handleFirstNum}
                onBlur={()=>{setActive(false)}}
                ref={fNum}
                />

                <TextInput 
                style = {[styles.textInput , {borderColor:active1?'#ffdb28':'lightGray'}]}
                keyboardType="number-pad"
                textAlign='center'
                onFocus = {handleFocus1}
                value = {secondNum}
                onChangeText = {handleSecondNum}
                onBlur={()=>{setActive1(false)}}
                ref={sNum}
                />

                <TextInput 
                style = {[styles.textInput , {borderColor:active2?'#ffdb28':'lightGray'}]}
                keyboardType="number-pad"
                textAlign='center'
                onFocus = {handleFocus2}
                value = {thirdNum}
                onChangeText = {handleThirdNum}
                onBlur={()=>{setActive2(false)}}
                ref={tNum}
                />

                <TextInput 
                style = {[styles.textInput , {borderColor:active3?'#ffdb28':'lightGray'}]}
                keyboardType="number-pad"
                textAlign='center'
                onFocus = {handleFocus3}
                value = {fourthNum}
                onChangeText = {handleFourthNum}
                onBlur={()=>{setActive3(false)}}
                ref={foNum}
                />

                <TextInput 
                style = {[styles.textInput , {borderColor:active4?'#ffdb28':'lightGray'}]}
                keyboardType="number-pad"
                textAlign='center'
                onFocus = {handleFocus4}
                value = {fifthNum}
                onChangeText = {handleFifthNum}
                onBlur={()=>{setActive4(false)}}
                ref={fiNum}
                />
                
                <Pressable style={styles.sendContainer} onPress={()=>{  
                    setCodec(firstNum+secondNum+thirdNum+fourthNum+fifthNum);

                    
                }}>
                    <Text>send</Text>
                </Pressable>
            </View>
    </View>
}

export default memo(FrgtpswdCode)