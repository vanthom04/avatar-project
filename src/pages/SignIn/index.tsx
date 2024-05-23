import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { IoKeyOutline, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { CiMail } from 'react-icons/ci'

import config, { supabase } from '~/config'
import Spinner from '~/components/Spinner'

function SignIn() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassWord] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassWord(!showPassword)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (values: FieldValues) => {
    const { email, password } = values
    try {
      setLoading(true)
      const { error, data } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      if (data.user) {
        reset()
        toast.success('Login successfully')
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="rounded-lg p-4 bg-[#eff1f2] w-[400px]" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-4 text-[30px] text-[#0e64f1] flex items-center justify-center font-medium">
          Sign in
        </h1>

        <div className="mb-4 relative">
          <div className="flex items-center bg-white rounded-lg ">
            <div className="px-2">
              <CiMail size={20} color="gray" />
            </div>
            <input
              className="px-2 py-2 w-full outline-none mr-2 "
              type="text"
              placeholder="Email"
              autoComplete="off"
              disabled={loading}
              spellCheck="false"
              {...register('email', { required: true })}
            />
          </div>
          <div className="pl-2">
            {errors.email && (
              <div className="flex items-center">
                <p className="text-red-500 italic text-sm"> Email is required!</p>
              </div>
            )}
          </div>
        </div>
        <div className="mb-2 relative">
          <div className="flex items-center bg-white rounded-lg">
            <div className="mx-2">
              <IoKeyOutline size={20} color="gray" />
            </div>
            <input
              autoComplete="off"
              className="px-2 py-2 w-full outline-none mr-2"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              disabled={loading}
              spellCheck="false"
              {...register('password', { required: true })}
            />
            <button type="button" className="pr-2" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <IoEyeOutline color="gray" size={20} />
              ) : (
                <IoEyeOffOutline color="gray" size={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="flex items-center">
              <p className="text-red-500 italic text-sm">Password is required!</p>
            </div>
          )}
        </div>
        <div className="text-end mr-2 text-gray-600 text-sm">
          <Link
            to={config.routes.recoverPassword}
            className="mt-2 hover:underline hover:text-red-500"
          >
            Forgot password?
          </Link>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="mx-auto flex justify-center bg-[#0e64f1] text-white font-medium py-2 px-4 rounded border border-blue-500 w-full mt-4"
        >
          {loading ? <Spinner className="w-5 h-5" /> : 'Sign in'}
        </button>
        <div className="ml-4 font-normal text-gray-600  my-4 flex justify-center">
          Don't have an account?
          <Link to={config.routes.signUp} className="font-normal text-base ml-1 text-blue-400">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignIn
