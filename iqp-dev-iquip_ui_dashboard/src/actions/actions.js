import {database} from './../firebase';
export const ADD_MACHINEGENINFO = 'ADD_MACHINEGENINFO';
export const ADD_MACHINETECHINFO = 'ADD_MACHINETECHINFO';
export const ADD_MACHINEOPERATIONALTHRE = 'ADD_MACHINEOPERATIONALTHRE';
export const ADD_MACHINEMAINTINFO = 'ADD_MACHINEMAINTINFO';
export const SET_GAMES = 'SET_GAMES';
export const ADD_GAME = 'ADD_GAME';
export const ADD_ITEM = 'ADD_ITEM';
export const LINE_FETCHED = 'LINE_FETCHED';
export const GAME_FETCHED = 'GAME_FETCHED';
export const MACHINEMAINTINFO_FETCHED = 'MACHINEMAINTINFO_FETCHED';
export const OPERTHRESHOLD_FETCHED = 'OPERTHRESHOLD_FETCHED';
export const MACHINEGENINFO_FETCHED = 'MACHINEGENINFO_FETCHED';
export const GAME_UPDATED = 'GAME_UPDATED';
export const MACHINEMAINT_UPDATED = 'MACHINEMAINT_UPDATED';
export const MACHINEGEN_UPDATED = ' MACHINEGEN_UPDATED';
export const GAME_DELETED = 'GAME_DELETED';
export const ITEM_DELETED = 'ITEM_DELETED';
export const SET_ITEMS = 'SET_ITEMS';
export const SET_LINES = 'SET_LINES';
export const SET_GENERAL_INFO= 'SET_GENERAL_INFO';
export const SET_MACHINEMAINTINFO = 'SET_MACHINEMAINTINFO';
export const SET_MACHINEGENINFO = 'SET_MACHINEGENINFO';
export const SET_MACHINEOPERTHRESHOLD = 'SET_MACHINEOPERTHRESHOLD';
export const SET_MACHINES = 'SET_MACHINES';
export const REAL_TIME_DATA_FETCHED= 'REAL_TIME_DATA_FETCHED';
export const REAL_TIME_SENSOR_DATA = 'REAL_TIME_SENSOR_DATA';
export const REAL_TIME_DATA_ONCE_FETCHED = 'REAL_TIME_DATA_ONCE_FETCHED';
export const SPECIFIC_REAL_TIME_DATA_ONCE_FETCHED = 'SPECIFIC_REAL_TIME_DATA_ONCE_FETCHED';
export const ALL_NOTIFICATIONS_FETCHED= 'ALL_NOTIFICATIONS_FETCHED';
export const NOTIFICATION_FETCHED = 'NOTIFICATION_FETCHED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setRealTimeData(realTimeData) {
  return {
    type: REAL_TIME_DATA_FETCHED,
    realTimeData
  }
}

export function setRealTimeSensorData(realTimeSensorData) {
  return {
    type: REAL_TIME_SENSOR_DATA,
    realTimeSensorData
  }
}

export function setRealTimeDataOnce(realTimeDataOnce) {
  return {
    type: REAL_TIME_DATA_ONCE_FETCHED,
    realTimeDataOnce
  }
}

export function setSpecificRealTimeData(specificRealTimeData) {
  return {
    type: SPECIFIC_REAL_TIME_DATA_ONCE_FETCHED,
    specificRealTimeData
  }
}

function averageUptimeAllMachines(machinesData) {
  var average = {
    on: 0,
    off: 0,
    standby: 0
  };
  var count = 0;
  for (var key in machinesData) {
    if (machinesData.hasOwnProperty(key)) {
      if(machinesData[key].average && machinesData[key].average.status){
        average.on = average.on + machinesData[key].average.status.on;
        average.off = average.off + machinesData[key].average.status.off;
        average.standby = average.standby + machinesData[key].average.status.standby;
        ++count;
      }
    }
  }
  if (count){
    average.on = average.on / count;
    average.off = average.off / count;
    average.standby = average.standby / count;
    return average;
  }
  return average;
}

function calculateAverage(paramData, paramName) {
  if(paramName === "status"){
    var statusData = {
      on: 0,
      off: 0,
      standby: 0
    };
    paramData.forEach(function (data) {
      if (data.param_value === "on"){
        ++statusData.on;
      } else if (data.param_value === "off"){
        ++statusData.off;
      } else {
        ++statusData.standby;
      }
    });
    statusData.on = (statusData.on / paramData.length)*100;
    statusData.off = (statusData.off / paramData.length)*100;
    statusData.standby = (statusData.standby / paramData.length)*100;
    return statusData;
  } else {
    var sum = 0;
    paramData.forEach(function (data) {
      sum = sum + data.param_value;
    });
    return sum / paramData.length;
  }
}

function formatRealTimeData(formattedRealTimeData, realTimeData) {
  var pl_id = realTimeData.mc_id.slice(0, 5);
  var data = {
    param_value: realTimeData.param_value,
    updated_time: (realTimeData.updated_time-0)*1000
  };
  if(formattedRealTimeData[pl_id]){
    if(formattedRealTimeData[pl_id][realTimeData.mc_id]){
      if(formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name]){
        formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name].push(data);
      }else {
        formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name] = [];
        formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name].push(data);
      }
      formattedRealTimeData[pl_id][realTimeData.mc_id]["current"][realTimeData.param_name] = data.param_value;
      formattedRealTimeData[pl_id][realTimeData.mc_id]["current"]["updated_time"] = data.updated_time;
      formattedRealTimeData[pl_id][realTimeData.mc_id]["average"][realTimeData.param_name] = calculateAverage(formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name], realTimeData.param_name);
    } else {
      formattedRealTimeData[pl_id][realTimeData.mc_id] = {};
      formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name] = [];
      formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name].push(data);
      formattedRealTimeData[pl_id][realTimeData.mc_id]["current"] = {};
      formattedRealTimeData[pl_id][realTimeData.mc_id]["current"][realTimeData.param_name] = data.param_value;
      formattedRealTimeData[pl_id][realTimeData.mc_id]["current"]["updated_time"] = data.updated_time;
      formattedRealTimeData[pl_id][realTimeData.mc_id]["average"] = {};
      formattedRealTimeData[pl_id][realTimeData.mc_id]["average"][realTimeData.param_name] = calculateAverage(formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name], realTimeData.param_name);
    }
  }else {
    formattedRealTimeData[pl_id] = {};
    formattedRealTimeData[pl_id][realTimeData.mc_id] = {};
    formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name] = [];
    formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name].push(data);
    formattedRealTimeData[pl_id][realTimeData.mc_id]["current"] = {};
    formattedRealTimeData[pl_id][realTimeData.mc_id]["current"][realTimeData.param_name] = data.param_value;
    formattedRealTimeData[pl_id][realTimeData.mc_id]["current"]["updated_time"] = data.updated_time;
    formattedRealTimeData[pl_id][realTimeData.mc_id]["average"] = {};
    formattedRealTimeData[pl_id][realTimeData.mc_id]["average"][realTimeData.param_name] = calculateAverage(formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name], realTimeData.param_name);
  }
  formattedRealTimeData[pl_id]["averageUptime"] = averageUptimeAllMachines(formattedRealTimeData[pl_id]);
  return formattedRealTimeData;
}

// export function getRealTimeData(data) {
//   return dispatch => {
//     fetch('/getSecificTimeRealTimeData', {
//       method: 'post',
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     }).then(handleResponse)
//         .then(realTimeData => {
//           const rootRef = database.ref().child('test/real_time_machine').orderByChild("updated_time").startAt(data.endTime+1);
//           var formattedRealTimeData = {};
//           // console.log(Object.entries(realTimeData)[1]);
//           Object.entries(realTimeData).map(function (data) {
//             formattedRealTimeData = formatRealTimeData(formattedRealTimeData, data[1]);
//           });
//           dispatch(setRealTimeData(formattedRealTimeData));
//           return rootRef.on('child_added', snap => {
//             // console.log(realTimeData);
//             formattedRealTimeData = formatRealTimeData(formattedRealTimeData, snap.val());
//             var data = JSON.parse(JSON.stringify(formattedRealTimeData));
//             console.log(data);
//             return dispatch(setRealTimeData(data));
//           });
//         });
//   }
// }

// export function getRealTimeData() {
//   return dispatch => {
//     var startTime = (Date.now() - 86400000)/1000; //1511870616000;
//     const rootRef = database.ref().child('test/real_time_machine').orderByChild("updated_time").startAt(startTime);
//     var formattedRealTimeData = {};
//     return rootRef.on('child_added', snap => {
//       // console.log(snap.val());
//       formattedRealTimeData = formatRealTimeData(formattedRealTimeData, snap.val());
//       var data = JSON.parse(JSON.stringify(formattedRealTimeData));
//       // dispatch(setRealTimeSensorData(snap.val()));
//       return dispatch(setRealTimeData(data));
//     });
//   }
// }

export function getRealTimeDataOnce(start, end) {
  return dispatch => {
    // console.log("Time...", Date.now());
    var startTime = Math.floor(((Date.now() - 86400000)/1000))+0;//1516365851;1517124194
    var endTime = startTime+86400;
    // start = startTime;
    // end = endTime;
    // console.log("startTime...", startTime, endTime);
    const rootRef = database.ref().child('test/real_time_machine').orderByChild("updated_time").startAt(startTime).endAt(endTime);
    var formattedRealTimeData = {};
    return rootRef.once('value', snap => {
      var value = snap.val();
      // console.log("snap.val()...", snap.val());
      if(value){
        Object.keys(value).map(function (key) {
          formattedRealTimeData = formatRealTimeData(formattedRealTimeData, value[key]);
          return null;
        });
      }
      // console.log(value, formattedRealTimeData);
      dispatch(setRealTimeData(JSON.parse(JSON.stringify(formattedRealTimeData))));
      if(start){
        return database.ref().child('test/real_time_machine').orderByChild("updated_time").startAt(start).endAt(end).once('value', snap => {
          var formattedRealTimeDataOnce = {};
          var value = snap.val();
          if(value){
            Object.keys(value).map(function (key) {
              formattedRealTimeDataOnce = formatRealTimeData(formattedRealTimeDataOnce, value[key]);
              return null;
            });
          }
          dispatch(setRealTimeDataOnce(JSON.parse(JSON.stringify(formattedRealTimeDataOnce))));
          return database.ref().child('test/real_time_machine').orderByChild("updated_time").startAt(endTime+1).on('child_added', snap => {
            formattedRealTimeData = formatRealTimeData(formattedRealTimeData, snap.val());
            var data = JSON.parse(JSON.stringify(formattedRealTimeData));
            dispatch(setRealTimeData(data));
            // console.log("snap.val()...", snap.val());
            return dispatch(setRealTimeSensorData(snap.val()));
          });
        });
      }else {
        dispatch(setRealTimeDataOnce(JSON.parse(JSON.stringify(formattedRealTimeData))));
        return database.ref().child('test/real_time_machine').orderByChild("updated_time").startAt(endTime+1).on('child_added', snap => {
          var realTimeData = snap.val();
          var pl_id = realTimeData.mc_id.slice(0, 5);
          if(formattedRealTimeData[pl_id] && formattedRealTimeData[pl_id][realTimeData.mc_id] && formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name]){
            formattedRealTimeData[pl_id][realTimeData.mc_id][realTimeData.param_name].shift();
            formattedRealTimeData = formatRealTimeData(formattedRealTimeData, realTimeData);
          }else {
            formattedRealTimeData = formatRealTimeData(formattedRealTimeData, realTimeData);
          }
          var data = JSON.parse(JSON.stringify(formattedRealTimeData));
          dispatch(setRealTimeData(data));
          // console.log("snap.val()...", snap.val());
          var temp = snap.val();
          temp.updated_time = (temp.updated_time - 0)*1000;
          return dispatch(setRealTimeSensorData(temp));
        });
      }
    });
  }
}

export function getSpecificRealTimeData(start, end) {
  var data = {
    "startTime": Math.floor(start/1000),
    "endTime": Math.floor(end/1000)
  };
  return dispatch => {
    return fetch('/getSecificTimeRealTimeData', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => {
        var formattedRealTimeData = {};
        if(data){
          Object.keys(data).map(function (key) {
            formattedRealTimeData = formatRealTimeData(formattedRealTimeData, data[key]);
            return null;
          });
        }
        // console.log(data, formattedRealTimeData);
        return dispatch(setSpecificRealTimeData(formattedRealTimeData));
      });
  };
}

export function setAllNotifications(allNotifications) {
  return {
    type: ALL_NOTIFICATIONS_FETCHED,
    allNotifications
  }
}

export function setNotification(notification) {
  return {
    type: NOTIFICATION_FETCHED,
    notification
  }
}

export function getUserNotification(userId) {
  return dispatch => {
    const rootRef = database.ref().child('test/users/' + userId + '/notifications/list').orderByChild("rev_time");
    var formattedNotifications = [];
    return rootRef.on('child_added', snap => {
      var notification = snap.val();
      notification["notifyId"] = snap.key;

      if(formattedNotifications[0]){
        if(notification.time >= formattedNotifications[0].time){
          formattedNotifications.unshift(notification);
        } else {
          formattedNotifications.push(notification);
        }
      }else {
        formattedNotifications.push(notification);
      }

      dispatch(setAllNotifications(JSON.parse(JSON.stringify(formattedNotifications))));
      return dispatch(setNotification(notification));
    });
  };
}


export function setLines(lines) {
  return {
    type: LINE_FETCHED,
    lines
  }
}

export function fetchLines() {
  return dispatch => {
    fetch('/getLines')
      .then(handleResponse)
      .then(lines => dispatch(setLines(lines)));
  }
}

export function setGames(games) {
  return {
    type: SET_GAMES,
    games
  }
}

export function setItems(items) {
  return {
    type: SET_ITEMS,
    items
  }
}

export function addGame(game) {
  return {
    type: ADD_GAME,
    game
  }
}


export function addItem(item) {
  return {
    type: ADD_ITEM,
    item
  }
}

export function gameFetched(game) {
  return {
    type: GAME_FETCHED,
    game
  }
}



export function gameUpdated(game) {
  return {
    type: GAME_UPDATED,
    game
  }
}

export function gameDeleted(gameId) {
  return {
    type: GAME_DELETED,
    gameId
  }
}

export function itemDeleted(itemId) {
  return {
    type: ITEM_DELETED,
    itemId
  }
}





export function saveGame(data) {
  return dispatch => {
    return fetch('/api/games', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(addGame(data.game)));
  }
}

export function saveItems(data) {
  return dispatch => {
    return fetch('/api/items', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(addItem(data.item)));
  }
}




export function saveMachineMaintInfo(data) {
  return dispatch => {
    return fetch('/api/machinemaintinfo', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(addMachineMaintInfo(data.machinemaintinfo)));
  }
}




export function updateMachineMaintInfo(data) {
  return dispatch => {
    return fetch(`/api/machinemaintinfos${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(machinemaintinfoUpdated(data.machinemaintinfo)));
  }
}






export function machinemaintinfoUpdated(machinemaintinfo) {
  return {
    type: MACHINEMAINT_UPDATED,
    machinemaintinfo
  }
}


export function updateMachineGenInfo(data) {
  return dispatch => {
    return fetch(`/api/machinegeninfos${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(machinegeninfoUpdated(data.machinegeninfo)));
  }
}

export function machinegeninfoUpdated(machinegeninfo) {
  return {
    type: MACHINEGEN_UPDATED,
    machinegeninfo
  }
}


export function updateGame(data) {
  return dispatch => {
    return fetch(`/api/games/${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(gameUpdated(data.game)));
  }
}

export function deleteGame(id) {
  return dispatch => {
    return fetch(`/api/games/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(gameDeleted(id)));
  }
}



export function deleteItem(id) {
  return dispatch => {
    return fetch(`/api/games/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(itemDeleted(id)));
  }
}






export function fetchGames() {
  return dispatch => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => dispatch(setGames(data.games)));
  }
}


export function fetchItems() {
  return dispatch => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => dispatch(setItems(data.items)));
  }
}


export function FetchMachineGenInfos() {
  return dispatch => {
    fetch('/api/machinegeninfos')
      .then(res => res.json())
      .then(data => dispatch(setMachineGenInfo(data.machinegeninfos)));
  }

}


export function setMachineGenInfo(machinegeninfos) {
  console.log("setMachineGenInfo");
  return {
    type: SET_MACHINEGENINFO,
    machinegeninfos
  }
}

export function FetchMachineMaintInfos() {
  return dispatch => {
    fetch('/api/machinemaintinfos')
      .then(res => res.json())
      .then(data => dispatch(setMachineMaintInfo(data.machinemaintinfos)));
  }
}




export function setMachineMaintInfo(machinemaintinfos) {
  return {
    type: SET_MACHINEMAINTINFO,
    machinemaintinfos
  }
}


export function FetchMachineOperTheresholds() {
  return dispatch => {
    fetch('/api/machineoperthresholds')
      .then(res => res.json())
      .then(data => dispatch(setMachineOperTheresholds(data.machineoperthresholds)));
  }
}


export function setMachineOperTheresholds(machineoperthresholds) {
  return {
    type: SET_MACHINEOPERTHRESHOLD,
    machineoperthresholds
  }
}

export function fetchGame(id) {
  return dispatch => {
    fetch(`/api/updatemachine/games${id}`)
      .then(res => res.json())
      .then(data => dispatch(gameFetched(data.game)));
  }
}


export function FetchMachineGenInfo(id) {
  return dispatch => {
    fetch(`/api/machinegeninfos${id}`)
      .then(res => res.json())
      .then(data => dispatch(machinegeninfoFetched(data.machinegeninfo)));
  }
}

export function machinegeninfoFetched(machinegeninfo) {
  return {
    type: MACHINEGENINFO_FETCHED,
    machinegeninfo
  }
}

export function FetchMachineMaintInfo(id) {
  return dispatch => {
    fetch(`/api/machinemaintinfos${id}`)
      .then(res => res.json())
      .then(data => dispatch(machinemaintinfoFetched(data.machinemaintinfo)));
  }
}


export function machinemaintinfoFetched(machinemaintinfo) {
  return {
    type: MACHINEMAINTINFO_FETCHED,
    machinemaintinfo
  }
}



export function FetchMachineOperThereshold(id) {
  return dispatch => {
    fetch(`/api/machineoperthresholds${id}`)
      .then(res => res.json())
      .then(data => dispatch(machineoperthresholdFetched(data.machineoperthreshold)));
  }
}

export function machineoperthresholdFetched(machineoperthreshold) {
  return {
    type: OPERTHRESHOLD_FETCHED,
    machineoperthreshold
  }
}
export function lineFetched(line) {
  return {
    type: LINE_FETCHED,
    line
  }
}


export function fetchLine(machine_id) {
  return dispatch => {
    fetch(`/api/lines/${machine_id}`)
      .then(res => res.json())
      .then(data => dispatch(lineFetched(data.line)));
  }
}


// Genearal info save

export function saveMachineGenInfo(data) {
  console.log("saveactiongen");
  return dispatch => {
    return fetch('/api/machinegeninfo', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(addMachineGenInfo(data.machinegeninfo)));
  }
}



export function addMachineGenInfo(machinegeninfo) {
  console.log("addactiongen");
  return {
    type: ADD_MACHINEGENINFO,
    machinegeninfo

  }
}



// Operational Thresold info save

export function saveOperationalThreshold(data) {
  console.log("saveactionthreshold");
  return dispatch => {
    return fetch('/api/machineopthreld', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(addOperationalThreshold(data.machineoperthreld)));
  }
}



export function addOperationalThreshold(machineoperthreld) {
  console.log("addactionoprthre");
  return {
    type: ADD_MACHINEOPERATIONALTHRE,
    machineoperthreld

  }
}


export function saveMachineTechInfo(data) {
  console.log("saveaction");
  return dispatch => {
    return fetch('/api/machinetechinfo', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(addMachineTechInfo(data.machinetechinfo)));
  }
}



export function addMachineTechInfo(machinetechinfo) {
  console.log("addaction");
  return {

    type: ADD_MACHINETECHINFO,
    machinetechinfo

  }
}


/// Maintenance Info Save



export function addMachineMaintInfo(machinemaintinfo) {
  console.log("addactionmen");
  return {
    type: ADD_MACHINEMAINTINFO,
    machinemaintinfo

  }
}


export function fetchMachines() {
  return dispatch => {
    fetch('/api/machines')
      .then(handleResponse)
      .then(data => dispatch(setMachines(data.machines)));
  }
}




export function setMachines(machines) {
  return {
    type: SET_MACHINES,
    machines
  }
}

export * from './AuthActions';