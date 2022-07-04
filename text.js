const pm2 = require('./index.js')

/*
pm2.GetMyCluster.ID().then(function (data) {
    data.map(function (item) {
        console.log(item.pm_id, item.pm2_env.instances)
        //console.log(item)
    });
});
*/
setInterval(function () {
    pm2.GetMyCluster.ID().then(function (data) {
        data.map(function (item) {
            console.log(item.pm_id, item.pm2_env.instances)
            //console.log(item)
        });
    }).catch(function (err) {
        console.log(err)
    });
}, 1000);