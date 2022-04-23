import { useContext, useEffect, useMemo, useState } from "react";
import { ChannelList, Chat, Streami18n } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { GlobalContext } from "../context/reducers/Provider";
import { Platform, TextInput, View } from "react-native";
import PlusButton from "../components/PlusButton";
import { SearchBar } from "react-native-elements";

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
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };
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
        <View style={{ borderRadius: 1 }}>
          <TextInput
            onChangeText={(value) => searchContacts(value)}
            placeholder="Search Contact"
            placeholderTextColor="grey"
            style={{
              backgroundColor: "#fff",
              height: 50,
              fontSize: 15,
              padding: 10,
              color: "black",
              borderRadius: 1,
            }}
          />
        </View>
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
