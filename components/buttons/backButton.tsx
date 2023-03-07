import { BackwardIcon, HeartIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

export function BackButton() {
    const router = useRouter()
    const goBack = () => router.back()
    return (
        <button className='flex items-center gap-2 px-3 py-2' onClick={goBack}>
            <BackwardIcon className='w-6' fill={'black'} />
            <span>Back</span>
        </button>
    )
}