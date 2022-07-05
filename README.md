# PM2 - Control
## Introduction
I love PM2 but the API leaves a lot to be desired, so I developed this module.
Unique functions are e.g. GetMe or GetMyCluster

## When should you use this?
If you want to manage a PM2 instance via JS, you'll benefit from the simplified functions that return promises.

## Usage
Every function is explained with JSDoc.  

## Example
This will return all information avaible from all the processes that are in the same cluster as the process you called it from.  
If you called it from a process that isn´t part of PM2 then it will return a error. 
```js
const pm2 = require('./index.js')

pm2.GetMyCluster.ID().then(function (data) {
        data.map(function (item) {
            console.log(item.pm_id, item.pm2_env.instances)
            //console.log(item)
        });
    }).catch(function (err) {
        console.log(err)
});
```
