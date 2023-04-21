import React, { useState, useContext} from 'react';
import './QuestionForum.css';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { useParams } from "react-router-dom";

const QuestionForum = () => {
// useState hook is used to keep track of the selected topic and the description of the topic
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [user] = useContext(UserContext);
  const { sessionId } = useParams();
//   const response = await axios.get(`http://localhost:3001/user/${user}/name`);
//   const fetchedName = response.data.name;

  // handleSubmit function is called when the user 
  // clicks the submit button and logs the selected topic and description to the console. 
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Topic/Question: ${topic}, Description: ${description}, Student ID: ${user}`)

    const questionData = {
        studentId: user,
        question: description,
        topic: topic
    };

    console.log(`Question Data:`, questionData);
    console.log(`Session ID:`, sessionId);

    try {
        const response = await axios.put(`http://localhost:3001/session/${sessionId}/addQuestionToTopic`, questionData);
        console.log(response.data);
        // displaying success message
      } catch (error) {
        console.error(error);
        // handeling errors
      }
};

  // handleCancel function is called when the user clicks the 
  // cancel button and resets the selected topic and description to empty strings.
  const handleCancel = () => {
    setTopic('');
    setDescription('');
  };

  const topics = ['Topic 1', 'Topic 2', 'Topic 3'];

  return (
    <div>
        <span class = "logo">Office<span class="colored-letter">Q</span></span>
        <div className="theForm">
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Desired Topic/Question:
                    <textarea value={topic} onChange={(event) => setTopic(event.target.value)}/>
                </label>
                <label>
                    Or </label>
                <label>
                    Select Existing Topic/Question:
                    <select value={topic} onChange={(event) => setTopic(event.target.value)}>
                    <option value="">--Select a topic--</option>
                    {topics.map((topic) => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
                    </select>
                </label>
                <br />
                <label>
                    Topic/Question description:
                    <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
                </label>
                <br />
                <div className="buttonContainer">
                    <button className='cancelBttn' type="button" onClick={handleCancel}>Cancel</button>
                    <button className='submitBttn' type="submit">Submit</button>
                </div>
                </form>
            </div>
    </div>
  );
}
export default QuestionForum;