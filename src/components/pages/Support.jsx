import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import Cookies from 'js-cookie';
import { ClipLoader } from 'react-spinners';

const Support = () => {
  const [text, setText] = useState("");
  const [responseStatus, setResponseStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true); 
    const userID = Cookies.get('ID');
    const userNickname = Cookies.get('Nickname');
    const token = Cookies.get('Token');
    if (!userID && !userNickname && !token) {
      console.error("User ID, Nickname, or Token not found in cookies");
      setIsSubmitting(false);
      return;
    }
    const data = { text, userID, userNickname };
    try {
      const response = await fetch(`${API_URL}support`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) { throw new Error('Network response was not ok') }
      const responseData = await response.json();
      if (responseData.status === 'Success') {
        setResponseStatus('Success');
        setText("");
      } else {
        setResponseStatus('Fail');
      }
    } catch (error) {
      setResponseStatus('Fail');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="support p-5">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Support</CardTitle>
          <CardDescription>
            Please enter the details of your issue or inquiry in the message below. Our support team will review your message and respond as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            {responseStatus === 'Success' && (<h1 className="text-green-500">Your message has been sent to support.</h1>)}
            {responseStatus === 'Fail' && (<h1 className="text-red-500">There was an error sending your message. Please try again.</h1>)}
            {!isSubmitting ? (
              <>
                <Label htmlFor="textarea">Your message</Label>
                <Textarea
                  id="textarea"
                  type="text"
                  placeholder="Enter the message"
                  style={{ height: '10rem' }}
                  value={text}
                  onChange={handleChange}
                  required
                />
              </>
            ) : (
              <div className="flex justify-center items-center">
                <ClipLoader size={50} color={"#123abc"} loading={isSubmitting} />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {!isSubmitting && (
            <Button className="w-full" onClick={handleSubmit} disabled={!text}>
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Support;
