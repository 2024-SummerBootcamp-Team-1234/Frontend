const LoginPage = () => (
  <div className="relative w-full h-screen flex justify-center items-center bg-cover bg-login-image">
    <div className="relative w-[692px] h-[694px] bg-white bg-opacity-25 rounded-3xl shadow backdrop-blur-md flex flex-col items-center justify-center p-6">
      <div
        className="text-black font-bold mb-6 font-sans"
        style={{ fontSize: '58pt' }}
      >
        LOGIN
      </div>

      <form
        action="/submit-url"
        method="POST"
        className=" p-8 rounded-lg  w-full max-w-md"
      >
        <div className="mb-6">
          <input
            type="text"
            placeholder="Username"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-black text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Login
        </button>
        <div className="text-neutral-50 text-sm underline mt-6 font-sans text-center">
          SIGN UP
        </div>
        <div className="flex flex-col items-center mt-6"> </div>
        <span className="text-stone-200 text-sm mb-2">or continue with</span>
        <div className="flex justify-between w-32"> </div>
      </form>
    </div>
  </div>
);

export default LoginPage;
