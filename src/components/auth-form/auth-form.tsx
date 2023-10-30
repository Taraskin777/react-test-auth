import { useRef } from "react";
import { useRouter } from "next/router";
import { Title, Auth, Control, Submit, Error } from "./styled";

import {
  setNonExistUser,
  setShortPassword,
  selectAuthState,
} from "../../store/authSlice";

import { useDispatch, useSelector } from "react-redux";

export const AuthForm = (): JSX.Element => {
  const enteredName = useRef<HTMLInputElement | null>(null);
  const enteredPassword = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const authState = useSelector(selectAuthState);

  const { nonExistUser, shortPassword, name, password } = authState;

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (enteredPassword.current && enteredPassword.current.value.length < 6) {
      dispatch(setNonExistUser(true));
      dispatch(setShortPassword(true));
    } else {
      dispatch(setShortPassword(false));

      if (enteredName.current?.value === name) {
        if (enteredPassword.current?.value === password) {
          router.push("/table");
        } else {
          dispatch(setNonExistUser(false));
          console.log("User does not exist");
        }
      } else {
        dispatch(setNonExistUser(false));
        console.log("User does not exist");
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
            <input
              type="password"
              id="password"
              required
              ref={enteredPassword}
            />
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
    </>
  );
};
