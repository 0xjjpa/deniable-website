function shouldUseNative() {
    return !!(typeof window !== 'undefined' && window.crypto && window.crypto.subtle);
}

const algorithms = { 
    'sha256': 'SHA-256',
    'sha-256': 'SHA-256'
};

const pbkdf2Native = (password, salt, iterations, digest, mode, keylen) =>
    (window.crypto.subtle||window.crypto.webkitSubtle).importKey('raw', password, {name: 'PBKDF2'}, false, ['deriveKey'])
        .then(baseKey => (window.crypto.subtle||window.crypto.webkitSubtle).deriveKey({name: 'PBKDF2', salt, iterations, hash: algorithms[digest.toLowerCase()]}, baseKey, {'name': mode, 'length': keylen*8}, true, ['encrypt', 'decrypt']))
        .then(key => (window.crypto.subtle||window.crypto.webkitSubtle).exportKey('raw', key))
        
function derive(cb, index, start, length) {
    if(window.keyBytes && getParameterByName('password') === window.plainpassword) {
        cb(keyBytes, index, start, length)
    } else {
        let plainpassword = getParameterByName('password') || 'password',
            password = strToBuf(plainpassword),
            salt = strToBuf('salt'),
            iterations = 100000,
            digest = 'sha256',
            keylen = 32,
            mode = 'AES-CBC'
        
        console.log('Password', bufToStr(password))
        
        if (shouldUseNative()) {
            pbkdf2Native(password, salt, iterations, digest, mode, keylen)
                .then(keyBytes => { 
                    window.keyBytes = keyBytes;
                    window.plainpassword = plainpassword;
                    cb(keyBytes, index, start, length); 
                })    
        } else {
            pbkdf2.pbkdf2(password, salt, iterations, keylen, digest, function(error, keyBytes) {
                window.keyBytes = keyBytes;
                window.plainpassword = plainpassword;
                cb(keyBytes, index, start, length)
            })
        }
    }
}

