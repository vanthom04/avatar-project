import { FieldValues, useForm } from 'react-hook-form'
import { supabase } from '~/config/supabase'

import { IoEyeOutline, IoKeyOutline } from 'react-icons/io5'
import { IoEyeOffOutline } from 'react-icons/io5'
import { useState } from 'react'
<<<<<<< HEAD
=======
import config from '~/config'

>>>>>>> ui/SignIn
function UpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (values: FieldValues) => {
    if (values.password === values.confirmPassword) {
      try {
<<<<<<< HEAD
        const { error } = await supabase.auth.updateUser({ password: values.password })
=======
        const { error } = await supabase.auth.updateUser(
          { password: values.password },
          { emailRedirectTo: config.routes.home }
        )

>>>>>>> ui/SignIn
        if (error) throw error
      } catch (error) {
        console.log(error)
      }
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="w-[400px] bg-[#eff1f2] p-5 rounded-xl">
        <h2 className="mb-5 text-center text-[#0e64f1] text-3xl font-medium">Update password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex items-center bg-white rounded-lg p-1">
              <div className="ml-2">
                <IoKeyOutline color="gray" size={20} />
              </div>
              <input
                autoComplete="off"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="**********"
                className="w-full p-2 rounded-lg outline-none"
                {...register('password', { required: true })}
              />
              <div onClick={togglePasswordVisibility} className="mr-2">
                {showPassword ? (
                  <IoEyeOutline color="gray" size={20} />
                ) : (
                  <IoEyeOffOutline color="gray" size={20} />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 italic text-sm">Password is required!</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block mb-1 font-medium">
              Confirm password
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex items-center bg-white rounded-lg p-1">
              <div className="ml-2">
                <IoKeyOutline color="gray" size={20} />
              </div>
              <input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="**********"
                className="w-full p-2 rounded-lg outline-none"
                {...register('confirmPassword', { required: true })}
              />
              <div onClick={toggleConfirmPasswordVisibility} className="mr-2">
                {showConfirmPassword ? (
                  <IoEyeOutline color="gray" size={20} />
                ) : (
                  <IoEyeOffOutline color="gray" size={20} />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 italic text-sm">Confirm password is required!</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#007bff] text-white w-full p-2 rounded-lg font-semibold hover:opacity-85 outline-none"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
