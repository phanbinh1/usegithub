import {
   CREATE_TASK,
   DELETE_TASK,
 } from '../constants';
 
 export function createTask(params) {
   return {
     type: CREATE_TASK,
     payload: params,
   }
 }
 
 export function deleteTask(params) {
   return {
     type: DELETE_TASK,
     payload: params,
   }
 }
 

 