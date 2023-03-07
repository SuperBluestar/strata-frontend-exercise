import { v4 as uuidv4 } from 'uuid'

export default function LabelInfo({ label, info, type = 'input' }: { label: string, info: string, type?: 'input' | 'textarea' }) {
    const htmlId = uuidv4()
    return (
      <>
        <div className='flex flex-col items-start gap-1'>
            <label htmlFor={htmlId} className='font-medium px-2'>{label}</label>
            {
                type === 'textarea' ? (
                    <textarea id={htmlId} className='w-full bg-gray-100 px-4 py-2 font-bold' defaultValue={info} rows={8} />
                ) : (
                    <input id={htmlId} className='w-full bg-gray-100 px-4 py-2 font-bold' type='text' defaultValue={info} />
                )
            }
        </div>
      </>
    )
  }
  