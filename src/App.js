import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  // InfiniteScrollPaginator,
  MessageInput,
  // MessageInputFlat,
  MessageList,
  // MessageTeam,
  Thread,
  Window,
} from "stream-chat-react";

import "./App.css";

const apiKey = process.env.REACT_APP_STREAM_KEY;
const userId = process.env.REACT_APP_STREAM_USER_ID;
const userToken = process.env.REACT_APP_STREAM_TOKEN;

const filters = { type: "messaging", members: { $in: [userId] } };
const sort = { last_message_at: -1 };
const theme = "messaging light";

const CustomChannelPreview = (props) => {
  const { channel, setActiveChannel } = props;

  const { messages } = channel.state;
  const messagePreview = messages[messages.length - 1]?.text.slice(0, 30);

  return (
    <div onClick={() => setActiveChannel(channel)} style={{ margin: "12px", cursor: 'pointer' }}>
      <div>{channel.data.name || "Unnamed Channel"}</div>
      <div style={{ fontSize: "14px" }}>{messagePreview}</div>
    </div>
  );
};

// const CustomMessage = (props) => (
//   <div>
//     <b style={{ marginRight: "4px" }}>{props.message.user.name}</b>{" "}
//     {props.message.text}
//   </div>
// );

// const Paginator = (props) => (
//   <InfiniteScrollPaginator threshold={300} {...props} />
// );

// const channel = client.channel("messaging", userId, {
//   image:
//     "https://media.geeksforgeeks.org/wp-content/uploads/20200619190327/avatar_default_19_A06A42.png",
//   name: "Talk about React",
//   members: [userId],
// });

function App() {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(apiKey);

      await client.connectUser(
        {
          id: userId,
          name: userId,
          image: "https://www.w3schools.com/w3images/avatar2.png",
        },
        userToken
      );

      setChatClient(client);
    };

    initChat();
  }, []);

  if (!chatClient) return <LoadingIndicator />;

  return (
    <Chat client={chatClient} theme={theme}>
      {/* <Chat client={chatClient} theme={theme}> */}
      <header>Stream Chat App</header>
      <ChannelList
        filters={filters}
        sort={sort}
        Preview={CustomChannelPreview}
      />
      {/* <ChannelList filters={filters} sort={sort} Paginator={Paginator} /> */}
      {/* <Channel channel={channel}> */}
      <Channel>
        <Window>
          <ChannelHeader />
          {/* <MessageList Message={MessageTeam} /> */}
          <MessageList />
          {/* <MessageList Message={CustomMessage} /> */}
          <MessageInput />
          {/* <MessageInput Input={MessageInputFlat} /> */}
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}

export default App;
