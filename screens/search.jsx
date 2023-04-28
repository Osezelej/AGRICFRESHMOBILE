import {View, FlatList, Text, StyleSheet} from 'react-native';
import {memo} from 'react';

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white'
    }
})

function Search(){
    return<View style={styles.body}>

    </View>
}

export default memo(Search);

