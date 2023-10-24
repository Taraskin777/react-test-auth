import { Title, Auth, Control, Submit } from "./styled";

export const AuthForm = (): JSX.Element => {
  return (
    <Auth>
      <Title>Sign In</Title>
      <form>
        <Control>
          <label htmlFor="name">Username</label>
          <input type="name" id="name" required />
        </Control>
        <Control>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required />
        </Control>
        <Submit>
          <button type="submit">Sign In</button>
        </Submit>
      </form>
    </Auth>
  );
};
