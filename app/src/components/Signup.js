function Signup() {
  return (
    <div>
      <form>
        <p>
          username:
          <input type="text" name="username" />
        </p>
        <p>
          email:
          <input type="text" name="email" />
        </p>
        <p>
          password:
          <input type="text" name="password" />
        </p>
        <button type="submit">register</button>
      </form>
    </div>
  );
}
export default Signup;
