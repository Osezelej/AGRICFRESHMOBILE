import { Images, commentImage, star1Image, starImage, homeImage, logoutImage, profileImage, createBottomTabNavigator, NavigationContainer, cartImage, newsImage, ModalFilter, SearchHeader, visibilityImages, PaymentOptions } from "../App";
import { Image, StyleSheet,Alert, View,   } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import NewsFeed from "../screens/newsFeed";
import Cart from "../screens/Cart";
import { Login } from "../screens/logIn";
import MarketPlace from "./marketPlace";
import { useCallback, useMemo } from "react";
import Wallet from "./Wallet";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator(); 
const styles = StyleSheet.create({
    image:{
        width:27,
        height:27
    },
    cartImage:{
        width:35,
        height:35
    }
})

export default function FootIconsNavigaiton({
    state, 
    handleState, 
    logoImage , 
    navigation, 
    userProfileDetails, 
    searchItem, 
    route,
    cartData, 
    setCartData,
    handleCartData,
    cartBadge,
    setCartBadge,
    manageCart,
    marketData,
    setMarketData,
    d,
    setD,
    setFilteredData,
    filteredData,
    balance,
    setBalance
}) { 
    let email = route.params.email
    const [name, setName] = useState('Cart');



    let manageCartMinus= useCallback(()=>{
        setCartBadge(cartBadge - 1);
    })

    let removeFromCart = useCallback((id)=>{
    setCartData(cartData.filter((value)=>value.id != id))
    manageCartMinus()
})

    let getEmail = useCallback(async()=>{
        await AsyncStorage.setItem('userEmail', JSON.stringify({email:route.params.email}))
    })

    useEffect(()=>{getEmail()},[])
        

        async function getCartData (){
            await AsyncStorage.getItem('cartData', (e, result)=>{
                console.log(result)
            })
        }
       
    
    let removeFromCartAlert = (id, name)=>{
        Alert.alert('\b Remove item', `Do you want to remove item, ${name}?`, [
            {
                text:'cancel',
                isPreferred:true,
                style:'cancel',
            },
            {
                text:'OK',
                style:'destructive',
                onPress:()=>removeFromCart(id)
            }
        ], {cancelable:true})
    }
   


  
   useEffect(()=>{
    async function addData (){
        let value = JSON.stringify(cartData)
        await AsyncStorage.setItem('cartData', value)
        .then((c)=>{
            console.log(c)
        })
    }
    addData()
   },[cartData])

    return<View style={{flex:1}}>
                 <StatusBar/>
                 <NavigationContainer independent={true} >
       
        <Tab.Navigator 
        screenOptions={{tabBarActiveTintColor:'green', tabBarStyle:{paddingVertical:7, height:55, display:'flex', paddingHorizontal:4}}}

        >
         
            <Tab.Screen  
              name = "MarketPlace"
              options={{title:"MarketPlace", animation:"slide_from_right", headerTitle: (props)=>(<SearchHeader {...props} 
                image={Images} 
                setState = {handleState}
                logoImage = {logoImage}
                navigation = {navigation}
                searchItem = {searchItem}
                />),
                 headerShadowVisible:false,
                 tabBarIcon:({focused, color, size})=>(<Image source={homeImage}  style={styles.image}/>)
                 }}
                
            >
                 {(props)=>(<MarketPlace {...props}
                images={[
                {image:homeImage, isactive:true},
                {image:profileImage, isactive:false},
                {image:cartImage, isactive:false},
                {image:newsImage, isactive:false}, 
                {image:logoutImage, isactive:false}
                ]}
                contentImages={[star1Image, starImage, commentImage]}
                Modal={ModalFilter}
                state = {state}
                setState = {handleState}
                navigation = {navigation}
                manageCart ={manageCart}
                cartData = {handleCartData}
                email={email}
                marketData = {marketData}
                setMarketData={setMarketData}
                d={d}
                setD={setD}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                />)}
            </Tab.Screen>

            <Tab.Screen 
                name="Cart"
                
                options={{ headerShadowVisible:false,
                 tabBarIcon:({focused, color, size})=>(<Image source={cartImage} style={styles.cartImage}/>),
                 tabBarBadge:cartBadge,
                 tabBarBadgeStyle:{backgroundColor:'#ffdb28', fontSize:13, fontWeight:'bold'},
                 headerTitle: (props)=>(<SearchHeader {...props} 
                 image={Images} 
                 setState = {handleState} 
                 logoImage = {logoImage} 
                 navigation={navigation}

                 />),
                 
                 }}
            >
                {(props)=><Cart {...props}
                    name={name} 
                    manageCartMinus={manageCartMinus}  
                    cartData = {cartData}
                    removeItem = {removeFromCartAlert}
                    navigation = {navigation}
                    image = {cartImage}
                    getItem = {getCartData}
                    balance={balance}
                />}
            </Tab.Screen>
            <Tab.Screen
              name='Wallet'
              options={{
                headerShadowVisible:false,
                headerTitleAlign:'center',
                animation:'slide_from_right',
                tabBarIcon:({focused, color, size})=>(<Ionicons name="ios-wallet-outline" size={30} color="black" />),
                
              }}
            >
              {(props)=><Wallet {...props} 
                          visibilityImages={visibilityImages}
                          cardOption = {PaymentOptions}
                          navigation={navigation}
                          balance={balance}
                          setBalance={setBalance}
              />}
            </Tab.Screen>

            <Tab.Screen
                name="NewsFeed"
                component={NewsFeed}
                options={{ headerShadowVisible:false,
                 tabBarIcon:({focused, color, size})=>(<Image source={newsImage} style={styles.image}/>)}}
            />
            
            <Tab.Screen
                name="Profile"
                
                options={{ headerShadowVisible:false,
                 tabBarIcon:({focused, color, size})=>(<Image source={profileImage} style={styles.image}/>),
                 title:'User Profile',
                 }}
                
            >
                {(props)=>(<Profile userIcon={profileImage} userProfileDetails={userProfileDetails} navigation={navigation}/>)}
            </Tab.Screen>
           
        </Tab.Navigator>
    </NavigationContainer>
    </View> 
}