import React from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { userState, responseState } from "../recoil/atom/atoms";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [selected, setSelected] = React.useState("login");
  const [user, setUser] = useRecoilState(userState);
  const [response, setResponse] = useRecoilState(responseState);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await registerUser(user);
      setResponse(res); // Store the API response
      if (res.user) {
        navigate("/dashboard"); // Redirect to dashboard or another route
      }
    } catch (error) {
      setResponse({ error: error.message }); // Handle error response
    }
  };
  return (
    <div className="flex flex-col w-full ">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]" onSubmit={handleSubmit}>
                <Input isRequired name="name" label="Name" placeholder="Enter your name" type="text" value={user.name} onChange={handleChange}/>
                <Input isRequired label="Email" name="email" placeholder="Enter your email" type="email" value={user.email} onChange={handleChange}/>
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
