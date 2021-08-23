import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER } from "./mutations/user";

const App = () => {
  const {data, loading, error, refetch} = useQuery(GET_ALL_USERS);
  const {data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  });
  const [newUser]              = useMutation(CREATE_USER);

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    if(!loading){
      setUsers(data.getAllUsers);
    }
    // content
    return () => {
      // clearEffect
    };
  }, [data]);

  console.log("oneUser", oneUser);
  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          userName, age
        }
      }
    }).then(({data}) => {
      console.log(data);
      setUserName("");
      setAge(0);
    })
  }

  const getAll = e => {
    e.preventDefault();
    refetch();
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>GraphQL</h1>
      <form>
        <input value={userName} onChange={e => setUserName(e.target.value)} type="text" />
        <input value={age}      onChange={e => setAge(e.target.value * 1)}      type="number" />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Create</button>
          <button onClick={(e) => getAll(e)}>Get</button>
        </div>
      </form>
      <div>
        {}
        {users.map((user, index) => {
          return (
            <div key={index.toString()} className="user">Id - {user.id}, UserName - {user.userName}, Age - {user.age}</div>
          );
        })}
      </div>
    </div>
  );
}

export default App;