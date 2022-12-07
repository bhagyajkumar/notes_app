import { useRef, useState } from "react";
import { ButtonGroup, Card, Button, Container, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar'
import "../App.css"
import supabase from "../lib/supabase";


export function Signup() {

    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password1);
        const { user, error } = await supabase.auth.signUp({ email, password: password1 })
        if (error) {
            alert(error.message)
        }
        else {
            alert("A confirmation message has been sent to your email")
        }
    }

    return (
        <>
            <NavBar />
            <Container>
                <Card className="bg-dark text-white vertical-center shadow-lg">
                    <Card.Header>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                            <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
                        </svg>
                        <div style={{ textAlign: "center" }}>
                            Join Notes App today
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <div style={{ marginLeft: "30%", marginRight: "30%" }}>
                                    <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="text-light" style={{ backgroundColor: "#444444", borderColor: "#000" }} placeholder="email"></Form.Control>
                                    <br />
                                    <Form.Control onChange={(e) => setPassword1(e.target.value)} value={password1} type="password" className="text-light" style={{ backgroundColor: "#444444", borderColor: "#000" }} placeholder="password"></Form.Control>
                                    <br />
                                    <Form.Control onChange={(e) => setPassword2(e.target.value)} value={password2} type="password" className="text-light" style={{ backgroundColor: "#444444", borderColor: "#000" }} placeholder="retype password"></Form.Control>
                                    {
                                        password1 != password2 && <Alert variant="primary">The password doesn't match</Alert>
                                    }

                                    <br />
                                    <input disabled={email === "" || password1 != password2 || password1 === ""} className="btn btn-primary" type="submit" value="signup" />
                                </div>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}