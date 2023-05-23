import {View, FlatList, Text, StyleSheet} from 'react-native';
import {ActivityIndicator} from '@react-native-material/core'
import {memo} from 'react';

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white'
    }
})

function Search({activeIndicator}){
    return<View style={styles.body}>
        {activeIndicator && <ActivityIndicator color='#ffdb28' size={'large'}/>}

    </View>
}

export default memo(Search);

