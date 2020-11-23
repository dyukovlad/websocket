import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const App = () => {
  let stompClient = null;
  useEffect(() => {
    connect();
  }, []);
  const connect = () => {
    const sockJS = new SockJS(
      `https://microservice.aniklab.com/api/smtpservice/ws`
    );
    stompClient = Stomp.over(sockJS);
    stompClient.connect(
      { headers: { Authorization: `Bearer ${localStorage.accessToken}` } },
      onConnected,
      onError
    );
  };

  const onConnected = () => {
    console.log('%conConnected ', 'font-size:3em; color: green');
    stompClient.subscribe(
      `/user/29fde02f-4442-4bd4-96c9-7781bc789fe0/queue/notifications`,
      onMessageReceived
    );
  };

  const onMessageReceived = (msg) => {
    console.log(JSON.parse(msg.body));
  };

  const onError = (err) => {
    console.log('onError');
    console.log(err);
  };
  return <div className="App">1</div>;
};

export default App;
