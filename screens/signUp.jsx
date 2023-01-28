import {View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';
export function SignUp({navigation}){
    function handlePress() {
        navigation.navigate('Login')
    }    
    return <ScrollView style={styles.body}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss }>
            <View  >
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Sign Up</Text>
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
                        <TextInput placeholder='Enter your password' style={styles.Field} selectionColor={'black'} secureTextEntry={true}/>
                    </View>

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
        fontSize:15,
    },
    Field:{
        borderBottomWidth:2.5,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderStyle:'solid',
        height:38,
        padding:5,
        borderBottomColor:'#3131313c',
        borderLeftColor:'#3131313c',
        borderRightColor:'#3131313c',
        borderRadius:10,
        borderTopColor:'#fff',
        fontSize:16,
        
    },
    submit:{
        display:'flex',
        backgroundColor:'#ffdb28',
        paddingVertical:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        borderColor:'green',
        borderWidth:2

    },
    submitContainer:{
        paddingHorizontal:5,
        marginTop:20,
        
    },
    submitText:{
        fontSize:16,
        fontWeight:'500'
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
        
    }

})