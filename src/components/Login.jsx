import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import googleLogo from "../images/icons8-google.svg";

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${LOGIN_URL}auth/status`, { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (data.authenticated) {
          setUser(data.user);
        }
      })
      .catch(err => console.error('Error:', err));
  },[user] );

  const handleLogin = () => {
    window.location.href = `${LOGIN_URL}auth/google`;
  };

  return (
    <div className="Login p-5">
      <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to GoReads</CardTitle>
            <CardDescription>Login</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            Sign in with your Google account
            <Button onClick={handleLogin} className="w-full flex items-center justify-center">
              <img src={googleLogo} alt="Google Logo" className="mr-2" style={{ width: '1em', height: '1em' }} />
              Login with Google
            </Button>
          </CardContent>
        </Card>
    </div>
  );
};

export default Login;
