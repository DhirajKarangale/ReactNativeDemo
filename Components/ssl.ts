import RNFetchBlob from 'rn-fetch-blob';
import { hash } from 'crypto-js';
import { fetch } from 'react-native-ssl-pinning';

const base_url = "https://192.168.1.12:1337";
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

    try {
        const response = await RNFetchBlob.fetch('GET', `${base_url}/cert`);
        const newCert = await response.text();

        await saveCert(PATH_CERT, newCert);
        const isValid = await validateCertificate();

        if (isValid) {
            const newCertHash = hash(newCert).toString();
            await saveCertHash(newCertHash);
            await saveUpdateDate(new Date());
        } else {
            await saveCert(PATH_CERT, await getStoredCert(PATH_OLD_CERT));
            console.log('Reverting to old certificate');
        }

    } catch (error) {
        console.log("Failed to fetch the new certificate");
    }
}

async function checkLastUpdate() {
    try {
        const lastUpdate = await RNFetchBlob.fs.readFile(PATH_DATE, 'utf8');
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
        const storedHash = await RNFetchBlob.fs.readFile(PATH_CERT_HASH, 'utf8');
        return storedHash || '';
    } catch (error) {
        console.log('Failed to read stored certificate hash:', error);
        return '';
    }
}

async function getStoredCert(path: string) {
    try {
        const storedHash = await RNFetchBlob.fs.readFile(path, 'utf8');
        return storedHash || '';
    } catch (error) {
        console.log('Failed to read stored certificate:', error);
        return '';
    }
}

async function saveCert(path: string, cert: string) {
    try {
        await RNFetchBlob.fs.writeFile(path, cert, 'utf8');
    } catch (error) {
        console.log('Failed to save certificate:', error);
    }
}

async function saveCertHash(certHash: string) {
    try {
        await RNFetchBlob.fs.writeFile(PATH_CERT_HASH, certHash, 'utf8');
    } catch (error) {
        console.log('Failed to save certificate hash:', error);
    }
}

async function saveUpdateDate(date: Date) {
    try {
        await RNFetchBlob.fs.writeFile(PATH_DATE, date.toISOString(), 'utf8');
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