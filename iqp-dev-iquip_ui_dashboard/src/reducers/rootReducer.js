import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import games from './games';
import items from './items';
import lines from './lines';
import machines from './machines';
import geninfos from './machinegeninfo';
import machinemaintinfos from './machinemaintinfo';
import machineoperthresholds from './machinetechinfo';
import realTimeData from './realTimeData';
import realTimeSensorData from './realTimeSensorData';
import realTimeDataOnce from './realTimeDataOnce';
import specificRealTimeData from './specificRealTimeData';
import allNotifications from './allNotifications';
import notification from './notification';
import AuthReducer from "./AuthReducer";

export default combineReducers({
  games: games,
  items: items,
  geninfos: geninfos,
  machinemaintinfos: machinemaintinfos,
  machineoperthresholds: machineoperthresholds,
  lines: lines,
  machines: machines,
  form: formReducer,
  realTimeData: realTimeData,
  realTimeSensorData: realTimeSensorData,
  realTimeDataOnce: realTimeDataOnce,
  specificRealTimeData: specificRealTimeData,
  allNotifications: allNotifications,
  notification: notification,
  Auth: AuthReducer
});
