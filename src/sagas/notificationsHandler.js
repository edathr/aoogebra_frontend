import { message } from 'antd';

export default function* notificationsHandler(messageLevel, messageContent) {
  message.config({
    duration: 1,
  });

  try {
    yield message[messageLevel](messageContent);
  } catch {
    yield message.info(messageContent);
  }
}
