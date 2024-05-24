import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";
import api from "./utils/api";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";


function App() {
  // 데이터 가지고 온걸 저장해줄 state
  const [todoList,setTodoList] = useState([]); // 처음에는 비어있는 값
  const [todoValue,setTodoValue] = useState(""); // 처음에는 비어있는 값 

  const getTasks = async() => {
    const response = await api.get('/tasks') 
    console.log("test", response);
    setTodoList(response.data.data);
  };

  const addTask = async() =>{
    try{ const response = await api.post('/tasks', {
      task: todoValue, isComplete: false
    });
    if(response.status === 200){
      console.log("success")
      // 1. 입력한 값이 안 사라짐 
      setTodoValue("");
      // 2. 추가한 값이 안 보임
      getTasks();
    }else{
      throw new Error('task can not be added');
    }
    }catch(err) {
      console.log("error", err)
    }
  };

  const toggleTaskCompletion = async(taskId) => {

    try {
      const task = todoList.find((item) => item._id === taskId);
      const response = await api.put(`/tasks/${taskId}`, {isComplete: !task.isComplete});
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  const deleteTask = async(taskId) =>{
    try{
      const response = await api.delete(`/tasks/${taskId}`);
      if(response.status === 200){
        console.log("success")
        getTasks();
      }
    } catch(err){
      console.log("error", err)
    }
  }
  useEffect(()=>{
    getTasks();
  },[])

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event)=>setTodoValue(event.target.value)} // user의 input 값을 setTodoValue에 넣어준다.
          />
        </Col>
        <Col xs={12} sm={2}>
          <button type="button" className="button-add" onClick= {addTask}>Add</button>  
        </Col>
      </Row>

      <TodoBoard 
      todoList={todoList}
      toggleTaskCompletion={toggleTaskCompletion}
      deleteTask = {deleteTask}
      />
    </Container>
  );
}

export default App;
