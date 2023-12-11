import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { MessageLeft, MessageRight } from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../routing/routes";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { getChatHistory } from "../api/apiService";

export default function Dashboard() {
  const [client, setClient] = useState(null);

  const navigate = useNavigate();
  const [messageList, setMessageList] = useState([]);
  const [sendMesageText, setSendMessageText] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const socket = new SockJS("http://localhost:8080/stomp");

  useEffect(() => {
    const start = async () => {
      const chatHistory = await getChatHistory(accessToken);
      setMessageList(chatHistory.data);
    };

    if (Object.is(accessToken, null) || Object.is(accessToken, undefined)) {
      navigate(ROUTE_PATHS.login);
      return;
    } else {
      start();
    }
  }, []);

  useEffect(() => {
    const startFunction = async () => {
      const newClient = Stomp.over(socket);
      if (client != null) {
        client.disconnect();
      }
      newClient.connect({}, async () => {
        newClient.subscribe("/topic/messages", (payload) => {
          console.log(payload);
          setMessageList((prev) => [...prev, JSON.parse(payload.body)]);
        });
      });

      setClient(newClient);
    };

    scrollToBottom();
    if (!Array.isArray(messageList) || messageList.length !== 0) {
      return;
    } else {
      if (Object.is(client, null)) {
        startFunction();
      }
    }
  }, [messageList]);

  const clientSend = (sentMessage) => {
    console.log(username);
    client.send(
      "/app/chat",
      {},
      JSON.stringify({
        messageText: sentMessage,
        userId: userId,
        username: username,
        msgDate: new Date(),
      })
    );
  };

  const sendMessage = () => {
    const sentMessage = sendMesageText;
    clientSend(sentMessage);

    setSendMessageText("");
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        style={{
          marginTop: "70px",
          width: "80vw",
          height: "85vh",
          maxWidth: "700px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          justifyContent: "space-between",
          paddingBottom: "10px",
        }}
      >
        <Paper
          style={{
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "auto",
            height: "calc( 100% - 80px )",
          }}
          elevation={0}
        >
          {Array.isArray(messageList) &&
            messageList.map((msg) => {
              if (msg.userId === userId) {
                //right
                return (
                  <>
                    <MessageRight
                      message={msg.messageText}
                      timestamp={new Date(msg.msgDate).toLocaleString()}
                      displayName={msg.username}
                      avatarDisp={false}
                    />
                  </>
                );
              } else {
                //left
                return (
                  <>
                    <MessageLeft
                      message={msg.messageText}
                      timestamp={new Date(msg.msgDate).toLocaleString()}
                      displayName={msg.username}
                      avatarDisp={false}
                    />
                  </>
                );
              }
            })}
          <div ref={messagesEndRef} />
        </Paper>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "95%",
            marginBottom: "10 px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="chatMessage"
            name="chatMessage"
            label="Enter chat message"
            fullWidth
            multiline
            rows={2}
            value={sendMesageText}
            onChange={(e) => setSendMessageText(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            name="chatMessageSendButton"
            id="chatMessageSendButton"
            disabled={sendMesageText.length === 0}
            onClick={(e) => sendMessage(e)}
          >
            <SendIcon />
          </Button>
        </div>
      </Paper>
    </div>
  );
}
