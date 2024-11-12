import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { isAuth, loggedInUser } from "../recoil/atom/user/userAtoms";
import Cookies from 'js-cookie'; // Make sure to import Cookies
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isAuthenticated = useRecoilValue(isAuth);
  const resetIsAuth = useResetRecoilState(isAuth); 
  const resetSessionUser = useResetRecoilState(loggedInUser); 
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
  ];

  // Log out function
  const handleLogout = () => {
    Cookies.remove("todoToken"); // Remove the auth token
    resetIsAuth(); // Reset authentication state
    resetSessionUser();
    navigate('/login');
  };

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" onClick={handleClick} variant="flat"
        css={{ cursor: 'pointer' }}>
            Dashboard
          </Link>
        </NavbarItem>
        {/* <NavbarItem isActive>
          <Link href="/dashboard" aria-current="page">
            About us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/ud">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuthenticated ? (
          // Show Log Out button if authenticated
          <NavbarItem>
            <Button as={Link} color="danger" onPress={handleLogout} variant="flat">
              Log Out
            </Button>
          </NavbarItem>
        ) : (
          // Show Login and Sign Up buttons if not authenticated
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
