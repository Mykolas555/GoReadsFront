import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormatter } from '../../utils/dateFormatter';

const Reads = () => {
  const [reads, setReads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReads = async () => {
      try {
        const response = await fetch(`${API_URL}reads/allReads`);
        const data = await response.json();
        setReads(data.data.reads);
        setLoading(false); 
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
    fetchReads();  
  }, []);

  return (
    <div className="yours w-full p-5">
      {loading ? (
        <div className="w-full m-2 text-center">
          <h2>Waiting for data...</h2>
        </div>
      ) : (
        reads.map(read => (
          <Card key={read._id} className="w-full m-2">
            <CardHeader>
              <CardTitle>{read.theme}</CardTitle>
            </CardHeader>
            <CardContent>
              {read.text}
            </CardContent>
            <CardFooter className="flex justify-between">
              <CardDescription>@{read.userNickname}</CardDescription>
              <CardDescription>{dateFormatter(read.createdAt)}</CardDescription>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}

export default Reads;
