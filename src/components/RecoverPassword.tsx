function RecoverPassword() {
  return (
    <div className="w-[100%] h-screen flex justify-center items-center bg-white">
      <div className="w-[400px] bg-[#eff1f2] p-5 rounded-xl">
        <h2 className="mb-5 text-center text-[#0e64f1] text-3xl font-medium">Recover password</h2>
        <form>
          <div className="mb-4">
            <p className="mb-4 font-normal">
              Enter your email address and we will send you a link to reset your password
            </p>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="w-[100%] p-2 rounded-lg outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#007bff] text-white w-[100%] p-2 rounded-lg font-semibold hover:opacity-85"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default RecoverPassword
