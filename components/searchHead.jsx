import { memo, useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    textInput:{
        paddingHorizontal:10,
        paddingVertical:5.7,
        fontSize:16, 
        borderColor:'#d0d0d0',
    },
    header:{
        display:'flex',
        flex:1,
        marginRight:80
    }
})

function SearchHead({searchWord, handleSearchTextChange}){
    const searchItem = useRef();
    useEffect(()=>{
        setTimeout(()=>{
            searchItem.current.focus();
        }, 200)
    },[])
    return <View style={styles.header}>
        <TextInput 
                    value = {searchWord}
                    placeholder='What Product do you want...'
                    style={styles.textInput}
                    collapsable = {true}
                    selectionColor = '#d0d0d0'
                    onChangeText = {handleSearchTextChange}
                    ref = {searchItem}
                />
    </View>
}


export default memo(SearchHead);