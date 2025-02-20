export default function Home() {
  return (
    <div className="">
      <form className="flex flex-col bg-pink-400 p-6 rounded-md m-10 shadow-lg">
        <div className="flex flex-col my-2">
          <label htmlFor="email">Email:</label>
          <input className="p-2 rounded-sm" type="email" id="email" name="email" required />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="password">Password:</label>
          <input className="p-2 rounded-sm" type="password" id="password" name="password" required />
        </div>
        <div className="flex flex-row place-content-between">
          <a className="px-3 py-2 underline" href="/sign-up">Sign up</a>
          <button type="submit" className="self-end bg-green-400 px-3 py-2 rounded-lg w-fit">Login</button>
        </div>
      </form>
    </div>
  );
}
