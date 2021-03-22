import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  // Attachment,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  InfiniteScrollPaginator,
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

// const chatClient = StreamChat.getInstance(apiKey);

// chatClient.connectUser(
//   {
//     id: userId,
//     name: userId,
//     image: "https://www.w3schools.com/w3images/avatar2.png",
//   },
//   userToken,
// );

// const channel = chatClient.channel("messaging", userId, {
//   image:
//     "https://media.geeksforgeeks.org/wp-content/uploads/20200619190327/avatar_default_19_A06A42.png",
//   name: "Chat about Stream",
//   members: [userId],
// });

// const attachments = [
//   {
//     image:
//       "https://images-na.ssl-images-amazon.com/images/I/71k0cry-ceL._SL1500_.jpg",
//     name: "iPhone",
//     type: "product",
//     url: "https://goo.gl/ppFmcR",
//   },
// ];

// const CustomAttachment = (props) => {
//   const { attachments } = props;
//   const [attachment] = attachments || [];

//   if (attachment?.type === "product") {
//     return (
//       <div>
//         Product:
//         <a href={attachment.url} rel="noreferrer">
//           <img alt="custom-attachment" height="100px" src={attachment.image} />
//           <br />
//           {attachment.name}
//         </a>
//       </div>
//     );
//   }

//   return <Attachment {...props} />;
// };

// const CustomChannelPreview = (props) => {
//   const { channel, setActiveChannel } = props;

//   const { messages } = channel.state;
//   const messagePreview = messages[messages.length - 1]?.text.slice(0, 30);

//   return (
//     <div
//       onClick={() => setActiveChannel(channel)}
//       style={{ margin: "12px", cursor: "pointer" }}
//     >
//       <img src={channel.data.image} alt='avatar' style={{ height: '40px', borderRadius: '5px' }}></img>
//       <div>{channel.data.name || "Unnamed Channel"}</div>
//       <div style={{ fontSize: "14px" }}>{messagePreview}</div>
//     </div>
//   );
// };

// const CustomMessage = (props) => (
//   <div>
//     <b style={{ marginRight: "4px" }}>{props.message.user.name}</b>{" "}
//     {props.message.text}
//   </div>
// );

const Paginator = (props) => (
  <InfiniteScrollPaginator threshold={5} {...props} />
);

function App() {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const client = StreamChat.getInstance(apiKey);
    const initChat = async () => {
      await client.connectUser(
        {
          id: userId,
          name: userId,
          image: "https://www.w3schools.com/w3images/avatar2.png",
        },
        userToken
      );

      // const [channelResponse] = await client.queryChannels(filters, sort);
      // await channelResponse.sendMessage({
      //   text:
      //     "Your selected product is out of stock, would you like to select one of these alternatives?",
      //   attachments,
      // });

      setChatClient(client);
    };

    initChat();
  }, []);

  if (!chatClient) return <LoadingIndicator />;

  return (
    <Chat client={chatClient} theme={theme}>
      <header>Stream Chat App</header>
      <ChannelList
        filters={filters}
        sort={sort}
        // Preview={CustomChannelPreview}
      />
      {/* <ChannelList filters={filters} sort={sort} Paginator={Paginator} /> */}
      {/* <Channel channel={channel}> */}
      <Channel>
        {/* <Channel Attachment={CustomAttachment}> */}
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
