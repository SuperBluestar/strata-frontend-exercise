import { HeartIcon } from '@heroicons/react/24/outline'

export function LikeButton({ like, onClick }: { like: boolean, onClick: () => void }) {
    return (
        <button className='flex items-center gap-2 border px-3 py-2' onClick={onClick}>
            <span>{like ? 'Dislike' : 'Like'}</span>
            <HeartIcon className='w-6' fill={like ? 'red' : 'white'} />
        </button>
    )
}