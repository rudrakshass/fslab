import React, { useState } from 'react';
import './App.css';


function App() {
  const [votes, setVotes] = useState({ option1: 0, option2: 0, option3: 0 });


  const handleVote = (option) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [option]: prevVotes[option] + 1,
    }));
  };


  return (
    <div className="App">
      <h1>Voting Application</h1>
      <div className="options">
        <div>
          Option 1:
          <button onClick={() => handleVote('option1')}>BJP</button>
          <span>{votes.option1}</span>
        </div>
        <div>
          Option 2:
          <button onClick={() => handleVote('option2')}>Congress</button>
          <span>{votes.option2}</span>
        </div>
        <div>
          Option 3:
          <button onClick={() => handleVote('option3')}>JDS</button>
          <span>{votes.option3}</span>
        </div>
      </div>
    </div>
  );
}



export default App;
