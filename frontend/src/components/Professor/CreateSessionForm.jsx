import { useState, useContext } from "react";
import "./CreateSessionForm.module.css";
import axios from "axios";
import { UserContext } from '../../context/userContext';

const CreateSessionForm = (props) => {

    const [user] = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [course, setCourse] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();  

        const parsedDate = new Date(date);

        const formattedDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
        const startDateTime = formattedDate + " " + startTime;
        const endDateTime = formattedDate + " " + endTime;

        let response = await axios.get(`http://localhost:3001/user/${user}/name`);
        const professorName = response.data.name;        

        response = await axios.get(`http://localhost:3001/user/${user}/university`);
        const university = response.data.university;


        response = await axios.post('http://localhost:3001/session/createSession', {
            professorId: user,
            professorName: professorName,
            title: title,
            class: course,
            university: university,
            description: description,
            location: location,
            startTime: startDateTime,
            endTime: endDateTime,
            inSession: false
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
            }
        })
        
        if (response) {
            console.log(response.data._id);
        }
        
        props.onSubmit();
    }


    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>Title</label>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                <label>Course</label>
                <input type="text" value={course} onChange={(event) => setCourse(event.target.value)} />
                <label>Date</label>
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                <label>Start Time</label>
                <input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} />
                <label>End Time</label>
                <input type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} />
                <label>Location</label>
                <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
                <label>Description</label>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateSessionForm;