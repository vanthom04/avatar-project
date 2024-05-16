function TemplateTableEmptyRow() {
  return (
    <tr className="bg-white">
      <td colSpan={5} className="p-4">
        <h2 className="m-auto">No templates</h2>
      </td>
    </tr>
  )
}

export default TemplateTableEmptyRow
