import React from 'react';
import { Button, View } from 'react-native';
import { fetch } from 'react-native-ssl-pinning';
import updateCertificates from './ssl';

const SSLTest: React.FC = () => {
    const base_url = "https://192.168.217.217:1337";

    function TestAPI() {
        fetch(`${base_url}/test`, {
            method: 'GET',
            sslPinning: { certs: ['server'], }
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }

    async function UpdateSLL() {
        console.log("Update SSL");
        await updateCertificates();
    }

    return (
        <>
            <View style={{ flex: 1, gap: 5, padding: 20 }}>
                <Button
                    onPress={UpdateSLL}
                    title="Update SLL"
                    color="#841584"
                />

                <Button
                    onPress={TestAPI}
                    title="Test API"
                    color="#841584"
                />
            </View></>
    );
};

export default SSLTest;