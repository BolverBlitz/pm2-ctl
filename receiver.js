const pm2 = require('./index.js')

process.on('message', function (packet) {
    const { data } = packet;
    console.log(` Got Data:`, data)
})