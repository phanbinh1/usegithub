import {
   CREATE_TASK,
   DELETE_TASK,
 } from '../constants';

const initialState = {
   todoListData: [],
};
export default function todoListReducer(state = initialState, action){
   switch(action.type){
      case CREATE_TASK: {
         return {
           ...state,
           todoListData: [
             action.payload,
             ...state.todoListData,
           ],
         }
       }

       case DELETE_TASK: {
         const { id } = action.payload;
         const newTodoListData = state.todoListData;
         const taskIndex = state.todoListData.findIndex((item) => item.id === id);
         newTodoListData.splice(taskIndex, 1);
         return {
           ...state,
           todoListData: [
             ...newTodoListData,
           ],
         }
       }
      default: {
         return state;
      }
   }
}