const encrypt = (data, key, iv, mode) =>
    (window.crypto.subtle||window.crypto.webkitSubtle).importKey('raw', key, {name: mode}, true, ['encrypt', 'decrypt'])
        .then(bufKey => (window.crypto.subtle||window.crypto.webkitSubtle).encrypt({name: mode, iv}, bufKey, data))

const decrypt = (data, key, iv, mode) =>
    (window.crypto.subtle||window.crypto.webkitSubtle).importKey('raw', key, {name: mode}, true, ['encrypt', 'decrypt'])
        .then(bufKey => (window.crypto.subtle||window.crypto.webkitSubtle).decrypt({name: mode, iv}, bufKey, data))