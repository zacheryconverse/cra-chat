import "./App.css";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  InfiniteScrollPaginator,
  MessageInput,
  MessageInputFlat,
  MessageList,
  MessageTeam,
  Thread,
  Window,
} from "stream-chat-react";

const apiKey = process.env.REACT_APP_STREAM_KEY;
const userId = process.env.REACT_APP_STREAM_USER_ID;
const userToken = process.env.REACT_APP_STREAM_TOKEN;

const filters = { type: "messaging" };
const sort = { last_message_at: -1 };
const theme = "messaging dark";

const Paginator = (props) => (
  <InfiniteScrollPaginator threshold={300} {...props} />
);

const chatClient = StreamChat.getInstance(apiKey);

chatClient.connectUser(
  {
    id: userId,
    name: userId,
    image: "https://getstream.io/random_png/?id=calm-voice-2&name=calm-voice-2",
  },
  userToken
);

const channel = chatClient.channel("messaging", userId, {
  image: "https://www.drupal.org/files/project-images/react.png",
  name: "Talk about React",
  members: [userId],
});

function App() {
  return (
    <div className="App">
      <Chat client={chatClient} theme={theme}>
        <ChannelList filters={filters} sort={sort} Paginator={Paginator} />
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList Message={MessageTeam} />
            <MessageInput Input={MessageInputFlat} />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}

export default App;
