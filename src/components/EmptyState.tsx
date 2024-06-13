const EmptyState = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <img
        className="w-72 object-cover"
        src="/assets/images/not-found-templates.png"
        alt="Not Found Templates"
      />
      <h1 className="text-2xl font-medium">Not found templates!</h1>
    </div>
  )
}

export default EmptyState
