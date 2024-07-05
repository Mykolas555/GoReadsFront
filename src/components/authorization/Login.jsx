import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = formData.nickname && formData.password;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${LOGIN_URL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        Cookies.set('Nickname', data.data.userNickname, { expires: 7 });
        Cookies.set('User', data.data.userName, { expires: 7 });
        Cookies.set('ID', data.data.userID, { expires: 7 });
        Cookies.set('Token', data.data.userToken, { expires: 7 });
        window.location.href = '/';
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login p-5">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to GoReads</CardTitle>
          <CardDescription>Login</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && <div className="text-red-500">{error}</div>}
          {loading ? (
            <div className="flex justify-center">
              <ClipLoader size={50} color="#4A90E2" />
            </div>
          ) : (
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  type="nickname"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={!isFormValid}>
                Login
              </Button>
            </form>
          )}
          <CardDescription>Don't have an account? <span className="text-green-500 cursor-pointer" onClick={() => navigate('/register')}>Click here</span></CardDescription>       
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
