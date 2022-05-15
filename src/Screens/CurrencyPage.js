import {  FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import SendMoneyModal from '../components/SendMoney/SendMoneyModal';
import { GlobalContext } from '../context/reducers/Provider';

const data2 = [
    {
        key:1,
        operation:'Sent',
        address:'0x9S...VNNAFKKSJFJJFAKKS',
        AmountCoin:'0.3434',
        dollar:'$3,433'
    },
    {
        key:2,
        operation:'Recieved',
        address:'0x9SF...FKKSJFJJFAKKS',
        AmountCoin:'0.3434',
        dollar:'$3,433'
    },
    {
        key:3,
        operation:'Widthdraw',
        address:'0x9SF...FKKSJFJJFAKKS',
        AmountCoin:'0.3434',
        dollar:'$3,433'
    },
    {
        key:4,
        operation:'Buy',
        address:'0x9S...FKKSJFJJFAKKS',
        AmountCoin:'0.3434',
        dollar:'$3,433'
    },
    {
        key:5,
        operation:'Sent',
        address:'0x9S...CAKSJFJJFAKKS',
        AmountCoin:'0.3434',
        dollar:'$3,433'
    },{
        key:6,
        operation:'Sent',
        address:'0x9S...CAKSJFJJFAKKS',
        AmountCoin:'0.3434',
        dollar:'$3,433'
    }
];

const CurrencyPage = ({navigation,route}) => {
    const { setModalVisible, modalVisible } = useContext(GlobalContext);

    const renderItem = ({ item }) => (
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent:'space-between',
              backgroundColor: "white",
              borderRadius: 20,
              paddingVertical: 23,
              marginRight: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0.5 },
              shadowOpacity: 0.1,
              shadowRadius: 0.5,
              paddingHorizontal:10
            }}
          >
                <View
              style={{
                marginHorizontal:5 ,flexDirection:'row'     
              }}
            >
              <Ionicons name= {item.operation == "Sent" ? "arrow-up-circle-outline" :item.operation =="Recieved" ?  "arrow-up-circle-outline" :item.operation == "buy"? "add-circle-outline" : "wallet-outline"}  size={25} />
              <View style={{flexDirection:'column',marginHorizontal:6}}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item.operation}</Text>
              <Text style={{ fontSize: 15, color: "grey" }}>{item.address}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              
              
              <View>
              <Text style={{ marginTop: 0, fontSize: 17,fontWeight:'bold' }}>{item.AmountCoin} BTC</Text>
            <Text style={{fontSize:13, color:'grey', textAlign:'right'}}>{item.dollar}</Text>
              </View>
            </View>
          
          </View>
        </TouchableOpacity>
      );


  return (
      <>
    <View style={{backgroundColor:"#F4F7FD", paddingTop:20}}>
        <View style = {{paddingHorizontal:30}}>
        <View style={{justifyContent:'center',alignItems:'center',paddingTop:23}}>
        <Image style={{width:60,height:60}} source = {route.params.image}/>

            <View style={{flexDirection:'column', justifyContent:'center'}}>
            <Text style={{fontSize:30, marginTop: 8,marginHorizontal:10, color:'black',textAlign:'center',fontWeight:'bold'}}>
                0.023224 {route.params.symbol}
            </Text>

            </View>
        <Text style={{fontSize:20, marginTop:15,color:'#14213D'}}>{route.params.wallet}</Text>
        <View>
      
        </View>
        </View>
        <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between', paddingTop:35}}>
            <View style={{flexDirection:'column'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('buy')} style={{backgroundColor:'#3D5BD7', borderRadius:50,justifyContent:'center',alignItems:'center',width:55,height:55}}>
                <Ionicons name="add-outline" size = {30} color = "white" />
            </TouchableOpacity>
            <Text style={{textAlign:'center',marginVertical:12, fontWeight:'500'}}>Buy</Text>

            </View>
            <View  style={{flexDirection:'column'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('withdraw')}  style={{backgroundColor:'#3D5BD7', borderRadius:50,justifyContent:'center',alignItems:'center',width:55,height:55}}>
            <Ionicons name="wallet-outline" size = {30} color = "white" />
            </TouchableOpacity>
            <Text style={{textAlign:'center',marginVertical:12, fontWeight:'500'}}>Sell</Text>

            </View>
            <View  style={{flexDirection:'column'}}>
            <TouchableOpacity onPress={()=>setModalVisible(true)} style={{backgroundColor:'#3D5BD7', borderRadius:50,justifyContent:'center',alignItems:'center',width:55,height:55}}>
            <Ionicons name="arrow-up-outline" size = {25} color = "white" />
            </TouchableOpacity>
            <Text style={{textAlign:'center',marginVertical:12, fontWeight:'500'}}>Send</Text>

            </View>
            <View  style={{flexDirection:'column'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('recieve',{
                coin: route.params.coin,
                symbol: route.params.symbol,
                wallet: route.params.wallet,
                image:route.params.image
            })} style={{backgroundColor:'#3D5BD7', borderRadius:50,justifyContent:'center',alignItems:'center',width:55,height:55}}>
            <Ionicons name="arrow-down-outline" size = {25} color = "white" />
            </TouchableOpacity>
            <Text style={{textAlign:'center',marginVertical:12, fontWeight:'500'}}>Recieve</Text>

            </View>
        </View>
        
        </View>
      
    </View>
       <FlatList
       style={{backgroundColor:'white',borderTopRightRadius:20,borderTopLeftRadius:20}}
          data={data2}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
        <SendMoneyModal/>
    </>
  )
}

export default CurrencyPage

const styles = StyleSheet.create({})

