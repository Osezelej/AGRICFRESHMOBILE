import { Images, commentImage, star1Image, starImage, homeImage, logoutImage, profileImage, createBottomTabNavigator, NavigationContainer, cartImage, newsImage, ModalFilter, SearchHeader, visibilityImages, PaymentOptions } from "../App";
import { Image, StyleSheet,Alert, View,   } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import Profile from "./Profile";
import NewsFeed from "../screens/newsFeed";
import Cart from "../screens/Cart";
import { Login } from "../screens/logIn";
import MarketPlace from "./marketPlace";
import { useCallback, useMemo } from "react";
import Wallet from "./Wallet";
import { Ionicons } from '@expo/vector-icons';

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

export default function FootIconsNavigaiton({state, handleState, logoImage , navigation, userProfileDetails, searchItem}) { 
    let [cartData, setCartData] = useState([]);
    const [cartBadge, setCartBadge] = useState(0) 
    const [name, setName] = useState('Cart');

    let manageCart = useCallback(()=>{
        setCartBadge(cartBadge + 1);
    })

    let manageCartMinus= useCallback(()=>{
        setCartBadge(cartBadge - 1);
    })

    let removeFromCart = useCallback((id)=>{
    setCartData(cartData.filter((value)=>value.id != id))
    manageCartMinus()
})

    let handleCartName = useCallback(()=>{
        name == 'Cart'?setName('Cart '):setName('Cart')
    })

    let removeFromCartAlert = (id, name)=>{
        Alert.alert('Remove item', `Do you want to remove item, ${name}?`, [
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
   
    let handleCartData = useCallback((item)=>{
        setCartData((prev)=>{
            let i = true;
            for (let n of prev){
                if (item.id == n.id){
                    i = false;
                    break;
                }
            }
            if (i){
                manageCart()
                return [...prev, item]
            }else{
                return[...prev]
            }
        })
        console.log(cartData)
    })

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
                handleCartName={handleCartName}
                cartData = {handleCartData}
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