import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  EllipsisButton,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { useMemo } from 'react';
import defaultAvatar from '../static/default-avatar.jpg';
import './Chat.css';

export const Chat = (): JSX.Element => {
  const messages = useMemo(() => {
    return [
      {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "incoming",
        position: "single"
      },
      {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Patrik",
        direction: "outgoing",
        position: "single"
      },
      {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "incoming",
        position: "first"
      },
    ];
  }, []);

  return (
    <div className='chat'>
      <MainContainer responsive>                
          <Sidebar position="left" scrollable={false}>
            <Search placeholder="Search..." />
            <ConversationList>                                                     
              <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                <Avatar src={defaultAvatar} name="Lilly" status="available" />
              </Conversation>

              <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
                <Avatar src={defaultAvatar} name="Joe" status="dnd" />
              </Conversation>

              <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
                <Avatar src={defaultAvatar} name="Emily" status="available" />
              </Conversation>

              <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
                <Avatar src={defaultAvatar} name="Kai" status="unavailable" />
              </Conversation>

              <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
                <Avatar src={defaultAvatar} name="Akane" status="eager" />
              </Conversation>

              <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
                <Avatar src={defaultAvatar} name="Eliot" status="away" />
              </Conversation>

              <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you">
                <Avatar src={defaultAvatar} name="Zoe" status="dnd" />
              </Conversation>

              <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
                <Avatar src={defaultAvatar} name="Patrik" status="invisible" />
              </Conversation>                                 
            </ConversationList>
          </Sidebar>

          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src={defaultAvatar} name="Zoe" />
              <ConversationHeader.Content userName="Zoe" info="Active 10 mins ago" />
              <ConversationHeader.Actions>
                <VoiceCallButton />
                <VideoCallButton />
                <EllipsisButton orientation="vertical" />
              </ConversationHeader.Actions>          
            </ConversationHeader>

            <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
              {messages.map((msg) => (
                <Message model={msg}>
                  <Avatar src={defaultAvatar} name="Zoe" />
                </Message>
              ))}
            </MessageList>
            <MessageInput placeholder="Aa" />
          </ChatContainer>                         
        </MainContainer>
    </div>
  );
};