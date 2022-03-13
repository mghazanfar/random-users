import './App.scss';
import { UsersContainer } from './users/users.container';

function App() {
  return (
    <div className='app'>
      <h1>Random Users</h1>
      <p>
        This is a test application and it uses ReactJS, scss for styling, axios for fetching the data and context to keep page number on state reload.
      </p>
      <UsersContainer />
    </div>
  );
}

export default App;
