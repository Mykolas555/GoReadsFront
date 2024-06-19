import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Cookies from 'js-cookie';

const Add = () => {
  const [readText, setReadText] = useState({
    theme: "",
    text: "",
  });

  const [userInfo, setUserInfo] = useState({
    userName: '',
    userGoogleID: '',
    token: '',
  });

  useEffect(() => {
    const retrieveInfo = async () => {
      try {
        const userName = Cookies.get('User');
        const userGoogleID = Cookies.get('ID');
        const tokenValue = Cookies.get('Token');
        const hasValues = userName && userGoogleID && tokenValue;
        const infoAboutUserFromCookie = hasValues ? {
          userName,
          userGoogleID,
          token: tokenValue,
        } : {};

        setUserInfo(infoAboutUserFromCookie);
        console.log('Retrieved token:', infoAboutUserFromCookie);
      } catch (error) {
        console.error('Error retrieving cookie:', error);
      }
    };
    retrieveInfo();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReadText((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeployClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reads/postRead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          ...readText,
          userName: userInfo.userName,
          userGoogleID: userInfo.userGoogleID,
        }),
      });
      const responseData = await response.json();
      setReadText({
        theme: "",
        text: "",
      });
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="reads p-10">
      {userInfo.userName && userInfo.userGoogleID && userInfo.token ? (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Post your Read</CardTitle>
            <CardDescription>Deploy your Read to feed</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="theme">Theme</Label>
                  <Input
                    id="theme"
                    name="theme"
                    placeholder="Enter theme of your Read"
                    value={readText.theme}
                    onChange={handleChange}
                  />
                  <Label htmlFor="text">Your Read</Label>
                  <Textarea
                    id="text"
                    name="text"
                    placeholder="Type your Read here."
                    value={readText.text}
                    onChange={handleChange}
                    className="h-40 resize-none"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleDeployClick}>Deploy</Button>
          </CardFooter>
        </Card>
      ) : (
        <h1>Please <a href="/login" className="text-blue underline">login</a> to post a read.</h1>
      )}
    </div>
  );
};

export default Add;
