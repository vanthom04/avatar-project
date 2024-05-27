import clsx from 'clsx'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'
import Spinner from '~/components/Spinner'
import { supabase } from '~/config'

interface RecoverPasswordModalProps {
  isOpen: boolean
  onClick: () => void
}

function RecoverPasswordModal({ isOpen, onClick }: RecoverPasswordModalProps) {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: { email: '' } })

  const onSubmit = async (values: FieldValues) => {
    try {
      setLoading(true)
      const redirectTo = import.meta.env.DEV
        ? 'http://localhost:6200/update-password'
        : 'https://custom-avatar-eta.vercel.app/update-password'
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, { redirectTo })
      if (error) throw error

      reset()
      onClick()
      toast.success('Successfully, check your mail inbox!')
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={clsx(
        'fixed z-50 flex justify-center items-center w-full inset-0 bg-neutral-900/80 backdrop-blur-sm animate-fade-in',
        { hidden: !isOpen }
      )}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">Recover password</h3>
            <button
              type="button"
              disabled={loading}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClick}
            >
              <IoMdClose className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="px-4 pt-2 pb-4">
            <p className="text-[15px] mb-4">
              Enter your email address and we will send you a link to reset your password
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  disabled={loading}
                  autoComplete="off"
                  spellCheck="false"
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base rounded-lg outline-none block w-full p-2.5 mb-1"
                  placeholder="example@gmail.com"
                  {...register('email', { required: true })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 italic ml-1">Email is required!</p>
              )}

              <button
                disabled={loading}
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-600 outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 transition-transform duration-300 mt-4"
              >
                {loading ? <Spinner className="w-5 h-5 m-auto" /> : 'Send email'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecoverPasswordModal
