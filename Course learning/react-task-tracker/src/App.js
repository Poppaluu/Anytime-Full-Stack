import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true,
    },
    {
        id: 2,
        text: 'Meeting at School',
        day: 'Feb 6th at 1:30pm',
        reminder: true,
    },
    {
        id: 3,
        text: 'Food Shopping',
        day: 'Feb 5th at 2:30pm',
        reminder: false,
    },
])
  return (
    <div className="container">
      <h1 style={{color: 'red', backgroundColor: 'black'}}>Hello</h1>
      <Header/>
      <Tasks tasks={tasks}/>
    </div>
  );
}

/*
const App = () => {
  return (
    <div className="container">
      <Header title='This is a prop'/>
    </div>
  );
};
*/
export default App;
