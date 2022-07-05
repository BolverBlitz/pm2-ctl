const pm2 = require('./index.js')

setInterval(function () {
    pm2.SendEvent.ToMyCluster({Blub: "Iglu"}).catch(function (err) {
        console.log(err)
    });
}, 1000);

pm2.GetMe().then(function (MyID) {
    process.on('message', function(packet) {
        console.log(MyID + ` Got Data:`, packet)
    })
}).catch(function (err) {
    console.log(err)
});