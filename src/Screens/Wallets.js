import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


const data = [
    {
      key: 1,
      coin: "Bitcoin",
      symbol: "BTC",
      wallet: "XAF 150,000",
      image: require("../../assets/opengraph.png"),
    },
    {
      key: 2,
  
      coin: "Ethereum",
      symbol: "ETH",
      wallet: "XAF 50,000",
      image: require("../../assets/etherum.jpg"),
    },
    {
      key: 3,
  
      coin: "USDTTether",
      symbol: "USDT",
      wallet: "XAF 50,000",
      image: require("../../assets/825.png"),
    },
  ];
  
const Wallets = ({navigation}) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=> navigation.navigate('Currency Page',{
          coin: item.coin,
          symbol: item.symbol,
          wallet: item.wallet,
          image:item.image
        })}>
          <View
            style={{
              marginTop: 15,
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
            }}
          >
                <View
              style={{
                marginHorizontal:5 ,flexDirection:'row'     
              }}
            >
              <Image style={{ width: 33, height: 33 }} source={item.image} />
              <View style={{flexDirection:'column',marginHorizontal:6}}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item.coin}</Text>
              <Text style={{ fontSize: 15, color: "grey" }}>{item.symbol}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              
              
              <View>
              <Text style={{ marginTop: 0, fontSize: 18,fontWeight:'bold' }}>{item.wallet}</Text>

              </View>
            </View>
          
          </View>
        </TouchableOpacity>
      );
  return (
    <View style={{backgroundColor:'#fff',flex:1}}>
      <View style={{justifyContent:'center', alignItems:'center',backgroundColor:'#F4F7FD',height:300}}>
        <Text style={{color:'#000'}}>@ato237</Text>
        <Text style={{fontSize:30,color:'#000',fontWeight:'bold',paddingTop:10}}>XAF 250,000</Text>
        <Text style={{color:'#000'}}>$456</Text>
      </View>
      <View style={{padding:20}}>
      <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </View>
      
    </View>
  )
}

export default Wallets

const styles = StyleSheet.create({})