import { FlatList, TouchableOpacity, View, Text } from "react-native"
import { memo } from "react";
import OptionButton from './optionButton';
function OptionHeader({options, handleChange, styles, active}){
    return <FlatList 
            data={options}
            horizontal={true}
            renderItem ={(item)=>(<OptionButton styles={styles} handleChange={handleChange} active={active} item={item}/>)}   
            keyExtractor={items => items.id}
            showVerticalScrollIndicator={false}
/>
}
export default memo(OptionHeader);