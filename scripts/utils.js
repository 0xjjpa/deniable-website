const hexToBuf = hex => {
    for (var bytes = [], c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return new Uint8Array(bytes);
};

const bufToHex = buf => {
    let byteArray = new Uint8Array(buf),
        hexString = '',
        nextHexByte;

    for (let i=0; i<byteArray.byteLength; i++) {
        nextHexByte = byteArray[i].toString(16);
        if (nextHexByte.length < 2) {
            nextHexByte = '0' + nextHexByte;
        }
        hexString += nextHexByte;
    }
    return hexString;
};

const strToBuf = str => (new TextEncoder().encode(str));
const bufToStr = str => (new TextDecoder().decode(str));

const strToB64 = str => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
const b64ToStr = str => decodeURIComponent(Array.prototype.map.call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

const bufToB64 = buf => btoa(Array.prototype.map.call(buf, ch => String.fromCharCode(ch)).join(''));
const b64ToBuf = b64 => {
    const binstr = atob(b64),
          buf = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, (ch, i) => {
        buf[i] = ch.charCodeAt(0);
    });
    return buf;
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}