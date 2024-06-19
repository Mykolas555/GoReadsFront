import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from 'js-cookie';
import { dateFormatter } from '../../utils/dateFormatter';

const Yours = () => {
  const [reads, setReads] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchReads = async () => {
      try {
        const userGoogleID = Cookies.get('ID');
        const token = Cookies.get('Token');
        const response = await fetch(`http://localhost:5000/api/reads/${userGoogleID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setReads(data.data.reads);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching reads:', error);
        setError('Error getting data. Please <a href="/login">login</a>.');
        setLoading(false);
      }
    };
    fetchReads();
  }, []);

  return (
    <div className="yours w-full p-10">
      {loading && <p>Loading...</p>}
      {error && <h1>Please <a href="/login" className="text-blue underline">login</a> to post a read.</h1>}
      {reads && (
        <div>
          {reads.map((read, index) => (
            <Card key={index} className="w-full m-2">
              <CardHeader>
                <CardTitle>{read.theme}</CardTitle>
              </CardHeader>
              <CardContent>
                {read.text}
              </CardContent>
              <CardFooter className="flex justify-between">
                <CardDescription>{read.userName}</CardDescription>
                <CardDescription>{dateFormatter(read.createdAt)}</CardDescription>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Yours;
