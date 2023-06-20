import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    trxContainer:{
        flex:1,
        alignItems:'flex-start',
        marginVertical:5,
        borderRadius:10,
        borderBottomWidth:0.1,
        paddingBottom:10
    }, 
    trxBody:{
        marginVertical:10,
        marginLeft:3,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'98%'
    },
    footer:{
        marginLeft:3,
    },
    trxIdHead:{
        backgroundColor:'#a5f8a4',
        paddingVertical:2,
        paddingHorizontal:7,
        borderRadius:10
    },
    trxIdText:{
        fontSize:13,
        fontWeight:'600'
    },
    trxId:{
        fontSize:18,
        fontWeight:'500'
    }, 
    walletBal:{
        fontSize:20,
    }

})

function TransactionComp({item}){
    
    let Dte = new Date(item.date.slice(0, item.date.indexOf('+')));
    const weekDay = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let trxDate = Dte.getDay();
    let day = weekDay[trxDate];
    let date = Dte.getDate();
    let trxMonth = month[Dte.getMonth()];
    let year = Dte.getFullYear()
    console.log(day)
    console.log(trxMonth)

    return<View style={styles.trxContainer}>
    {item.credit_debit == 'credit'?<View style={styles.trxIdHead}>
                <Text style={styles.trxIdText}>{item.credit_debit}</Text>
            </View>:<View style={[styles.trxIdHead,  {backgroundColor:'#f8a4a4'}]}>
                <Text style={[styles.trxIdText]}>{item.credit_debit}</Text>
            </View> }
            <View style={styles.trxBody}>
                <Text style={styles.trxId}>{item.transaction_Id}</Text>
                {item.credit_debit == 'credit'?<Text style={styles.walletBal}>+{item.walletBal}</Text>:<Text style={styles.walletBal}>-{item.walletBal}</Text>}
            </View>
            <View style={styles.footer}>
                <Text style={styles.dayOfTrx}>{day}, {date}, {trxMonth}, {year}.  </Text>
            </View>
    </View>
}
export default TransactionComp;