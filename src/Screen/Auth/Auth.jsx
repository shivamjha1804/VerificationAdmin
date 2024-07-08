import React, { useState } from "react";

const Auth = () => {
  const [signIn] = useState(true);
  return (
    <div>
      <section signIn={signIn}>
        <form>
          <title>Create Account</title>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign up</button>
        </form>
      </section>
      <section signIn={signIn}>
        <form>
          <title>Sign In</title>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign in</button>
        </form>
      </section>
    </div>
  );
};

export default Auth;
