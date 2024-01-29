// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import "./App.css";

const baseUrl = "http://localhost:3000";

function App() {
  const initialUserState = {
    user: null,
    token: "",
  };

  const [userState, setUserState] = useState(initialUserState);
  const [users, setUser] = useState([]);

  useEffect(() => {
    const loginWithToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const url = new URL("users/login", baseUrl).toString();
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });
        const loginData = await response.json();
        setUserState(loginData);
        localStorage.setItem("token", loginData.token);
      }
    };

    loginWithToken();
  }, []);

  const login = async (data) => {
    const url = new URL("users/login", baseUrl).toString();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const loginData = await response.json();
    setUserState(loginData);
    localStorage.setItem("token", loginData.token);
  };

  const getAllUsers = async () => {
    const url = new URL("users", baseUrl).toString();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${userState.token}`,
      },
    });
    const users = await response.json();
    console.log(users);
    setUser(users);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    login(data);
  };

  const logout = () => {
    setUserState(initialUserState);
    setUser([]);
    localStorage.removeItem("token");
  };

  return (
    <>
      <h1>Hola {userState.user ? userState.user.name : "usuario"}</h1>
      {!userState.user && (
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" name="email" id="email" placeholder="Email" />
          </div>
          <div>
            <input
              type="password"
              name="passwd"
              id="passwd"
              placeholder="Password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}

      {userState.user && (
        <>
          <div>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </div>
        </>
      )}

      <button type="button" onClick={getAllUsers}>
        Get users
      </button>
      <div>
        {Array.isArray(users) &&
          users.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
