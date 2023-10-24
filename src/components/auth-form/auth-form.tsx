import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Title, Auth, Control, Submit, Error } from "./styled";

export const AuthForm = (): JSX.Element => {
  const [authorizedUser, setAuthorizedUser] = useState<boolean>(false);
  const [nonExistUser, setNonExistUser] = useState<boolean>(true);
  const [shortPassword, setShortPassword] = useState<boolean>(false);

  const enteredName = useRef<HTMLInputElement | null>(null);
  const enteredPassword = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const name: string = "testuser";
  const password: string = "testpassword123";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (enteredPassword.current && enteredPassword.current.value.length < 6) {
      setNonExistUser(true);
      setShortPassword(true);
    } else {
      setShortPassword(false);

      if (enteredName.current?.value === name) {
        if (enteredPassword.current?.value === password) {
          setAuthorizedUser(true);
          router.push("/table");
        } else {
          setNonExistUser(false);
          console.log("User does not exist");
        }
      } else {
        setNonExistUser(false);
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
