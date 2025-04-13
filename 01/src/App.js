import React, {useState} from 'react';

function MyButton({county,setCounty}){
  return(
    <button onClick={setCounty}>
      click me {county} times
    </button>
  )
}

function MyApp(){
  const products = [
    {id:1, name: 'laptop', qty:20},
    {id:2, name: 'tablet', qty:22},
    {id:3, name: 'phone', qty:30},
    {id:4, name: 'watch', qty:15}
  ];

  const items = products.map(
    product => 
              <li key={product.id}
                  style=
                  {{ color: product.qty>20 ? 'green' : 'red'}}
              >
                Name is : <strong>{product.name}</strong> and Quantity is : <i>{product.qty}</i>
              </li>
  );

  const [count,setCount] = useState(0);//intial value is 0

  function handleClick(){
    setCount(count+1);
  }

  const [todo,setTodo] = useState(null);
  const [id,setId] = useState('');

  const getTaskById = () => {
    fetch(`https://todos-express.onrender.com/todos/${id}`)
      .then((res) => res.json())
      .then((todo) => {setTodo(todo.data); alert(todo.message);})
      .catch((err) => console.error('Error : ', err));
  };

  return(
    <>
    <ul>
      <h1 style={{ 
        color: 'red'
       }}>DATA FROM TODOS API</h1>
      <input 
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder='Enter id of task'
      />
      <button onClick={getTaskById}
      >Get Task</button>
      {todo ? (
        <>
        {/*
            remove id from URL
            todo.map((task) => (
            <li key={task.id}>{task.title} : {task.isCompleted ? 'Completed' : 'Not Completed'}</li>
        ))*/}
        <li key={todo.id}>{todo.title} : {todo.isCompleted ? 'Completed' : 'Not Completed'}</li>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <hr style={{
        border: '1px black solid'
      }}/>
      {items}
      <h4>These are synchronised counters (move useState to buttonComp for asynch)</h4>
      <MyButton county={count} setCounty={handleClick}/>
      <MyButton county={count} setCounty={handleClick}/>
      <a href="Hello.js">say hello {count}</a>
    </ul>
    </>
  );
}

export default MyApp;