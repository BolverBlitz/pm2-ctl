const pm2 = require('./index.js')

pm2.GetEveryStatus().then(function (data) {
    data.map(function (item) {
        console.log(item.name, item.pm2_env.instances)
        console.log(item)
    });
});