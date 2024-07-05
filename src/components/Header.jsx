import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const [cookieLoading, setCookieLoading] = useState(true);
  const [user, setUser] = useState({
    userNickname: "",
    userName: "",
    userID: "",
    token: ""
  });

  useEffect(() => {
    const loadCookies = async () => {
      try {
        const userNickname = Cookies.get('Nickname');
        const userName = Cookies.get('User');
        const userID = Cookies.get('ID');
        const token = Cookies.get('Token')
        if (userName && userID && token) {
          setUser({ userNickname, userName, userID, token });
        }
      } catch (error) { console.error('Error loading cookies:', error);
      } finally { setCookieLoading(false); }
    };
    loadCookies();
  }, []);

  const handleLogout = () => {
    Cookies.remove('User');
    Cookies.remove('ID');
    Cookies.remove('Token');
    Cookies.remove('Nickname');
    setUser({
      userNickname: "",
      userName: "",
      userID: "",
      token: ""
    });
    navigate("/");
    window.location.reload();
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
      {cookieLoading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : user.userName ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="success">
                {user.userNickname}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={navigateSettings}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={navigateSupport}>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login">
            <Button variant="success">Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
