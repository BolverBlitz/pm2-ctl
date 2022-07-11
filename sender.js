const pm2 = require('./index.js')

setInterval(function () {
    pm2.SendEvent.ToProcess("text", { data: 'S' }).then((result) => {
        console.log(result)
    })
        .catch(function (err) {
            console.log(err)
        });
}
    , 1000)