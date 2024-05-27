import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

const RegisterPage = () => {
  const [name ,setName] =useState('');
  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');
  const [secondPassword, setSecondPassword] = useState ('');
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); //refresh 막아주기
    try{
      if(password!==secondPassword) {
        throw new Error("password does not match!");
      }
      const response = await api.post("/user", {name,email,password});
      if(response.status === 200){
        navigate('/login');
      }else{
        throw new Error(response.data.error);
      }

    }catch(error){
      setError(error.message);
    }

  };

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>Create account</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="First and last name" onChange={(event)=>setName(event.target.value)}/> 
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-enter password</Form.Label> 
          <Form.Control type="password" placeholder="Re-enter password" onChange={(event)=>setSecondPassword(event.target.value)}/>
          {error && <div className="bold"> {error}</div>}
        </Form.Group>

        <Button className="button-primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
