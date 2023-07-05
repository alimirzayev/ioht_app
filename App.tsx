import TcpSocket from 'react-native-tcp-socket';
import React, { useState } from 'react';
import {
  SafeAreaView, Text,
} from 'react-native';

function App(): JSX.Element {
  const [data, setData] = useState<string>();
  const client = TcpSocket.createConnection({ port: 3001, host: 'localhost' }, () => {
    console.log('Connected to the server!');
    client.write('Hello from Client');
  });

  client.on('data', (data) => {
    console.log('Server responded with: ', data.toString());
    setData(data.toString())
  });

  client.on('error', (error) => {
    console.log(error);
  });

  client.on('close', () => {
    console.log('Connection closed');
  });


  return (
    <SafeAreaView >
      <Text style={{fontSize: 30, textAlign: 'center'}}>{data}</Text>
    </SafeAreaView>
  );
}


export default App;
