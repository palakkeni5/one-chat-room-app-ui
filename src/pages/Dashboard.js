import React, { useState, useEffect } from "react";
import { createStyles, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
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
  const theme = useTheme();
  const classes = useStyles(theme);

  const [client, setClient] = useState(null);

  const navigate = useNavigate();
  const [messageList, setMessageList] = useState([]);
  const [sendMesageText, setSendMessageText] = useState("");
  // const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const socket = new SockJS("http://localhost:8080/stomp");

  useEffect(() => {
    const startFunction = async () => {
      await getChatHistory()
        .then(async (chatHistory) => {
          setMessageList(chatHistory.data);

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
        })
        .catch((e) => {
          console.log(e);
          navigate(ROUTE_PATHS.login);
          return;
        });
    };

    if (Object.is(client, null)) {
      startFunction();
    }
  }, [client]);

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

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Paper id="style-1" className={classes.messagesBody} elevation={0}>
          {messageList.map((msg) => {
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
        </Paper>

        <div className={classes.wrapForm} noValidate autoComplete="off">
          <TextField
            id="chatMessage"
            name="chatMessage"
            label="Enter chat message"
            className={classes.wrapText}
            fullWidth
            multiline
            rows={2}
            value={sendMesageText}
            onChange={(e) => setSendMessageText(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            name="chatMessageSendButton"
            id="chatMessageSendButton"
            onClick={(e) => sendMessage(e)}
          >
            <SendIcon />
          </Button>
        </div>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      marginTop: "70px",
      width: "80vw",
      height: "85vh",
      maxWidth: "700px",
      //   maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
      justifyContent: "space-between",
      paddingBottom: "10px",
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 90px )",
    },
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      //   margin: `${theme.spacing(0)} auto`,
      marginBottom: "10 px",
    },
    button: {
      //margin: theme.spacing(1),
    },
  })
);
