import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'
import clsx from 'clsx'

interface DeleteModalProps {
  isOpen: boolean
  isLoading: boolean
  loadingPercentage: number
  onChange: (open: boolean) => void
  onDeleteTemplates: () => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  isLoading,
  loadingPercentage,
  onChange,
  onDeleteTemplates
}) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/80 backdrop-blur-sm fixed inset-0" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 drop-shadow-md rounded-lg border border-neutral-700 bg-white focus:outline-none z-50">
          <div className="w-full flex flex-col items-center justify-center mb-2">
            <img
              className="w-[35px] h-[35px] object-cover"
              src="/assets/warning-delete.png"
              alt=""
            />
            <Dialog.Title className="text-2xl font-medium">Warning</Dialog.Title>
          </div>

          <Dialog.Description className="text-center text-lg">
            This action will delete all selected templates! <br />
            Are you sure?
          </Dialog.Description>

          <div
            className={clsx('mt-2 hidden', {
              '!block': isLoading
            })}
          >
            <h1 className="text-center text-lg font-medium">{loadingPercentage}%</h1>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                style={{ width: `${loadingPercentage}%` }}
                className="bg-blue-600 h-2 rounded-full"
              ></div>
            </div>
          </div>
          <div
            className={clsx('w-full flex items-center justify-center gap-x-4 mt-4', {
              '!hidden': isLoading
            })}
          >
            <button
              disabled={isLoading}
              className="px-6 py-2 bg-green-500 text-base text-center font-normal text-white rounded-lg"
              onClick={onDeleteTemplates}
            >
              Yes
            </button>
            <button
              disabled={isLoading}
              className="px-6 py-2 bg-red-500 text-base text-center font-normal text-white rounded-lg"
              onClick={() => onChange(false)}
            >
              No
            </button>
          </div>

          <Dialog.Close asChild>
            <button
              disabled={isLoading}
              className={clsx(
                'p-1 text-neutral-900 absolute top-[12px] right-[12px] inline-flex appearance-none items-center justify-center rounded-full focus:outline-none hover:bg-neutral-200/60 transition-colors duration-300',
                { 'cursor-not-allowed hover:bg-transparent': isLoading }
              )}
              onClick={() => onChange(false)}
            >
              <IoMdClose className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DeleteModal
