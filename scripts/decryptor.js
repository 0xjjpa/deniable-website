function decryptor(key, index, start, length) {
    const ivLength = 32;
    const encrypted = document.getElementById('encrypted').innerHTML.trim();
    console.log('[Start / Length]', start+ivLength, length - (ivLength * index))
    console.log('PBKDF2 Generated Key', bufToHex(key));
    
    const ivToUser = encrypted.substr(start, ivLength);
    const dataToDecrypt = encrypted.substr(start+ivLength, length - ((ivLength * index) > 0 ? (ivLength * index) : ivLength))

    let iv = hexToBuf(ivToUser),
        data = hexToBuf(dataToDecrypt);
        
    
    console.log('[Decrypting Content] - ', ivToUser + dataToDecrypt)

    return decrypt(data, key, iv, 'AES-CBC')
        .then(buf => { document.getElementById('content').innerHTML = bufToStr(buf); })
}
