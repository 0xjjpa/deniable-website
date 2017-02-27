const encrypt = (data, key, iv, mode) =>
    crypto.subtle.importKey('raw', key, {name: mode}, true, ['encrypt', 'decrypt'])
        .then(bufKey => crypto.subtle.encrypt({name: mode, iv}, bufKey, data))

const decrypt = (data, key, iv, mode) =>
    crypto.subtle.importKey('raw', key, {name: mode}, true, ['encrypt', 'decrypt'])
        .then(bufKey => crypto.subtle.decrypt({name: mode, iv}, bufKey, data))