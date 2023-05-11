import {View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView, Pressable, Image} from 'react-native';
import {useState, useRef, useEffect} from 'react';
import VerificfationComp from '../components/verificfationComp';


export function SignUp({navigation, visibleImage, notVisibleImage}){

    function handlePress() {
        navigation.navigate('Login')
    }    
            
    var [isSmallalpha, setSmallalpha] =useState(false);
    var [isBigalpha, setBigalpha] = useState(false);
    var [isNum, setNum] = useState(false);
    var [isChar, setChar] = useState(false);
    
    const [passwordLength, setPasswordlength] = useState(0);
    const checkCapAlpha = useRef(false);
    const checkSmallAlpha = useRef(false);
    const checkNum = useRef(false);
    const checkChar = useRef(false);

    function handleChangeText(text){
        checkCapAlpha.current = false;
        checkSmallAlpha.current = false;
        checkNum.current = false;
        checkChar.current = false;

        let capitalAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let smallAlpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'];
        let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
        let character = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', ':', '"', "'", '<', '>', '?', '/', '~', '`'];
        
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

  
    const [showPassword, setShowPassword] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [correctPassword, setCorrectPassword] = useState('#3131313c')
    const [active, setActive] = useState(true)
   
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
    // useEffect(()=>{setName('');setName('Sign Up')},[verficationData])

    const [password, setPassword] = useState('')
  
    const [signUpData, setSignUpData] = useState({
        name:'',
        email:'',
        password:'',
    })
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [displayVeriData, setDisplayVeriData] = useState(false)


    return <ScrollView style={styles.body}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss }>
            <View  >
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Sign Up</Text>
                </View>

                <View style={styles.formbody}>

                    <View style={styles.nameContainer}>
                        <Text style={styles.Label}>Name</Text>
                        <TextInput 
                        placeholder='Enter your name' 
                        style={styles.Field} 
                        selectionColor={'black'}
                        value={name}
                        onChangeText={setName}
                        />
                    </View>

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
                            />{
                               displayVeriData && (showPassword ? <Pressable onPress={()=>{setShowPassword(false)}} style = {{padding:5}}>
                                <Image source={visibleImage} style = {{width:20, height:20}}/>
                            </Pressable>:<Pressable   onPress={()=>{setShowPassword(true)}}>
                                <Image source={notVisibleImage} style = {{width:20, height:20}}/>
                            </Pressable>) 
                            }
                            
                        </View>
                        
                    </View>
                    {displayVeriData && <View style = {styles.veribody}>
                                            {verficationData.map((item)=><VerificfationComp item={item} key ={item.id}/>)}
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
                        />
                    </View>


                    {(name && email && password && confirmPassword && active && email.includes('@') && email.includes('.')) && <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.submit} onPress={handlePress}>
                            <Text style={styles.submitText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>}
                </View>
            </View>
    </TouchableWithoutFeedback>
    </ScrollView>
    
} 
export const styles = StyleSheet.create({
    body:{
        padding:20,
        flex:1,
        backgroundColor:'white',
    },
    headingContainer:{
        marginTop:0,
        marginBottom:20,
    },
    heading:{
        fontSize:40,
        fontWeight:'700',
    },
    formbody:{
        
    },
    nameContainer:{
        marginBottom:25,
        width:'100%'
    },
    Label:{
        fontSize:18,
        
    },
    Field:{
        borderBottomWidth:2.5,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderStyle:'solid',
        borderBottomColor:'#3131313c',
        borderLeftColor:'#3131313c',
        borderRightColor:'#3131313c',
        borderRadius:10,
        borderTopColor:'#fff',
        fontSize:16,
        paddingHorizontal:10,
        paddingVertical:10,
       
    },
    submit:{
        display:'flex',
        backgroundColor:'#ffdb28',
        paddingVertical:15,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,

    },
    submitContainer:{
        paddingHorizontal:5,
        marginTop:20,
        
    },
    submitText:{
        fontSize:20,
        fontWeight:'600'
    },
    createAcctContainer:{
        marginVertical:20,
        paddingHorizontal:5,
    },
    createContainer:{
        backgroundColor:'#e7e7e7',
        paddingVertical:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
    },
    bottom:{
        textAlign:'right',

    },
    bottomText:{
        color:'#1d50dd',
        fontSize:15,
        textAlign:'center',
        
    },
    veribody:{
        flexDirection:'row',
        flexWrap:'wrap'
    }

})