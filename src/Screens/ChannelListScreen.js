import { useContext, useEffect, useMemo } from "react";
import { ChannelList, Chat, Streami18n } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { GlobalContext } from "../context/reducers/Provider";
import { Platform, View } from "react-native";
import PlusButton from "../components/PlusButton";

const sort = { last_message_at: -1 };
const options = {
  state: true,
  watch: true,
};
const streami18n = new Streami18n({
  language: "en",
});
export const ChannelListScreen = ({ navigation }) => {
  const { userData } = useContext(GlobalContext);
  const filters = {
    type: "messaging",
    members: { $in: [userData.uid] },
  };
  const { setChannel } = useContext(GlobalContext);
  const API_KEY = "n7duuv99yqcx";
  const client = StreamChat.getInstance(API_KEY);

  const memoizedFilters = useMemo(() => filters, []);

  return (
    <Chat client={client} i18nInstance={streami18n}>
      <View style={{ height: "100%" }}>
        <PlusButton />
        <ChannelList
          filters={memoizedFilters}
          onSelect={(channel) => {
            setChannel(channel);
            navigation.navigate("Channel");
          }}
          options={options}
          sort={sort}
        />
      </View>
    </Chat>
  );
};
