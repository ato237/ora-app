import { useContext, useEffect } from "react";
import { Channel, Chat, MessageInput, MessageList,Streami18n, useAttachmentPickerContext, } from "stream-chat-expo";
import { useHeaderHeight } from '@react-navigation/elements';
import { GlobalContext } from "../context/reducers/Provider";
import { SafeAreaView, View } from "react-native";
import {StreamChat} from 'stream-chat'

const API_KEY = "n7duuv99yqcx"
const client = StreamChat.getInstance(API_KEY);
const streami18n = new Streami18n({
  language: 'en',
});
export const ChannelScreen = ({ navigation }) => {
    const { channel} = useContext(GlobalContext);
    const headerHeight = useHeaderHeight();
    const { setTopInset } = useAttachmentPickerContext();
  
    useEffect(() => {
      setTopInset(headerHeight);
    }, [headerHeight]);
  
    return (
      <SafeAreaView>
        <Chat client={client} i18nInstance={streami18n}>
          <Channel channel={channel} keyboardVerticalOffset={headerHeight}>
            <View style={{ flex: 1 }}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  };