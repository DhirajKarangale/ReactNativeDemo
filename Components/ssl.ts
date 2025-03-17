import { hash } from 'crypto-js';
import { fetch } from 'react-native-ssl-pinning';
import AsyncStorage from '@react-native-async-storage/async-storage';

const base_url = "https://192.168.0.108:1337";
const PATH_CERT = 'E:\\ReactNative\\ReactNativeDemo\\android\\app\\src\\main\\assets\\server.cer';
const PATH_OLD_CERT = 'E:\\ReactNative\\ReactNativeDemo\\android\\app\\src\\main\\assets\\server_backup.cer';
const PATH_DATE = 'E:\\ReactNative\\ReactNativeDemo\\android\\app\\src\\main\\assets\\last_update.txt';
const PATH_CERT_HASH = 'E:\\ReactNative\\ReactNativeDemo\\android\\app\\src\\main\\assets\\cert_hash.txt';

export default async function updateCertificates() {

    if (await checkLastUpdate()) return;

    const latestCertHash = await getLatestCertHash();
    const currentCertHash = await getStoredCertHash();

    if (latestCertHash === currentCertHash) return;

    await saveCert(PATH_OLD_CERT, await getStoredCert(PATH_CERT));

    fetch(`${base_url}/cert`, {
        method: 'GET',
        sslPinning: { certs: ['server'], }
    })
        .then(async (response) => {
            const newCert = await response.text();

            await saveCert(PATH_CERT, newCert);
            const isValid = await validateCertificate();

            if (isValid) {
                const newCertHash = hash(newCert).toString();
                await saveCertHash(newCertHash);
                await saveDate(new Date());
            } else {
                await saveCert(PATH_CERT, await getStoredCert(PATH_OLD_CERT));
                console.log('Reverting to old certificate');
            }
        })
        .catch(err => {
            console.log("Failed to fetch the new certificate");
        });

}

async function checkLastUpdate() {
    try {
        const lastUpdate = await AsyncStorage.getItem(PATH_DATE);
        if (!lastUpdate) return false;

        const currentDate = new Date();
        const daysDifference = (currentDate.getTime() - new Date(lastUpdate).getTime()) / (1000 * 3600 * 24);
        return daysDifference < 29;
    } catch (error) {
        return false;
    }
}

async function getLatestCertHash() {
    fetch(`${base_url}/cert-hash`, {
        method: 'GET',
        sslPinning: { certs: ['server'], }
    })
        .then(response => {
            console.log(response.bodyString);
            return response.bodyString;
        })
        .catch(err => {
            console.log(err);
            return '';
        });
}

async function getStoredCertHash() {

    try {
        const storedHash = await AsyncStorage.getItem(PATH_CERT_HASH);
        if (storedHash) return storedHash;
        // return storedHash || '';
    } catch (error) {
        console.log('Failed to read stored certificate hash:', error);
        return '';
    }
}

async function getStoredCert(path: string) {
    try {
        const storedCert = await AsyncStorage.getItem(path);
        return storedCert || '';
    } catch (error) {
        console.log('Failed to read stored certificate:', error);
        return '';
    }
}

async function saveCert(path: string, cert: string) {
    try {
        await AsyncStorage.setItem(path, cert);
    } catch (error) {
        console.log('Failed to save certificate:', error);
    }
}

async function saveCertHash(certHash: string) {
    try {
        await AsyncStorage.setItem(PATH_CERT_HASH, certHash);
    } catch (error) {
        console.log('Failed to save certificate hash:', error);
    }
}

async function saveDate(date: Date) {
    try {
        await AsyncStorage.setItem(PATH_DATE, date.toISOString());
    } catch (error) {
        console.log('Failed to save last update date:', error);
    }
}

async function validateCertificate() {

    try {
        const result = await fetch(`${base_url}/test`, {
            method: 'GET',
            sslPinning: { certs: ['server'] }
        });
        return result.status === 200;
    } catch (error) {
        console.log('Failed to validate the new certificate:', error);
        return false;
    }
}