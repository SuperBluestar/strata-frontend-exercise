export default function ErrorMessage({ message }: { message: string }) {
    return (
      <>
        <div className="w-12 md:w-24 lg:w-36 xl:w-48 h-8 md:h-16 lg:h-24 xl:h-32 flex justify-center items-center text-red-500">
          { message }
        </div>
      </>
    )
  }
  