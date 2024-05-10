import { FieldValues, useForm } from 'react-hook-form'
import { supabase } from '~/config/supabase'
import toast from 'react-hot-toast'
import { CiMail } from 'react-icons/ci'
import { IoKeyOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import config from '~/config'
import { useState } from 'react'
import Spinner from '~/components/Spinner'

function SignIn() {
  const [check, setCheck] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (values: FieldValues) => {
    try {
      setCheck(true)
      const { error, data } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      })
      if (error) throw error
      console.log(data)
      if (data.user) {
        toast.success('login successful')
      }
    } catch (error) {
      console.log(error)
    }
    reset()
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg p-4 bg-[#eff1f2] w-[400px]">
        <h1 className=" mb-4 text-[30px] text-[#0e64f1] flex items-center justify-center font-medium">
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
              {...register('email', { required: true })}
              autoComplete="off"
              disabled={check}
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
              className="px-2 py-2 w-full outline-none mr-2"
              type="password"
              placeholder="Password"
              disabled={check}
              {...register('password', { required: true })}
            />
          </div>
          {errors.password && (
            <div className="flex items-center">
              <p className="text-red-500 italic text-sm"> Password is required!</p>
            </div>
          )}
        </div>
        <div className="text-end mr-2 text-gray-600 ">
          <Link to={config.routes.recoverPassword} className="mt-2">
            Forgot password?
          </Link>
        </div>

        <button
          disabled={check}
          type="submit"
          className="mx-auto flex justify-center  bg-[#0e64f1] text-white font-medium py-2 px-4 rounded border border-blue-500 w-full mt-2"
        >
          {check ? <Spinner className="w-5 h-5" /> : 'Sign in'}
        </button>
        <div className="ml-4 font-normal text-gray-600  my-4 m">
          You don't have a account?
          <Link to={config.routes.signUp} className="font-normal text-base ml-1 text-blue-400">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}
export default SignIn
