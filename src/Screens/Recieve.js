import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Recieve = ({route}) => {
  return (
    <View>
        <View style={{justifyContent:'center',alignItems:'center', paddingTop:50}}>
      <QRCode
      size={320}
      value="http://www.orramo.com/download"
    />
   
    </View>
    <View style={{padding:20, paddingHorizontal:34}}>
        <Text style={{fontSize:17, fontWeight:'bold'}}>
        Wallet Adrress
        </Text>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{marginTop:10}}>
            0x4WFGVQ...TQVEWTTGARG
        </Text>
        <TouchableOpacity>
        <Text style={{color:'blue', fontSize:17}}>Copy</Text>

        </TouchableOpacity>
        </View>
    </View> 
    <View style={{paddingHorizontal:20, flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Image style={{width:40,height:40, marginHorizontal:10}} source={route.params.image} />
        <Text>{route.params.symbol} Wallet</Text>
        </View>
        <View>
            <Text>0,02424BTC</Text>
            <Text>{route.params.wallet}</Text>
        </View>
       
    </View>
    <View style={{padding:20}}>
    <TouchableOpacity style={{backgroundColor:'#3D5BD7',justifyContent:'center',alignItems:'center',paddingHorizontal:150, paddingVertical:15,borderRadius: 10}}>
         <Text style={{color:'white',fontSize:18,width:200,textAlign:'center',fontWeight:'bold'}}>Share Address</Text>
    </TouchableOpacity> 
    </View>
    
    </View>
  )
}

export default Recieve

const styles = StyleSheet.create({})