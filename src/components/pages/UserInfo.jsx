import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userID = Cookies.get('ID');
        const token = Cookies.get('Token');
        const response = await fetch(`${API_URL}user/${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) { throw new Error('Failed to fetch data') }
        const data = await response.json();
        setUser(data.data.user);
        setLoading(false);
      } catch (error) {
        setError('Error getting data.');
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) { return <div>Loading...</div> }
  if (error) { return <div>{error}</div> }

  return (
    <div className="support p-5">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">User information</CardTitle>
        </CardHeader>
        <CardContent className="flex ">
          <div className="flex">
            <div className="flex justify-center items-center">
              <div>
                {user ? (
                  <>
                    <div className="text-1rem">
                      <strong>Nickname:</strong> {user.nickname}
                    </div>
                    <div className="text-1rem">
                      <strong>Name:</strong> {user.name}
                    </div>
                    <div className="text-1rem">
                      <strong>Last name:</strong> {user.lastName}
                    </div>
                    <div className="text-1rem">
                      <strong>Email:</strong> {user.email}
                    </div>
                  </>
                ) : (
                  <div>No user data available</div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Settings;
