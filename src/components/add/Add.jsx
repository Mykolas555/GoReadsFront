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

  const [responseStatus, setResponseStatus] = useState(null);
  const [loading, setLoading] = useState(false);

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
      } catch (error) {
        console.error('Error:', error);
      }
    };
    retrieveInfo();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReadText((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeployClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}reads/postRead`, {
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
      
      setResponseStatus(responseData.status);
      if (responseData.status === "Success") {
        setReadText({
          theme: "",
          text: "",
        });
      }
    } catch (error) {
      setResponseStatus('Fail'); 
    } finally {
      setLoading(false);
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
            <Button onClick={handleDeployClick} disabled={loading}>
              {loading ? 'Deploying...' : 'Deploy'}
            </Button>
          </CardFooter>
          {responseStatus === 'Fail' && (
            <CardContent>
              <h1 className="text-red-500">Failed to deploy your read. Please try again.</h1>
            </CardContent>
          )}
          {responseStatus === 'Success' && (
            <CardContent>
              <h1 className="text-green-500">Your reed has been deployed.</h1>
            </CardContent>
          )}
        </Card>
      ) : (
        <h1>Please <a href="/login" className="text-blue underline">login</a> to post a read.</h1>
      )}
    </div>
  );
};

export default Add;