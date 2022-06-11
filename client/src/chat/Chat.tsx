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
} from "@chatscope/chat-ui-kit-react";
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useSocket } from '../context';
import defaultAvatar from '../static/default-avatar.jpg';
import './Chat.css';

export const Chat = (): JSX.Element => {
  const socket = useSocket();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>();
  const [msgInput, setMsgInput] = useState<string>('');

  useEffect(() => {
    socket?.emit('getConversations', (result: any) => {
      if (!result.success) {
        toast(result.message);
      } else {
        setConversations(result.data);
      }
    })
  }, [socket?.id]);

  const sendMsg = () => {
    console.log('🚀 ~ file: Chat.tsx ~ line 29 ~ msgInput', msgInput);
    setMsgInput('');
  };

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
              {conversations.map((conversation) => {
                return (
                  <Conversation
                    key={conversation._id}
                    name={conversation.email}
                    lastSenderName="Lilly" info="Yes i can do it for you"
                    active={conversation._id === selectedConversation?._id}
                    onClick={() => {
                      setSelectedConversation(conversation);
                      setMsgInput('');
                    }}
                  >
                    <Avatar src={defaultAvatar} name={conversation.fullName} />
                  </Conversation>
                );
              })}                                                
            </ConversationList>
          </Sidebar>
          
          {selectedConversation && (
            <ChatContainer>
              <ConversationHeader>
                <ConversationHeader.Back />
                <Avatar src={defaultAvatar} name={selectedConversation.email} />
                <ConversationHeader.Content userName={selectedConversation.email} info="Active 10 mins ago" />
              </ConversationHeader>

              <MessageList>
                {messages.map((msg, index) => (
                  <Message key={index} model={msg}>
                    <Avatar src={defaultAvatar} name="Zoe" />
                  </Message>
                ))}
              </MessageList>
              <MessageInput
                placeholder="Aa"
                value={msgInput}
                onChange={(_: any, textContent: string) => setMsgInput(textContent)}
                onSend={sendMsg}
              />
            </ChatContainer> 
          )}
        </MainContainer>
    </div>
  );
};