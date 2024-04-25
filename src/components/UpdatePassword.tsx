function UpdatePassword() {
  return (
    <div className="w-[100%] h-screen flex justify-center items-center bg-white">
      <div className="w-[400px] bg-[#eff1f2] p-5 rounded-xl">
        <h2 className="mb-5 text-center text-[#0e64f1] text-3xl font-medium">Update password</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="**********"
              className="w-[100%] p-2 rounded-lg outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block mb-1 font-medium">
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="**********"
              className="w-[100%] p-2 rounded-lg outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#007bff] text-white w-[100%] p-2 rounded-lg font-semibold hover:opacity-85"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
