const pbkdf2 = (password, salt, iterations, hash, mode) =>
    crypto.subtle.importKey('raw', password, {name: 'PBKDF2'}, false, ['deriveKey'])
        .then(baseKey => crypto.subtle.deriveKey({name: 'PBKDF2', salt, iterations, hash}, baseKey, {'name': mode, 'length': 256}, true, ['encrypt', 'decrypt']))
        .then(key => crypto.subtle.exportKey('raw', key))
        
function derive(cb, index, start, length) {
    let password = strToBuf(getParameterByName('password') || 'password'),
        salt = strToBuf('salt'),
        iterations = 100000,
        hash = 'SHA-256',
        mode = 'AES-GCM'
    
    console.log('Password', bufToStr(password))

    pbkdf2(password, salt, iterations, hash, mode)
        .then(keyBytes => cb(keyBytes, index, start, length))
}

