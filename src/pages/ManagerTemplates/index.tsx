import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPlus, FaTrashCan } from 'react-icons/fa6'
import { IoSearch } from 'react-icons/io5'
import clsx from 'clsx'

import { Template } from '~/types'
import { filterTemplates } from '~/utils'
import { useQueryTemplates } from '~/queries'
import { useTemplateModal, useUser } from '~/hooks'
import {
  deleteTemplate,
  deleteImageTemplate,
  deleteTemplateOption,
  deleteTemplateCategory,
  deleteImageTemplateOption
} from '~/services/templates'
import Spinner from '~/components/Spinner'
import TemplateTableRow from './TemplateTableRow'
import TemplateTableEmptyRow from './TemplateTableEmptyRow'
import DeleteModal from './DeleteModal'

function ManagerTemplatesPage() {
  const [filterName, setFilterName] = useState<string>('')
  const [selected, setSelected] = useState<Template[]>([])
  const [loadingPercentage, setLoadingPercentage] = useState(0)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isLoadingDeleteTemplates, setIsLoadingDeleteTemplates] = useState<boolean>(false)

  const { accessToken, role } = useUser()
  const templateModal = useTemplateModal()
  const { data: templates, isLoading, refetch } = useQueryTemplates(accessToken ?? '')

  const dataFiltered = filterTemplates(templates ?? [], filterName)

  const handleCreateNewTemplate = async () => {
    if (role && !['admin', 'editor'].includes(role)) {
      return toast.error('You do not have access')
    }

    templateModal.onOpen()
    templateModal.setMode('create')
    templateModal.setRefetch?.(refetch)
  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      return setSelected(templates ?? [])
    }
    setSelected([])
  }

  const handleSelect = (template: Template) => {
    if (selected.includes(template)) {
      setSelected(selected.filter((t) => t.id !== template.id))
    } else {
      setSelected([...selected, template])
    }
  }

  const handleDeleteTemplates = async () => {
    // TODO: Handle delete templates
    if (!accessToken || selected.length === 0) return

    const updateLoadingPercentage = (step: number, totalSteps: number) => {
      setLoadingPercentage(Math.min(100, Math.round((step / totalSteps) * 100)))
    }

    try {
      setIsLoadingDeleteTemplates(true)
      let currentStep = 0
      const totalSteps = selected.reduce((acc, template) => {
        const optionsCount = template.categories.reduce(
          (acc, category) => acc + category.options.length,
          0
        )
        const categoriesCount = template.categories.length
        return acc + optionsCount + categoriesCount + 1
      }, 0)

      for (const template of selected) {
        const deleteOptionPromises = []
        const deleteImagePromises = []

        for (const category of template.categories) {
          for (const option of category.options) {
            deleteOptionPromises.push(
              deleteTemplateOption(accessToken, option.id).then(() => {
                currentStep++
                updateLoadingPercentage(currentStep, totalSteps)
              })
            )

            if (option.image_path) {
              deleteImagePromises.push(
                deleteImageTemplateOption(accessToken, option.image_path).then(() => {
                  currentStep++
                  updateLoadingPercentage(currentStep, totalSteps)
                })
              )
            }
          }
        }

        await Promise.all(deleteOptionPromises)
        await Promise.all(deleteImagePromises)

        const deleteCategoryPromises = template.categories.map((category) =>
          deleteTemplateCategory(accessToken, category.id).then(() => {
            currentStep++
            updateLoadingPercentage(currentStep, totalSteps)
          })
        )

        await Promise.all(deleteCategoryPromises)

        await deleteTemplate(accessToken, template.id).then(() => {
          currentStep++
          updateLoadingPercentage(currentStep, totalSteps)
        })

        if (template.image_path) {
          await deleteImageTemplate(accessToken, template.image_path).then(() => {
            currentStep++
            updateLoadingPercentage(currentStep, totalSteps)
          })
        }
      }

      toast.success('Delete templates successfully')
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setIsOpenDeleteModal(false)
      setIsLoadingDeleteTemplates(false)
      setSelected([])
      refetch()
    }
  }

  return (
    <>
      <div className="w-full flex flex-col gap-y-4">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-[22px] lg:text-2xl font-normal">Manager templates</h1>
          <button
            className="flex items-center justify-center bg-blue-500 text-white px-2.5 py-2 lg:px-3 lg:py-2.5 rounded-md active:scale-95 transition-transform duration-300"
            onClick={handleCreateNewTemplate}
          >
            <FaPlus className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] mr-1" />
            <span>New template</span>
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div
            className={clsx('w-full h-20 p-4 bg-white', { '!bg-[#d0ecfe]': selected.length > 0 })}
          >
            <div
              className={clsx('w-full h-full hidden items-center justify-between', {
                '!flex': selected.length > 0
              })}
            >
              <div className="font-medium text-blue-600">{selected.length} template</div>
              <div
                className="select-none cursor-pointer group"
                onClick={() => setIsOpenDeleteModal(true)}
              >
                <FaTrashCan className="w-5 h-5 text-neutral-700 group-hover:text-red-500" />
              </div>
            </div>
            <div className={clsx('relative', { hidden: selected.length > 0 })}>
              <IoSearch className="absolute w-6 h-6 text-neutral-500 top-1/2 left-2 translate-y-1/2 z-10" />
              <input
                type="text"
                value={filterName}
                name="input-search"
                spellCheck="false"
                autoComplete="off"
                placeholder="Search template..."
                className="w-[250px] absolute pl-9 pr-4 py-3 rounded-lg outline-none border hover:border-gray-400 focus:border-gray-400"
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="input-checkbox-all"
                      checked={
                        templates !== undefined &&
                        templates?.length > 0 &&
                        templates?.length === selected.length
                      }
                      type="checkbox"
                      name="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      onChange={handleSelectAll}
                    />
                    <label htmlFor="input-checkbox-all" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-4 py-2">
                  Name
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Thumbnail
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Created at
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="bg-white">
                  <td colSpan={5} className="p-4">
                    <Spinner className="mx-auto" />
                  </td>
                </tr>
              ) : dataFiltered.length > 0 ? (
                dataFiltered?.map((template) => (
                  <TemplateTableRow
                    key={template.id}
                    template={template}
                    selected={selected.findIndex((s) => s.id === template.id) !== -1}
                    onSelect={() => handleSelect(template)}
                    onRefetch={refetch}
                  />
                ))
              ) : (
                <TemplateTableEmptyRow />
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete template modal */}
      <DeleteModal
        isOpen={isOpenDeleteModal}
        isLoading={isLoadingDeleteTemplates}
        loadingPercentage={loadingPercentage}
        onChange={setIsOpenDeleteModal}
        onDeleteTemplates={handleDeleteTemplates}
      />
    </>
  )
}

export default ManagerTemplatesPage
