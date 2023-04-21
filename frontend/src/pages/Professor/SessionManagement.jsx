import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';



const SessionManagement = (props) => {

    const { sessionId } = useParams();
    console.log(sessionId);

    const [groups, setGroups] = useState([]);


    // const getGroups = async (sessionId) => {
    //     const response = await axios.get(`http://localhost:3001/user/${userId}/Groups`, {
    //     }).catch((error) => {
    //         if (error.response) {
    //             console.log(error.response);
    //         }
    //     })
    //     return response.data;
    // }

    // useEffect(() => {
    //     getGroups(sessionId)
    //         .then((fetchedGroups) => {
    //             setGroups(fetchedGroups)
    //         });

    //     console.log(groups);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[]);

    return (
        <div>
            {sessionId}
        </div>
    )
}


export default SessionManagement;