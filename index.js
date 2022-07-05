const pm2 = require('pm2')

/**
 * This function will resolve the PM2_IDs of the names
 * @param {Array} NameList
 * @returns {Array}
 */
const GetPM2IDByName = function (NameList) {
    return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
                process.exit(2)
            }

            pm2.list((err, list) => {
                pm2.disconnect()
                if (err) {
                    reject(err);
                }
                let Filterd = list.filter(function (el) { return NameList.includes(el.name) });
                let FilterdIDs = [];
                Filterd.map(Data => {
                    FilterdIDs.push(Data.pm_id)
                })
                resolve(FilterdIDs)
            })
        })
    });
}

/**
 * This function will resolve with all informations about a prosess  
 * Works with IDs & Names  
 * @param {String | Number} proc
 * @returns {object} process_data
 */
const GetStatus = function (proc) {
    return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
                process.exit(2)
            }

            pm2.describe(proc, (err, process_data) => {
                pm2.disconnect()
                if (err) {
                    reject(err);
                }
                resolve(process_data)
            })
        })
    });
}

/**
 * This function will resolve with all informations about all prosesses in that list  
 * Works with Names  
 * @param {Array} proclist
 * @returns {Array}
 */
const GetEveryStatusFromListByNames = function (proclist) {
    return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
                process.exit(2)
            }

            pm2.list((err, list) => {
                pm2.disconnect()
                if (err) {
                    reject(err);
                }
                let Filterd = list.filter(function (el) { return proclist.includes(el.name) });
                resolve(Filterd)
            })
        })
    });
}

/**
 * This function will resolve with all informations about all prosesses in that list  
 * Works with IDs  
 * @param {Array} proclist
 * @returns {Array}
 */
const GetEveryStatusFromListByIDs = function (proclist) {
    return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
                process.exit(2)
            }

            pm2.list((err, list) => {
                pm2.disconnect()
                if (err) {
                    reject(err);
                }
                let Filterd = list.filter(function (el) { return proclist.includes(el.pm_id) });
                resolve(Filterd)
            })
        })
    });
}

/**
 * This function will resolve with all informations about all prosesses 
 * Works with IDs & Names  
 * @returns {Array}
 */
const GetEveryStatus = function () {
    return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
                process.exit(2)
            }

            pm2.list((err, list) => {
                pm2.disconnect()
                if (err) {
                    reject(err);
                }
                resolve(list)
            })
        })
    });
}

/**
 * This returns the prosess of itself if it runs in PM2
 * @returns {number}
 */
const GetMe = function () {
    return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
            }

            pm2.list((err, list) => {
                pm2.disconnect()
                if (err) {
                    reject(err);
                }

                //console.log(list[0].pid, process.pid);
                let Filterd = list.filter(function (el) { return el.pid == process.pid });
                if (Filterd.length > 0) {
                    resolve(Filterd[0].pm_id);
                } else {
                    reject(`Not running as PM2 Process. PID is: ${process.pid}`);
                }
            })
        })
    });
}

/**
 * This returns the cluster the process is part of
 * @returns {number}
 */
const GetMyCluster = function () {
    return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
            }

            pm2.list((err, list) => {
                pm2.disconnect()
                if (err) {
                    reject(err);
                }
                let FilterdByPID = list.filter(function (el) { return el.pid == process.pid });

                if (FilterdByPID.length > 0) {
                    let FilterdByName = list.filter(function (el) { return el.name == FilterdByPID[0].name });
                    resolve(FilterdByName);
                } else {
                    reject(`Not running as PM2 Process. PID is: ${process.pid}`);
                }
            })
        })
    });
}

/**
 * Starts a process, based on js config files
 * @param {String} config  
 * @returns {object} process_data
 */
const Start = function (proc) {
    return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
                process.exit(2)
            }

            pm2.start(proc, (err, process_data) => {
                pm2.disconnect()
                if (err) {
                    reject(err);
                }
                resolve(process_data)
            });
        });
    });
}

/**
 * Stop a process
 * @param {String} proc  
 * @returns {object} process_data
 */
const Stop = function (proc) {
    return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
                process.exit(2)
            }

            pm2.stop(proc, (err, process_data) => {
                pm2.disconnect()
                if (err) {
                    reject(err);
                }
                resolve(process_data)
            });
        });
    });
}

/**
 * ReStarts a process
 * @param {String} proc  
 * @returns {object} process_data
 */
const Restart = function (proc) {
    return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
                process.exit(2)
            }

            pm2.restart(proc, (err, process_data) => {
                pm2.disconnect()
                if (err) {
                    reject(err);
                }
                resolve(process_data)
            });
        });
    });
}

/**
 * Reload a process
 * @param {String} proc  
 * @returns {object} process_data
 */
const Reload = function (proc) {
    return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
                process.exit(2)
            }

            pm2.reload(proc, (err, process_data) => {
                pm2.disconnect()
                if (err) {
                    reject(err);
                }

                resolve(process_data)
            });
        });
    });
}

/**
 * Delete a process
 * @param {String} proc  
 * @returns {object} process_data
 */
const Delete = function (proc) {
    return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
                process.exit(2)
            }

            pm2.delete(proc, (err, process_data) => {
                pm2.disconnect()
                if (err) {
                    reject(err);
                }
                resolve(process_data)
            });
        });
    });
}

module.exports = {
    GetPM2IDByName,
    GetStatus,
    GetMe,
    Delete,
    GetMyCluster: GetMyCluster,
    GetEvery: {
        Status: GetEveryStatus,
        FromListByIDs: GetEveryStatusFromListByIDs,
        FromListByNames: GetEveryStatusFromListByNames
    },
    Power: {
        Start,
        Stop,
        Restart,
        Reload
    }
};