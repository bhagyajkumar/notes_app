import NavBar from '../components/NavBar'
import { userContext } from '../context';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';

export default function Home() {
    const [user, setUser] = useState();
    useEffect(() => {
        supabase.auth.getUser()
            .then(({data}) => setUser(data.user))
    },[])
    return (
        <userContext.Provider value={{user:user}}>
            <NavBar />
        </userContext.Provider>
    )
}