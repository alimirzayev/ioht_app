import TcpSocket from 'react-native-tcp-socket';
import React, { useState } from 'react';
import {
  SafeAreaView, Text,
} from 'react-native';

function App(): JSX.Element {
  const [data, setData] = useState<string>();

  const server = TcpSocket.createServer(function (socket) {
    socket.on('data', (data) => {
      console.log('We are getting data');
      console.log(data);
    });

    socket.on('error', (error) => {
      console.log('An error ocurred with client socket ', error);
    });

    socket.on('close', (error) => {
      console.log('Closed connection with ', socket.address());
    });
  }).listen({ port: 1993, host: '0.0.0.0' });

  server.on('error', (error) => {
    console.log('An error ocurred with the server', error);
  });

  server.on('close', () => {
    console.log('Server closed connection');
  });

  // const client = TcpSocket.createConnection({ port: 1993, host: '0.0.0.0' }, () => { });

  // client.on('data', (data) => {
  //   console.log(data);
  //   setData(data.toString())
  // });

  // client.on('error', (error) => {
  //   console.log(error);
  // });

  // client.on('close', () => {
  //   console.log('Connection closed');
  // });

  return (
    <SafeAreaView >
      <Text style={{ fontSize: 30, textAlign: 'center' }}>{data}</Text>
    </SafeAreaView>
  );
}


export default App;
