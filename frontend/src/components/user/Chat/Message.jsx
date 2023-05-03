import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { FaTelegramPlane } from 'react-icons/fa'
import { useSelector } from 'react-redux';


const UserChat = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const socket = io('http://localhost:4000');
  const username = useSelector(state=>state.user.user);
  const room = '123';

  useEffect(() => {
    socket.emit('join_room', { room, username });
    socket.on("recieve_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });

    socket.on("new_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);

      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <>
      <div className="Chat-Feature">
        <div className="chat-window">
          <div className="chat-header">
            <p>Chat</p>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent) => {
                return (
                  <div
                    className="message"
                    id={username === messageContent.author ? "you" : "other"}
                    key={messageContent.time}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                        <p id="author">{messageContent.author}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Type your message..."
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => {
                e.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}><FaTelegramPlane /></button>
          </div>
        </div>
      </div>


    </>
  );
};

export default UserChat;
