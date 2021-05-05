function Login() {
  return (
    <div>
      <form>
        <p>
          email:
          <input type="text" name="email" />
        </p>
        <p>
          password:
          <input type="text" name="password" />
        </p>
        <button type="submit">login</button>
      </form>
    </div>
  );
}
export default Login;
