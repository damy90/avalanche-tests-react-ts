import { useState } from 'react';
import Map from '../common/Map';

function Home() {
    const [, setMyPosition] = useState({lat:0, lng:0});
    return (
        <>
            <Map setMyPosition={setMyPosition}/>
        </>
    )
}

export default Home