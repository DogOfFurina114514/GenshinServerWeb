const net = require('net');
const https = require('https');
const fs = require('fs');

// TCP 探测 (对应 Worker 的 connect)
function tcpCheck(host, port, timeout = 3000) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        let resolved = false;
        const done = (result) => {
            if (!resolved) {
                resolved = true;
                socket.destroy();
                resolve(result);
            }
        };
        socket.setTimeout(timeout);
        socket.on('connect', () => done(true));
        socket.on('timeout', () => done(false));
        socket.on('error', () => done(false));
        socket.connect(port, host);
    });
}

// API 探测 (对应 Worker 的 fetch)
function httpCheck(url, timeout = 4000) {
    return new Promise((resolve) => {
        const req = https.get(url, { timeout }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(!!json.ok);
                } catch (e) {
                    resolve(false);
                }
            });
        });
        req.on('error', () => resolve(false));
        req.on('timeout', () => { req.destroy(); resolve(false); });
    });
}

(async () => {
    const api = await httpCheck('https://apidogoffurinagi.fucku.top/api/ping');
    const [dispatch, game] = await Promise.all([
        tcpCheck('47.107.155.180', 18081),
        tcpCheck('47.107.155.180', 22102)
    ]);

    const result = {
        api,
        dispatch,
        game,
        time: new Date().toLocaleString('zh-CN', { hour12: false, timeZone: 'Asia/Shanghai' })
    };

    fs.writeFileSync('status.json', JSON.stringify(result));
    console.log('Status updated:', result);
})();