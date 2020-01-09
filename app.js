const server = require("net").createServer();
const fs = require('fs');

server.on("connection", socket => {
    socket.setEncoding("hex");
    const client = `${socket.remoteAddress}:${socket.remotePort}`;
    socket.setKeepAlive(true, 50000);
    socket.on("data", data => {
        const parsed__ = parser(data);
        fs.readFile('data.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                data = data + '\n\n---------------------------------\n\n' + body;
                fs.writeFile('data.txt', data, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('\n\n---------------------------------\n\n');
                    }
                    res.send();
                })
            }
            res.send();
        });
    });
    socket.on("error", err => {
        console.error({ event: "error", err: err.message, client });
        socket.end();
    });
    socket.on("close", () => {
        console.log({ event: "close", client });
        helpers.imei_manager.delete(client);
    });
    socket.setTimeout(1000 * 60 * 30, () => {
        console.log('Socket Timeout', client);
        helpers.imei_manager.delete(client);
        socket.end();
    });
    socket.on("end", (hadError) => {
        helpers.imei_manager.delete(client);
        console.log({ event: "end", client, hadError });
    });
});

server.listen(8000, () => {
    console.log({
        event: "CONCOX_TCP_SERVER STARTED",
        PORT: 8000
    });
});