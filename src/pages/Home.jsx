import NavBar from '../components/NavBar'
import { userContext } from '../context';
import { useEffect, useRef, useState } from 'react';
import supabase from '../lib/supabase';
import { Button, Card, Container, Form, Modal } from 'react-bootstrap';

export default function Home() {
    const [user, setUser] = useState();
    const [notes, setNotes] = useState([]);
    const [creating, setCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [fetchedData, setFetchedData] = useState({});

    const title = useRef();
    const content = useRef();


    useEffect(() => {
        supabase.auth.getUser()
            .then(({ data }) => setUser(data.user))

        supabase.from('notes').select('id,title').order('id', { ascending: false })
            .then(({ data }) => { setNotes(data); console.log(data) })

        return (() => {
            setIsLoading(false)
        })
    }, [isLoading])

    const handleCreate = (e) => {
        e.preventDefault()
        if (title.current.value === "" && content.current.value === "") {
            return
        }
        console.log(title.current.value);
        console.log(content.current.value);
        supabase.from('notes').insert([{ title: title.current.value, content: content.current.value, user_id: user.id }])
            .then((value) => {
                console.log(value);
                setIsLoading(true)
            })
    }

    const handleDelete = (id) => {
        supabase.from('notes').delete().eq('id', id)
            .then((val) => console.log(val))
        setIsLoading(true)
    }

    const handleOpen = (id) => {
        console.log(id)
        supabase.from('notes').select('title,content').eq('id', id)
            .then((val) => {
                console.log(val.data[0]);
                setFetchedData(val.data[0])
                setShowContent(true)
            })
    }

    return (
        <userContext.Provider value={{ user: user }}>
            <Modal
                show={showContent}
                onHide={() => setShowContent(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{fetchedData?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        fetchedData?.content
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowContent(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <NavBar />
            <Container>
                <br />
                <div style={{ textAlign: "right" }}>
                    <Button onClick={() => setCreating(!creating)} variant={creating ? 'danger' : 'success'}>{creating ? 'Close' : 'New'}</Button>
                </div>
                {
                    creating ? (
                        <>
                            <Card style={{ backgroundColor: "#292d3e" }}>
                                <Card.Header style={{ color: "#fff" }}>
                                    Create a new Note
                                </Card.Header>
                                <Card.Body >
                                    <Form onSubmit={handleCreate}>
                                        <Form.Control ref={title} placeholder='Title' style={{ backgroundColor: "#444444", borderColor: "#000", color: "#fff" }} />
                                        <br />
                                        <textarea ref={content} placeholder='content' className='form-control' style={{ backgroundColor: "#444444", borderColor: "#000", color: "#fff" }}></textarea>
                                        <br />
                                        <input className='btn btn-success' type="submit" value="Save" />
                                    </Form>
                                </Card.Body>
                            </Card>
                        </>
                    ) : (<></>)
                }
                <br />
                {
                    notes.map((item) => {
                        return (
                            <div key={item.id}>
                                <Card style={{ backgroundColor: "#292d3e", color: "white" }}>
                                    <Card.Body>
                                        <div>{item.title}</div>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button onClick={() => handleOpen(item.id)} variant='primary' style={{ marginRight: "5px" }}>View</Button>
                                        <Button onClick={() => handleDelete(item.id)} style={{ marginRight: "5px" }} variant='danger'>Delete</Button>
                                        <Button variant='secondary'>Edit</Button>
                                    </Card.Footer>
                                </Card>
                                <br />
                            </div>
                        )
                    })
                }
            </Container>
        </userContext.Provider >
    )
}