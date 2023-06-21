import { useState } from 'react';
import Map from '../common/Map';
import { useAppSelector } from '../redux/hooks';

function Home() {
    const [, setMyPosition] = useState({lat:0, lng:0});
    const user = useAppSelector((state) => state.auth.user);
    return (
        <>
            {user? <Map setMyPosition={setMyPosition}/> : <h1>Loading</h1>}
        </>
    )
}

export default Home