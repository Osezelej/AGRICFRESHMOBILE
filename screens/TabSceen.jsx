import { Images, commentImage, star1Image, starImage, homeImage, logoutImage, profileImage, createBottomTabNavigator, NavigationContainer, cartImage, newsImage, ModalFilter, SearchHeader } from "../App";
import { Image, StyleSheet } from "react-native";
import Profile from "./Profile";
import NewsFeed from "../screens/newsFeed";
import Cart from "../screens/Cart";
import { Login } from "../screens/logIn";
import MarketPlace from "./marketPlace";


const Tab = createBottomTabNavigator(); 
const styles = StyleSheet.create({
    image:{
        width:25,
        height:25
    },
    cartImage:{
        width:33,
        height:33
    }
})

export default function FootIconsNavigaiton({state, handleState, logoImage}) { 
    return <NavigationContainer independent={true}>
        <Tab.Navigator 
        screenOptions={{tabBarActiveTintColor:'green', tabBarStyle:{paddingVertical:7, height:55, display:'flex', paddingHorizontal:4}}}

        >
        
            <Tab.Screen  
              name = "MarketPlace"
              options={{title:"MarketPlace", animation:"slide_from_right", headerTitle: (props)=>(<SearchHeader {...props} 
                image={Images} 
                setState = {handleState}
                logoImage = {logoImage}
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
                />)}
            </Tab.Screen>

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{ headerShadowVisible:false,
                 tabBarIcon:({focused, color, size})=>(<Image source={profileImage} style={styles.image}/>)}}
            />
            <Tab.Screen 
                name="Cart"
                component={Cart}
                options={{ headerShadowVisible:false,
                 tabBarIcon:({focused, color, size})=>(<Image source={cartImage} style={styles.cartImage}/>)}}
            />
            <Tab.Screen
                name="NewsFeed"
                component={NewsFeed}
                options={{ headerShadowVisible:false,
                 tabBarIcon:({focused, color, size})=>(<Image source={newsImage} style={styles.image}/>)}}
            />
            <Tab.Screen 
                name="Logout"
                component={Login}
                options={{ headerShadowVisible:false,
                 tabBarIcon:({focused, color, size})=>(<Image source={logoutImage} style={styles.image}/>)}}
            />
        </Tab.Navigator>
    </NavigationContainer>
}