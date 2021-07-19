import { discussWSEndPoint } from '../config/api';
import { v4 as uuidv4 } from 'uuid';
import humps from 'humps';
import dayjs from 'dayjs';

export default (() => {
  let ws = null;

  const start = (token) => {
    const WSEndPoint = `${discussWSEndPoint}?token=${token}`

    if (ws == null || ws.readyState !== ws.CLOSING || ws.readyState !== ws.CLOSED) {
      ws = new WebSocket(WSEndPoint);
    }
  }

  const sendTextToDiscussion = async (discussionId, content) => {
    const message = {
      id: uuidv4(),
      contentType: 'message.content.text',
      content: content,
      receiverType: "message.receiver.discussion",
      receiverId: discussionId,
      user: null,
      createdAt: dayjs().toISOString(),
    };

    if (ws.readyState !== ws.OPEN) {
      return Promise.reject("Not connected to the server");
    }

    const formatedMessage = JSON.stringify(humps.decamelizeKeys(message));
    ws.send(formatedMessage)
    return Promise.resolve(message)
  }

  const sendImageToDiscussion = async (discussionId, content) => {
    const message = {
      id: uuidv4(),
      contentType: 'message.content.image',
      content: content,
      receiverType: "message.receiver.discussion",
      receiverId: discussionId,
      user: null,
      createdAt: dayjs().toISOString(),
    };

    if (ws.readyState !== ws.OPEN) {
      return Promise.reject("Not connected to the server");
    }

    const formatedMessage = JSON.stringify(humps.decamelizeKeys(message));
    ws.send(formatedMessage)
    return Promise.resolve(message)
  }

  const listenToIncomingMessage = (listener) => {
    ws.onopen = () => console.log("Connected to the server")
    ws.onclose = () => console.log("Disconnected from the server")
    ws.onmessage = (jsonMessage) => {
      console.log(jsonMessage)
      const message = JSON.parse(jsonMessage);
      listener(message);
    }
  }

  const close = () => {
    ws.close()
  }

  return {
    start,
    sendTextToDiscussion,
    sendImageToDiscussion,
    listenToIncomingMessage,
    close,
  }
})();
