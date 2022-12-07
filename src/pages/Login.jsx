import { useRef, useState } from "react";
import { ButtonGroup, Card, Button, Container, Form } from "react-bootstrap";
import  NavBar  from '../components/NavBar'
import "../App.css"
import supabase from '../lib/supabase'
import { useNavigate } from "react-router-dom";


export function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { user,error } = await supabase.auth.signInWithPassword({email,password})
        if(error){
            alert(error.message)
        }
        else{
            navigate("/")
        }
    }

    return (
        <>
        <NavBar />
            <Container>
                <Card className="bg-dark text-white vertical-center shadow-lg">
                    <Card.Header>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                        </svg>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <div style={{ marginLeft: "30%", marginRight: "30%" }}>
                                    <Form.Control onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="text-light" style={{ backgroundColor: "#444444", borderColor: "#000" }} placeholder="email"></Form.Control>
                                    <br />
                                    <Form.Control onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="text-light" style={{ backgroundColor: "#444444", borderColor: "#000" }} placeholder="password"></Form.Control>
                                    <br />
                                    <input className="btn btn-primary" type="submit" value="Login" />
                                </div>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}