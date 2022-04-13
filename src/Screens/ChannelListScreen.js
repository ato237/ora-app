import { useContext, useMemo } from "react";
import { ChannelList, Chat, Streami18n,  } from "stream-chat-expo";
import {StreamChat} from 'stream-chat'
import { GlobalContext } from "../context/reducers/Provider";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

const filters = {
  example: 'example-apps',
  members: { $in: ['ron'] },
  type: 'messaging',
};
const sort = { last_message_at: -1 };
const options = {
  state: true,
  watch: true,
};
const streami18n = new Streami18n({
  language: 'en',
});
export const ChannelListScreen = ({ navigation }) => {
    const { setChannel } = useContext(GlobalContext);
    const API_KEY = "n7duuv99yqcx"
    const client = StreamChat.getInstance(API_KEY);
    const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicm9uIn0.eRVjxLvd4aqCEHY_JRa97g6k7WpHEhxL7Z4K4yTot1c';
  const user = {
    id: 'ron',
  };
  
    const memoizedFilters = useMemo(() => filters, []);
    return (
      <Chat client={client} i18nInstance={streami18n}>
        <View style={{ height: '100%' }}>
          <ChannelList
           // filters={memoizedFilters}
            onSelect={(channel) => {
              setChannel(channel);
              navigation.navigate('Channel');
            }}
            options={options}
            sort={sort}
          />
        </View>
      </Chat>
    );
  };