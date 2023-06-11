import { ScrollView, View,StyleSheet, Text, TouchableOpacity, Image, FlatList } from "react-native";
import {memo, useState, useEffect} from 'react';
import WalletHead from "../components/walletHead";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import TransactionComp from "../components/transactionComp";
import { ActivityIndicator } from "@react-native-material/core";


const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white',

    },
   
    fundWallet:{
        backgroundColor:'#ffdb28',
        marginHorizontal:20,
        padding:10,
        alignItems:'center',
        elevation:10,
        marginBottom:10,
    },
    walletText:{
        fontWeight:'800',
    },
    transactionHistoryContainer:{
        padding:20,
    },
    transactionHeaderText:{
        fontSize:20,
        fontWeight:'bold'
    },
    transactionLogoContainer:{
        alignSelf:'center',
        paddingTop:30
    },
    transactionsLogo:{
        height:200,
        width:200,
    },
    transactionText:{
        fontWeight:'bold',
        fontSize:15
    },
    transactionHeadContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    refreshIconTextConntainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    refreshText:{
        marginLeft:5,
        fontSize:17,
        fontWeight:'500',
    }


}) 

function Wallet({TImage, visibilityImages, balance, navigation}){
    const [transactions, setTransactions] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [activeActivity, setActiveActivity] = useState(false);

    async function getEmail(){
        let e  = '';
        await AsyncStorage.getItem('userEmail', (err, res)=>{
            e = JSON.parse(res).email
        })
        return e
    }

    async function getName(){
        let e  = '';
        await AsyncStorage.getItem('userData', (err, res)=>{
            e = JSON.parse(res).name
        })
        return e
    }

    //  get data saved at transaction
    async function getTrxData(){
        setActiveActivity(false)
        let trxData = [];
        console.log(email)
        if (email.length > 0){
            await axios.get(`https://4v6gzz-3001.csb.app/v1/getWalletTrx/${email}`)
                .then((res)=>{
                    console.log(res.data)
                    trxData = res.data
                })
                .catch((err)=>{
                    console.log(err)
                })
                .finally(()=>{
                    setTimeout(()=>{
                    setActiveActivity(true)
                    console.log(30)
                    }, 800)
                })
        }
        
        return trxData
    }

    // get name email 
    async function getNameEmail(){
        getEmail().then((res)=>{
            setEmail(res)
        })
        await getName().then((res)=>{
            setName(res)
        })
      
    }

     //   to get email once the page opens
     useEffect(()=>{
        getNameEmail().then(()=>{  
            
        })
    },[])

    useEffect(()=>{
        getTrxData()
            .then((res)=>{
                setTransactions(()=>[...res])
            })
            
    }, [email])

    let D = new Date("2023-06-11T19:14:32.019842")
    console.log(D.getDay())


    return<View style={styles.body}>
        <View style={styles.container}>
           <WalletHead visibilityImages={visibilityImages}
            email={email}
            name={name}
            walletBal={balance}
           />
            <TouchableOpacity style={styles.fundWallet} activeOpacity={0.5} onPress={()=>{navigation.navigate('Wallet')}}>
                <Text style={styles.walletText}> FUND WALLET </Text>
            </TouchableOpacity>
            <View style={styles.transactionHistoryContainer}>

                <View style={styles.transactionHeadContainer}> 
                    <Text style={styles.transactionHeaderText}>Transaction History</Text>

                    <View style={styles.refreshIconTextConntainer}>
                        <MaterialIcons name="refresh" size={24} color="black" />
                        <Text style={styles.refreshText}>Refresh</Text>
                    </View>

                </View>

                <View style={styles.transactionBody}>

                    { activeActivity ?<View >
                            <FlatList 
                                data = {transactions}
                                renderItem={({item})=><TransactionComp
                                    item={item}
                                />}
                                ListEmptyComponent={
                                        <View style={{justifyContent:'center', alignItems:'center'}}>
                                            <Text style={styles.transactionText}>No Transaction have been done!</Text>
                                        </View>}
                                keyExtractor={item=>item["transaction_Id"]}

                            />
                    </View>
                    :<View style={styles.transactionLogoContainer}>
                                    <ActivityIndicator size={'large'} color="#ffdb28"/>

                    </View>}

                </View>

            </View>

        </View>

    </View>
}

export default Wallet;
