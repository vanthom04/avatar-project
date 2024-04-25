function SignUp() {
  return (
    <div className="flex justify-center items-center w-[100%] mt-6">
      <form className="px-8 pt-6 pb-6 mb-4 w-96 bg-gray-200 rounded-lg">
        <h2 className="text-2xl mb-4 text-center font-bold text-blue-500">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2 font-medium">Full name</label>
          <input
            type="text"
            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight rounded-lg outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2 font-medium">Email</label>
          <input
            type="text"
            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight rounded-lg outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2 font-medium">Password</label>
          <input
            type="password"
            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight rounded-lg outline-none"
          />
        </div>
        <button className="py-2 px-4 border mb-2 w-[100%] text-center bg-blue-500 text-white rounded-lg">
          Sign Up
        </button>
        <p className="text-center text-blue-900 text-sm">Already have an account?</p>
      </form>
    </div>
  )
}

export default SignUp
