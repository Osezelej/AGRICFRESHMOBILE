import {Pressable, StyleSheet, View, Text} from 'react-native';
import { memo } from 'react';
import { ListItem } from '@react-native-material/core';
import {MaterialIcons} from '@expo/vector-icons';

const styles = StyleSheet.create({
    body:{
    },
    title:{
        fontSize:13,
        fontWeight:'600',  
    },
    titleHead:{
        paddingVertical:2,
        paddingHorizontal:7,
        borderRadius:10,
        marginBottom:10
    },
    text:{
        fontSize:18,
        fontWeight:'500'   
    }
})

function OrderHistoryComp({data, navigation}){
    let Dte = new Date(data.created_at.slice(0, data.created_at.indexOf('+')));
    const weekDay = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let trxDate = Dte.getDay();
    let day = weekDay[trxDate];
    let date = Dte.getDate();
    let trxMonth = month[Dte.getMonth()];
    let year = Dte.getFullYear()
    


    if(data.status.toLowerCase() == 'pending'){
        return <ListItem
                    title={<Text style={styles.text}>{data.order_id}</Text>}
                    overline={<View style={{
                        flexDirection:'row'
                    }}>
                        <Text style={[styles.title, {color:'#888888'}]}>Status:  </Text>
                        <View style={[styles.titleHead , {backgroundColor:'#ffaf28'}]}>
                            <Text style={styles.title}>{data.status}</Text>
                        </View> 
                    </View>}
                    trailing={props =><MaterialIcons name='chevron-right' {...props}/>}
                    secondaryText={`${day}, ${date}, ${trxMonth}, ${year}.`}
                    onPress = {()=>{navigation.navigate('orderItem', {order_id:data.order_id})}}
    />
    }else if(data.status.toLowerCase() == 'delivered'){
        
        return <ListItem
                    title={<Text style={styles.text}>{data.order_id}</Text>}
                    overline={<View style={{
                        flexDirection:'row'
                    }}>
                        <Text style={[styles.title, {color:'#888888'}]}>Status:  </Text>
                        <View style={[styles.titleHead , {backgroundColor:'#a5f8a4'}]}>
                            <Text style={styles.title}>{data.status}</Text>
                        </View> 
                    </View>}
                    trailing={props =><MaterialIcons name='chevron-right' {...props}/>}
                    secondaryText={`${day}, ${date}, ${trxMonth}, ${year}.`}
                    onPress = {()=>{navigation.navigate('orderItem', {order_id:data.order_id})}}
    />
    }else{
        return <ListItem
                title={<Text style={styles.text}>{data.order_id}</Text>}
                overline={<View style={{
                        flexDirection:'row'
                    }}>
                        <Text style={[styles.title, {color:'#888888'}]}>Status:  </Text>
                        <View style={[styles.titleHead , {backgroundColor:'#f8a4a4'}]}>
                            <Text style={styles.title}>{data.status}</Text>
                        </View> 
                    </View>}
                    trailing={props =><MaterialIcons name='chevron-right' {...props}/>}
                    secondaryText={`${day}, ${date}, ${trxMonth}, ${year}.`}
                    onPress = {()=>{navigation.navigate('orderItem', {order_id:data.order_id})}}
    />
    }
}

export default memo(OrderHistoryComp);