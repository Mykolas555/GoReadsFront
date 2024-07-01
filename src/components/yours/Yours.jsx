import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from 'js-cookie';
import { dateFormatter } from '../../utils/dateFormatter';
import { Button } from '../ui/button';

const Yours = () => {
  const [reads, setReads] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  
  useEffect(() => {
    const fetchReads = async () => {
      try {
        const userGoogleID = Cookies.get('ID');
        const token = Cookies.get('Token');
        const response = await fetch(`${API_URL}reads/${userGoogleID}`, {
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
        console.log('Error:', error);
        setError('Error getting data.');
        setLoading(false);
      }
    };
    fetchReads();
  }, []);

  const handleDeleteRead = async (readID) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this read?');
    if (!isConfirmed) {
      return;
    }
    try {
      const userID = Cookies.get('ID');
      const token = Cookies.get('Token');
      const response = await fetch(`${API_URL}reads/deleteRead/${userID}/${readID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete read');
      }

      // Remove the deleted read from the state
      setReads((prevReads) => prevReads.filter((read) => read._id !== readID));
    } catch (error) {
      console.log('Error:', error);
      setError('Error deleting read.');
    }
  };

  return (
    <div className="yours w-full p-10">
      {loading && <p>Loading...</p>}
      {error && <h1>Please <a href="/login" className="text-blue underline">login</a> to post a read.</h1>}
      {reads && reads.length === 0 && <p>You don't have any reads posted</p>}
      {reads && (
        <div>
          {reads.map((read, index) => (
            <Card key={index} className="w-full m-2">
              <CardHeader>  
                <CardTitle>{read.theme}</CardTitle>
                <CardTitle>{read._id}</CardTitle>
              </CardHeader>
              <CardContent>
                {read.text}
              </CardContent>
              <CardFooter className="flex justify-between">
                <CardDescription>{read.userName}</CardDescription>
                <div className='flex items-center gap-x-4'>
                  <CardDescription>{dateFormatter(read.createdAt)}</CardDescription>
                  <Button onClick={() => handleDeleteRead(read._id)}>X</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Yours;
