import { useContext, useEffect } from "react";
import {
  AttachButton,
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Streami18n,
  useAttachmentPickerContext,
  useChannelPreviewDisplayAvatar,
  useChannelPreviewDisplayName,
  useChannelPreviewDisplayPresence,
  useMessageInputContext,
} from "stream-chat-expo";
import { useHeaderHeight } from "@react-navigation/elements";
import { GlobalContext } from "../context/reducers/Provider";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StreamChat, Channel as ChannelType } from "stream-chat";
import {
  useActionSheet,
  ActionSheetProvider,
} from "@expo/react-native-action-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";

const API_KEY = "n7duuv99yqcx";
const client = StreamChat.getInstance(API_KEY);
const streami18n = new Streami18n({
  language: "en",
});
export const ChannelScreen = ({ navigation, route }) => {
  const { channel } = useContext(GlobalContext);
  const headerHeight = useHeaderHeight();
  const { setTopInset } = useAttachmentPickerContext();
  useEffect(() => {
    setTopInset(headerHeight);
  }, [headerHeight]);
  const themeStyle = {
    messageSimple: {
      content: {
        containerInner: {
          backgroundColor: "#2964A0",
          borderColor: "#2964A0",
        },
        markdown: {
          text: {
            color: "#fff",
          },
          autolink: {
            color: "#eee",
          },
          heading4: {
            color: "#fff",
          },
        },
      },
    },
  };

  return (
    <SafeAreaView>
      <Chat client={client} i18nInstance={streami18n}>
        <Channel
      
          myMessageTheme={themeStyle}
          channel={channel}
          keyboardVerticalOffset={headerHeight}
          messageActions={({
            quotedReply,
            copyMessage,
            editMessage,
            isMyMessage,
            deleteMessage,
          }) =>
            isMyMessage
              ? [
                  quotedReply,
                  copyMessage,
                  editMessage,

                  {
                    ...deleteMessage,
                    textStyle: {
                      color: "red",
                      fontWeight: "bold",
                    },
                  },
                ]
              : [quotedReply, copyMessage]
          }
        >
          <View style={{ flex: 1 }}>
            <MessageList />
            <MessageInput />
          </View>
        </Channel>
      </Chat>
    </SafeAreaView>
  );
};
