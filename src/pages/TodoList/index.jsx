import React, { useState} from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { Input, Row, Col,} from 'antd';
import {
   createTask,
   deleteTask,
 } from '../../redux/actions';
import './styles.scss';
function TodoList({
   todoListData,
   createTask,
   deleteTask,
}){
   const { TextArea } = Input;
   const [moreInfoList, setMoreInfoList] = useState([]);
   
   const renderCustomInput=(props)=>{
      const {field, meta}=props;
      return(
              <>
                  <Input className="row__input-col-title"  value={""}
                 {...field}
                 type= {field.type}
                  />
                  {meta.touched && meta.error ? <div style={{color:"red", position:"relative", top:"-1.7rem", width:"60rem", margin:"0 auto"}}> {meta.error}</div>: null}
              </>
      );
     }

   const renderCustomTextArea=(props)=>{
      const {field, meta}=props;
      return(
            <>
                  <TextArea className="row__input-col-detail"
               {...field}
                  />
                  {meta.touched && meta.error ? <div style={{color:"red", position:"relative", top:"-1.7rem", width:"60rem", margin:"0 auto"}}> {meta.error}</div>: null}
            </>
      )
   }
   
   const renderTodoList = ()=>{
      return todoListData.map((itemTodoList)=>{
         return(
            <div className="box-content">
               <div className="box-content__title-detail">
                  <li>{itemTodoList.title}</li>
                  {(moreInfoList.findIndex((id) => id === itemTodoList.id) !== -1) && (
                     <p>- {itemTodoList.detail}</p>
                  )}
                  
               </div>
               <div className="box-content__time-button">
                  <div className="note__time">
                     <span>Recorded: {itemTodoList.currentTime}</span>
                  </div>
                  <div className="note__button--modify">
                     <span style={{marginRight:"1.5rem"}}
                     onClick={() => handleToggleMoreInfo(itemTodoList.id)}
                     >
                        {moreInfoList.findIndex((moreId) => moreId === itemTodoList.id) === -1 ? '(Show Details)' : '(Hide Details)'}
                     </span>
                     <span type="danger" onClick={()=>{handleDeleteTask(itemTodoList.id)}}>(Remove Note)</span>
                  </div>
               </div>
            </div>
         )
      })
   }
   //edit beta
   //edit master
   var today = new Date();
   const currentDay=(day)=>{
      var day_name = '';
      switch (today.getDay()) {
         case 0:
             day_name = "Sun";
             break;
         case 1:
             day_name = "Mon";
             break;
         case 2:
             day_name = "Tue";
             break;
         case 3:
             day_name = "Wed";
             break;
         case 4:
             day_name = "Thu";
             break;
         case 5:
             day_name = "Fri";
             break;
         case 6:
             day_name = "Sat";
         }
         return day_name;
   }
   console.log("day-day: ", currentDay(today));
   var date = currentDay(today) + ' ' + today.getDate()+ '-' + (today.getMonth() + 1)+ '-' + today.getFullYear();
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   var dateTime = date + ' '+ time;
   const handleSubmitForm = (values)=>{
      createTask({
         id: Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100),
         title: values.title,
         detail: values.detail,
         currentTime: dateTime
       });
       document.getElementById("input--focus").reset();
   }

   const handleDeleteTask = (deletedId) => {
      deleteTask({ id: deletedId });
    }

    const handleToggleMoreInfo = (id) => {
      const moreInfoIndex = moreInfoList.findIndex((moreId) => moreId === id);
      if (moreInfoIndex === -1) {
        setMoreInfoList([
          ...moreInfoList,
          id,
        ]);
      } else {
        const newMoreInfoList = moreInfoList;
        newMoreInfoList.splice(moreInfoIndex, 1);
        setMoreInfoList([
          ...newMoreInfoList,
        ]);
      }
    }
   return(
      <>
         <Row style={{margin: "0 auto"}} className="row__todoList">
            <Col span={24} className="row__todoList-col">
               <Row>
                  <Col span={24}>
                     <h1>Timestamped Notes App</h1>
                  </Col>
               </Row>
               
               <Row className="row__input">
                  <Col span={24}  className="row__input-col">
                     <div >
                        <Formik
                           initialValues={
                                 {
                                    title: "",
                                    detail: "",
                                 }
                           }
                           validationSchema={Yup.object({
                              title: Yup.string()
                                 .required('Work content cannot be left blank')
                                 .max(50, 'Work content must not exceed 50 characters'),
                              detail: Yup.string()
                                 .required('Job description cannot be left blank')
                                 .max(50, 'Job description must not exceed 200 characters'),
                           })}
                             onSubmit={(values) => {handleSubmitForm(values)}}
                        >
                           <Form id="input--focus" >
                              <Field name="title">
                                 {(props)=>renderCustomInput({
                                       ...props,
                                       field: {
                                       ...props.field,
                                       placeholder:'Note title',
                                       type:'text',
                                    },
                                    })
                                 }
                              </Field>

                              <Field name="detail">
                                 {(props)=>renderCustomTextArea({
                                       ...props,
                                       field: {
                                       ...props.field,
                                       placeholder:'Note details',
                                    },
                                    })
                                 }
                              </Field>
                              <button type="submit" className="row__input-col-button">Add Note</button>
                           </Form>
                        </Formik>
                     </div>
                     
                  </Col>
               </Row>
            </Col>

            <Col span={24} className="box">
               {renderTodoList()}

            </Col>
         </Row>
      </>
   )
}
const mapStateToProps = (state) => {
   console.log('Log: mapStateToProps -> state', state);
   const {todoListData} = state.todoListReducer;
   return {
      todoListData,
   }
 };

 const mapDispatchToProps = (dispatch) => {
   return {
     createTask: (params) => dispatch(createTask(params)),
     deleteTask: (params) => dispatch(deleteTask(params)),
   };
 }
 export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
