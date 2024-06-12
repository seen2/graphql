import './App.css';
import { useQuery, gql } from '@apollo/client';


function App() {
  return (
    <div className="App">
      <DisplayLocations />
    </div>
  );
}

export default App;

function DisplayLocations() {
  const query = gql`
    query GetAllTodos {
      getTodos {
        title
        id
        userId
        user {
          name
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.getTodos.map(({ id, title,user },i) => (
    <div key={id}>
      <h3 >{(i+1)+'. '+title}</h3>
      <h4 >{user.name}</h4>
      <br />
    </div>
  ));
}