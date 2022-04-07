import React, { createContext, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { Tab } from "react-native-elements";
import { chatData } from "../../Screens/Main/ChatData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState({
    name: "United States",
    code: "USD",
    currencyName: "Dollar",
    flag: "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERTc5MkI3RjE3OEExMUUyQTcxNDlDNEFCRkNENzc2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERTc5MkI4MDE3OEExMUUyQTcxNDlDNEFCRkNENzc2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyMTE0RjIyMTc4QTExRTJBNzE0OUM0QUJGQ0Q3NzY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRFNzkyQjdFMTc4QTExRTJBNzE0OUM0QUJGQ0Q3NzY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+60cYSwAAAyhJREFUeNrElN1PU3cYxz/tOQUBD/aNymtbUAq2IOiUWXmZA40Iy2BzcW53y7JlyZLtZuE/8NaY7Gbe7WJbdJnTDOdQCbLKrERUotgCSodQ7AsFpK28yKT7rfsL2gv7JCcn+eV3zpPv5/l+H9X2xp65SqtJGfr1Fg3vNPD02SIhfwRniwP3pdvsOVxPaCHGs7+DOA/VJs8crXXEs3P48OfTfMIcU+SRaqlMzm8SNut2VuefIxvyydZIxFbWyX35iviLNZRiPZJaxdLyCkoiQUyc6cwFTPvC9FRkcbJMy7JaTrmxHIuvxaZm5xW7+Jl3NkKRaRt5OVlMjvuoqa9gwr9AgS4PvTYP78hjdtVVEAw9J+Kdxv7Td+hL8tGTeslGg8Jeexk3/riLs62O+cU441NBDjbZGbg+SlNbPYvRF9zzzHCoycFA/yhvCtRqnZbr5a1YEjGm5S2po1ZXfRHVaCTlWLODq24v1eWFGPVbuXH5Dh3vORm88xhziR5zoZ5rl9y0dx/ggS/EzGSQs5Ua3s39h7CUlbri0mKdUGzmijBXqzBXYH4Z931fsmlf7zBvd+wjIigMDI/TcbyRvt+GOSgUZ62uU3S2h8IdRgrTQK1S2T6PyhpZ+aB9LxcF2hpbCUUF27hy4S+Of/wWfUMeykuNVIin9/xNuj9qYWR8juknIc5szNC1voA/DdSypayAhlor57/vp/NEC7OBRfpveek+0cwvP/7JsfedhEWcLg8+pOtkMxfOuTjc5WSrSc+S6ymSQYtGyk5dsVT9/4zbhZmu3Z5IztggXOwSZjvSuZ+hUR9mEan/KAz+PkJb5z7GngSYdXu46T9Ho3EL6ZSKnZ9Fax0W5aFrDNuB6mROA6El7BYTnns+bPt3srK2gV+QcIjIPRLzrxL3ZkLLfB0c40udRCAd1EfFNioxaSG+Sl2NmchSnCKjwh6HBWlzk/rd1uTyMOTn8MbuctRiieyqLKbKbqXs4gSvQmFephOnRCIRFW+F11yyp/3TtD/eSKjYTM4rjcZh110yUZlDPfnVqcwovkppRhRnDrX/2x+UjKDuJXcuE4r/FWAAjBMttNdoYOEAAAAASUVORK5CYII=",
  });
  const [toCurrency, setToCurrency] = useState({
    name: "Cameroon",
    code: "XAF",
    currencyName: "Franc",
    flag: "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAIAAAAVyRqTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNkJDNTBGNTE3NzMxMUUyODY3Q0FBOTFCQzlGNjlDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNkJDNTBGNjE3NzMxMUUyODY3Q0FBOTFCQzlGNjlDRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE2QkM1MEYzMTc3MzExRTI4NjdDQUE5MUJDOUY2OUNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE2QkM1MEY0MTc3MzExRTI4NjdDQUE5MUJDOUY2OUNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+KAzx3QAAAHJJREFUeNpiZKiKY8ANTneexCNreO49HlkmBpqBUaNHjaaO0X/+Mkpmf5cq/vbnL7FaWIhUp9T4VTT2BwMzA6sQw8NqLmq6+sMxFkb5v4xyfz6dZqayq5nZGJ5k8zL8IyFyiDX6/Ta20cQ3avSQMRogwADcmBpIZYNhTQAAAABJRU5ErkJggg==",
  });

  const [tempCode, setTempCode] = useState({});
  const [from, setFrom] = useState(true);
  const [udatedCount, setUpdatedCount] = useState(0);
  const [update, setUpdate] = useState(false);
  const [values, setValues] = useState("10000"); //The amount entered by the user
  const [service, setSevirce] = useState("orange"); //Handles the services
  const [type, setType] = useState("withdraw"); //Handles the operation
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]); //Handles the data gotten from the apo
  const [data2, setData2] = useState([]); //Handles the data gotten from the apo

  const [loading, isLoading] = useState(false);
  const [cal, isCalc] = useState(false);
  const [pressed, isPressed] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [title, setTitle] = useState("Orramo");
  const [dataChat, setDataChat] = useState(chatData);
  const [chatDatas, setChatDatas] = useState([]);
  const [chatId, setChatId] = useState();
  const [balance, setBalance] = useState("1,000,000");
  const [receivedAmount, setReceivedAmount] = useState("0");
  const [headerShown, setHeaderShown] = useState(true);
  const [sentAmount, setSentAmount] = useState("0");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signed, isSigned] = useState(false);
  const [logged, isLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [isImageLoading, setImageLoading] = useState(false);
  const [contactList, setContactList] = useState([])

  const handleFirstName = () => {
    setFirstName(firstName);
  };

  const handleLastName = () => {
    setLastName(lastName);
  };
  const [storedCredentials, setStoredCredentials] = useState({});

  const storeData = async (token) => {
    try {
      await AsyncStorage.setItem("userToken", JSON.stringify(token));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        udatedCount,
        setUpdatedCount,
        update,
        setUpdate,
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        from,
        setFrom,
        tempCode,
        setTempCode,
        values,
        setValues,
        service,
        setSevirce,
        type,
        setType,
        modalVisible,
        setModalVisible,
        data,
        setData,
        loading,
        isLoading,
        cal,
        isCalc,
        pressed,
        isPressed,
        modalVisible2,
        setModalVisible2,
        data2,
        setData2,
        title,
        setTitle,
        chatId,
        setChatId,
        firstName,
        setFirstName,
        balance,
        setBalance,
        receivedAmount,
        setReceivedAmount,
        sentAmount,
        setSentAmount,
        handleFirstName,
        handleLastName,
        dataChat,
        setDataChat,
        signed,
        isSigned,
        userData,
        setUserData,
        isImageLoading,
        setImageLoading,
        storedCredentials,
        setStoredCredentials,
        storeData,
        logged,
        isLogged,
        chatDatas,
        setChatDatas,
        loggedUser,
        setLoggedUser,
        contactList, setContactList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
