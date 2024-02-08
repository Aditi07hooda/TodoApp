import React from "react";

export const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <form action="http://localhost:5000/" method="post">
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
