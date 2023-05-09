import {View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {useState, useRef, useEffect} from 'react';
import VerificfationComp from '../components/verificfationComp';


export function SignUp({navigation}){

    function handlePress() {
        navigation.navigate('Login')
    }    
            
    var [isSmallalpha, setSmallalpha] =useState(false);
    var [isBigalpha, setBigalpha] = useState(false);
    var [isBigalpha1, setBigalpha1] = useState(false);
    var [isNum, setNum] = useState(false);
    var [isChar, setChar] = useState(false);
    
    const [passwordLength, setPasswordlength] = useState(0);

    function handleChangeText(text){
       let checkCapAlpha = false
        let capitalAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let smallAlpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'];
        let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
        let character = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', ':', '"', "'", '<', '>', '?', '/', '~', '`'];
        
        if(text.length > 0){
            setDisplayVeriData(true)
        }else{
            setDisplayVeriData(false)
        }

    }

    
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

    let [re_cap, setRe_cap] = useState(false);
    let [re_small, setRe_small] = useState(false);
    let [re_num, setRe_num] = useState(false);
    let [re_char, setRe_char] = useState(false);    
    
   
    function handleKeyPress (e){

        let capitalAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let smallAlpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'];
        let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
        let character = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', ':', '"', "'", '<', '>', '?', '/', '~', '`'];

    
        
    }
    // useEffect(()=>{setName('');setName('Sign Up')},[verficationData])

    const [password, setPassword] = useState('')
    const [name, setName ] = useState('Sign Up')
  
    const [signUpData, setSignUpData] = useState({
        name:'',
        email:'',
        password:'',
    })
    const [displayVeriData, setDisplayVeriData] = useState(false)


    return <ScrollView style={styles.body}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss }>
            <View  >
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>{name}</Text>
                </View>

                <View style={styles.formbody}>

                    <View style={styles.nameContainer}>
                        <Text style={styles.Label}>Name</Text>
                        <TextInput placeholder='Enter your name' style={styles.Field} selectionColor={'black'}/>
                    </View>

                    <View style={styles.nameContainer}>
                        <Text style={styles.Label}>Email</Text>
                        <TextInput placeholder='Enter your email' style={styles.Field} keyboardType={'email-address'} selectionColor={'black'}/>
                    </View>

                    <View style={styles.nameContainer}>
                        <Text style={styles.Label}>Password</Text>
                        <TextInput 
                        placeholder='Enter your password' 
                        style={styles.Field} 
                        selectionColor={'black'} 
                        secureTextEntry={false}
                        onChangeText={handleChangeText}
                        onKeyPress={handleKeyPress}
                        value={password}
                        />
                    </View>
                    {displayVeriData && <View style = {styles.veribody}>
                                            {verficationData.map((item)=><VerificfationComp item={item} key ={item.id}/>)}
                                        </View>
                    }
                    <View style={styles.nameField}>
                        <Text style={styles.Label}>Confirm Password</Text>
                        <TextInput placeholder='confirm password' style={styles.Field} selectionColor={'black'} secureTextEntry={true}/>
                    </View>

                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.submit} onPress={handlePress}>
                            <Text style={styles.submitText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingVertical:10
        
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