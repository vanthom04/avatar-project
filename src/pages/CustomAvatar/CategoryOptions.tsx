import { useEffect, useState } from 'react'
import { dataOptions } from '~/_mock'

interface CategoryOptionProps {
  tab: string
}

function CategoryOptions({ tab }: CategoryOptionProps) {
  const [options, setOptions] = useState<{ name: string; value: string }[]>([])

  useEffect(() => {
    const data = dataOptions.filter((opt) => opt.id === tab)[0]
    setOptions(data.options)
  }, [tab])

  return (
    <div className="flex flex-row flex-wrap gap-8">
      {options.map((option) => (
        <img
          key={option.value}
          className="object-cover w-20 h-20 rounded-md border border-black bg-white cursor-pointer"
          src={option.value}
          alt=""
        />
      ))}
    </div>
  )
}

export default CategoryOptions
