import React from "react";
import { Col, Row } from "react-bootstrap";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";



const TodoItem = ({item,toggleTaskCompletion, deleteTask}) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item  ${item.isComplete ? "item-complete" : ""}`}>
          <div className="todo-content">{item.task}</div>

          <div>
          <button className="button-delete" onClick={() => toggleTaskCompletion(item._id)}> {item.isComplete ? <MdOutlineCheckBox /> : <MdCheckBoxOutlineBlank />}</button>
            <button className="button-delete" onClick={()=>deleteTask(item._id)}><FaTrashAlt /></button>
            
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
