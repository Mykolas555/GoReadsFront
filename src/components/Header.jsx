import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { checkAuthStatus } from '../utils/chekLoggedUser';
import Cookies from 'js-cookie';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus()
      .then(data => {
        if (data.authenticated) {
          setUser(data.user);
        } else {
          Cookies.remove('Token');
          Cookies.remove('ID');
          Cookies.remove('User');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        
      });
  }, []);

  const handleLogout = () => {
    navigate("/");
    window.location.reload();
    fetch(`${LOGIN_URL}auth/logout`, { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          setUser(null);
        } else {
          navigate('/');
          alert('Logout failed');
        }
      })
      .catch(err => console.log('Error logging out:', err));
  };

  const navigateSettings = () => {
    navigate("/settings");
  };

  const navigateSupport = () => {
    navigate("/support");
  };

  return (
    <header className="sticky w-full top-0 flex gap-4 border-b bg-background p-4 md:px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem asChild>
            <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
              Reads
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/yours" className="text-muted-foreground transition-colors hover:text-foreground">
              Yours
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/add" className="text-muted-foreground transition-colors hover:text-foreground">
              Add
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <nav className="hidden flex-grow md:flex md:items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
              Reads
            </Link>
          </li>
          <li>
            <Link to="/yours" className="text-muted-foreground transition-colors hover:text-foreground">
              Yours
            </Link>
          </li>
          <li>
            <Link to="/add" className="text-muted-foreground transition-colors hover:text-foreground">
              Add
            </Link>
          </li>
        </ul>
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <img src={user.photos[0].value} className="h-5 w-5" alt="User Avatar" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user._json.given_name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={navigateSettings}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={navigateSupport}>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
