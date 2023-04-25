import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import AddresComp from '../components/addresComp';
import { memo, useState } from 'react';

const styles = StyleSheet.create({
body:{
    flex:1,
    backgroundColor:'white',
},
addAddr:{
    backgroundColor:'white',
    paddingBottom:10,
    paddingTop:10,
    paddingHorizontal:20
},

addAddrButton:{
    paddingVertical:15,
    backgroundColor:'#ffdb28',
    elevation:10,
    borderRadius:15,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
},

addAddrButtonText:{
    fontSize:19,
    fontWeight:'bold',
    
},

title:{
    paddingHorizontal:20
},

titleText:{
    fontSize:16,
    fontWeight:'600'
}

})

function AddresseGuide({navigation, addreses, route}){

    if(route.params != undefined){
        var data = route.params.readyToBuydata;

        var itemOrdered = route.params.itemnumber;

    }
    
    let [visibleCont, setVisibleCont] = useState(false)

    return <View style={styles.body}>
            <View style={styles.title}>
                <Text style={styles.titleText}>SAVED ADDRESSES</Text>
            </View>
        <FlatList
            renderItem={({item})=>(<AddresComp addrDetail={item} setVisibleCont={setVisibleCont} />)}
            data={addreses}
            keyExtractor={item=>item.id}
            ListEmptyComponent={()=><View style={{flex:1}}><Text>Enter Address</Text></View>}
            style={{flex:1}}
        />
        <View >
            <View style={styles.addAddr}>
                <TouchableOpacity style={styles.addAddrButton} onPress={()=>{navigation.navigate('AddressGuide')}}>
                    <Text style={styles.addAddrButtonText}>ADD NEW ADDRESS</Text>
                </TouchableOpacity>
            </View>
            {visibleCont &&  <View style={styles.addAddr}>
                <TouchableOpacity style={styles.addAddrButton} onPress={()=>{navigation.navigate('Order', {readyToBuydata:data, itemnumber:itemOrdered})}}>
                    <Text style={styles.addAddrButtonText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>}
           
        </View>
        
        
    </View>
}

export default memo(AddresseGuide)