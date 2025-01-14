import React from 'react';
import { Button, View } from 'react-native';
import FooterNavBar from './Components/FooterNavBar';
import TabNavigator from './Components/TabNavigator';
import { fetch } from 'react-native-ssl-pinning';

function App(): React.JSX.Element {

  const base_url = "https://192.168.1.12:1337";

  function Test() {
    fetch(`${base_url}/test`
      , {
        method: 'GET',
        sslPinning: { certs: ['server'], }
      }
    )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>

      <View style={{ marginTop: 100 }}>
        <Button
          onPress={Test}
          title="Test API"
          color="#841584"
        />
      </View>

      {/* <TabNavigator /> */}
      {/* <FooterNavBar /> */}
    </>
  );
}

export default App;