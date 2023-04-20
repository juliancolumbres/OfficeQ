import React, { useState, useSearchParams } from 'react';

const ForumComponent = () => {
// useState hook is used to keep track of the selected topic and the description of the topic
  const [selectedTopic, setSelectedTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [description, setDescription] = useState('');
  // const [queryParameters] = useSearchParams();

  // const id = queryParameters.get("sessionId");
  // handleSubmit function is called when the user 
  // clicks the submit button and logs the selected topic and description to the console. 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Selected topic: ${selectedTopic}, Description: ${description}`);
  };

  // handleCancel function is called when the user clicks the 
  // cancel button and resets the selected topic and description to empty strings.
  const handleCancel = () => {
    setSelectedTopic('');
    setDescription('');
  };

  const topics = ['Topic 1', 'Topic 2', 'Topic 3'];

  return (
    <form onSubmit={handleSubmit}>
     <label>
        Custom Topic
        <input value={customTopic} onChange={(event) => setCustomTopic(event.target.value)} />
      </label>
      <label>
        Select a topic:
        <select value={selectedTopic} onChange={(event) => setSelectedTopic(event.target.value)}>
          <option value="">--Select a topic--</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </label>
      <br />
      <label>~
        Topic description:
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <br />
      <button type="button" onClick={handleCancel}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}
export default ForumComponent;