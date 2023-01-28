import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

export var Animated_page =({image})=>{
    return<ScrollView>
        <View style={styles.body}>
                <View style={styles.imageContainer}>
                        <Image source={image} style={styles.imageStyle}/>
                </View>
                <View style={styles.bottomImage}>

                </View>
                <View style={styles.firstCircle}></View>
                <View style={styles.secondCircle}></View>
                <View style={styles.thirdCircle}></View> 
        </View>
    
    </ScrollView>
     
}

const styles = StyleSheet.create({
    imageContainer:{
        backgroundColor:'#fff',
        
    },
    imageStyle:{
        width:320,
        height:320,  
        alignSelf:'center'
    },
    bottomImage:{
        backgroundColor:'#ffdb28',
        height:190,
        width:120,
        position:'absolute',
        bottom:5,
        left:-50,
        transform:[{rotate:'45 deg'}, {scale:2.4}],
        borderRadius:7,
        borderColor:'green',
        borderWidth:1.4

      },
      body:{
        flex:1,
      },
      firstCircle:{
        height:37,
        width:37,
        backgroundColor:'green',
        position:'absolute',
        right:'23%',
        bottom:'12%',
        borderRadius:50,
        transform:[{skewY:'25 deg'}]
      },
      secondCircle:{
        height:30,
        width:30,
        backgroundColor:'green',
        position:'absolute',
        right:'17%',
        bottom:'7.5%',
        borderRadius:50,
        transform:[{skewY:'25 deg'}]
      },
      thirdCircle:{
        height:20,
        width:20,
        backgroundColor:'green',
        position:'absolute',
        right:'12 %',
        bottom:'4%',
        borderRadius:50,
        transform:[{skewY:'25 deg'}]
      },
})