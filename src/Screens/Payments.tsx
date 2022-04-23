import { StyleSheet, Text, View } from "react-native";
import {PayWithFlutterwave} from "flutterwave-react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/reducers/Provider";
import { auth, db, db1 } from "../../firebase";
import { addDoc, collection, doc, DocumentReference, getDocs, getFirestore, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Payments = () => {
  const[amount,setAmount] = useState();
  const[phoneNumber,setPhoneNumber] = useState()
  const {
    userData,
  } = useContext(GlobalContext);
  const navigation = useNavigation()

  interface RedirectParams {
    status: 'successful' | 'cancelled';
    transaction_id?: string;
    tx_ref: string;
  }

 /* An example function called when transaction is completed successfully or canceled */
  const handleOnRedirect = async(data: RedirectParams) => {
    var generate = generateHistoryId(9).toString()
      console.log(data);
      if(data.status == "successful"){

        const user = auth.currentUser;
        const UserData = {
          Account: {
            AccountNumber: userData.Account.AccountNumber,
            AccountBalance: parseInt(userData.Account.AccountBalance) + parseInt(amount)
          },
         
        }

        await Promise.all([
          updateDoc(doc(db, "users", user.uid), { ...UserData }),
            setDoc(doc(db,`users/${user.uid}/history`, data.tx_ref),{
              TransactionType: "Deposit",
              Amount: amount,
              phoneNumber: phoneNumber,
              date:serverTimestamp(),
              transactionReference:data.tx_ref,
              transactionId: data.transaction_id,
              transactionStatus: data.status,
            })
        ]);
        navigation.goBack()
      }
      else{
        console.log("Transaction failed")
        const user = auth.currentUser;
        await Promise.all([
            setDoc(doc(db,`users/${user.uid}/history`, data.tx_ref),{
              TransactionType: "Deposit",
              Amount: amount,
              phoneNumber: phoneNumber,
              date:serverTimestamp(),
              transactionReference:data.tx_ref,
              transactionStatus: data.status
            })
        ]);
      }
    };

    const generateTransactionRef = (length: number) => {
      var result = '';
      var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return `flw_tx_ref_${result}`;
    };

    const generateHistoryId = (length: number) => {
      var result = '';
      var characters =
        '0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return `${result}`;
    };
  return (
    <SafeAreaView>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 23, marginBottom:15, fontWeight:'bold'}}>Top Up Account</Text>
        <Text style={{marginBottom: 10}}>Amount: </Text>
        <View style={{ justifyContent:'flex-start'}}>
          
        <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter Amount" 
       // placeholderStyle={{}}
         style={{paddingVertical:15, paddingHorizontal:10, borderWidth:1, borderRadius:5,fontSize:18}}/>
        </View>
        <Text style={{marginBottom: 10}}>Phone Number: </Text>
        <View style={{ justifyContent:'flex-start'}}>
          
        <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
        placeholder="Enter Phone Number" 
       // placeholderStyle={{}}
         style={{paddingVertical:15, paddingHorizontal:10, borderWidth:1, borderRadius:5,fontSize:18}}/>
        </View>
      </View>
    <PayWithFlutterwave
  
     onRedirect={handleOnRedirect}
       options={{
      tx_ref: generateTransactionRef(10),
      authorization: 'FLWPUBK-11eb16aa4ec84dd239def4d1e29619dd-X',
      customer: {
        email: userData.email,
        phonenumber: phoneNumber,
        name: userData.displayName

      },
      amount: parseInt(amount),
      currency: 'XAF',
      payment_options: 'card, mobilemoneyfranco',
      customizations:{
        title:"Charge Your Orramo Account",
        description:"Chat and Send", 
        logo:"https://www.orramo.com/static/media/adaptive-icon.393c08ec.png"
      }
      
    }}
    customButton={(props) => (
      <View style={{paddingHorizontal: 20}}>
      <TouchableOpacity
        style={styles.paymentButton}
        onPress={props.onPress}
        isBusy={props.isInitializing}
        disabled={props.disabled}>
          <Text style={styles.paymentButtonText}>Deposit {amount} XAF</Text>
      </TouchableOpacity>
      </View>
    )}
/> 
   </SafeAreaView>

  );
  
}

export default Payments;

const styles = StyleSheet.create({
  paymentButton:{
    justifyContent:"center",
    backgroundColor:"#14213D",
    padding: 20,
    borderRadius:10
  },
  paymentButtonText:{
    fontSize:20,
    color: "white",
    textAlign:'center'
  }
});
