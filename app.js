const express = require('express');
const fs = require('fs');

const app = express();

app.use((req, res) => {
    let body = [];
    body = [];
    req.on('data', (data) => {
        body.push(data);
    });
    req.on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(body);
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
        })
    });
})

app.listen(9000, () => {
    console.log('listening');
});