import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Title, Auth, Control, Submit, Error, PassWrapper } from "./styled";

import {
  setNonExistUser,
  setShortPassword,
  selectAuthState,
} from "../../store/authSlice";

import { useDispatch, useSelector } from "react-redux";

export const AuthForm = (): JSX.Element => {
  const enteredName = useRef<HTMLInputElement | null>(null);
  const enteredPassword = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const router = useRouter();

  const authState = useSelector(selectAuthState);

  const { nonExistUser, shortPassword } = authState;

  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (enteredPassword.current && enteredPassword.current.value.length < 6) {
      dispatch(setNonExistUser(true));
      dispatch(setShortPassword(true));
      setError("");
    } else {
      dispatch(setShortPassword(false));

      try {
        const response = await fetch(
          "https://technical-task-api.icapgroupgmbh.com/api/login/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: enteredName.current?.value,
              password: enteredPassword.current?.value,
            }),
          }
        );

        if (response.ok) {
          // Successful login, navigate to the next page
          router.push("/table");
        } else {
          // Unsuccessful login, handle error
          const data = await response.json();
          setError(data.error || "Login failed");
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
        setError("An error occurred during login");
      }
    }
  };

  return (
    <>
      <Auth>
        <Title>Sign In</Title>
        <form onSubmit={handleSubmit}>
          <Control>
            <label htmlFor="name">Your Username</label>
            <input type="name" id="name" required ref={enteredName} />
          </Control>
          <Control>
            <label htmlFor="password">Your Password</label>
            <PassWrapper>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                ref={enteredPassword}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </PassWrapper>
          </Control>
          <Submit>
            <button type="submit">Sign In</button>
          </Submit>
        </form>
      </Auth>
      {!nonExistUser && (
        <Error>
          You wrote failed password or name. Or user with this credentials
          doesn&apos;t exist.
        </Error>
      )}
      {shortPassword && (
        <Error>Password cannot be shorter than six characters.</Error>
      )}
      {error && <Error>{error}</Error>}
    </>
  );
};
