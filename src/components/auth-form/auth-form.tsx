import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Title, Auth, Control, Submit, Error } from "./styled";

export const AuthForm = (): JSX.Element => {
  const [authorizedUser, setAuthorizedUser] = useState<boolean>(false);
  const [nonExistUser, setNonExistUser] = useState<boolean>(true);

  console.log(nonExistUser);

  const enteredName = useRef<HTMLInputElement | null>(null);
  const enteredPassword = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const name: string = "testuser";
  const password: string = "testpassword123";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      enteredName.current?.value === name &&
      enteredPassword.current?.value === password
    ) {
      setAuthorizedUser(true);
      router.push("/table");
    } else {
      setNonExistUser(false);
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
          doesn't exist.
        </Error>
      )}
    </>
  );
};
