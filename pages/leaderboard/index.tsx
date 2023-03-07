import { FC, useEffect, useState } from 'react'
import Loader from '../../components/loader'
import Link from 'next/link'
import Image from 'next/image'
import { useUsersContext } from '../../contexts/usersContext'
import Empty from '../../components/empty'
import ErrorMessage from '../../components/errorMessage'
import { HeartIcon } from '@heroicons/react/24/outline'

const Leaderboard: FC = () => {
  const { users, fetchUsers } = useUsersContext()
  const [loading, setLoading] = useState<boolean>(true)
  const [errMsg, setErrMsg] = useState<string>('')
  useEffect(() => {
    setLoading(true)
    fetchUsers()
      .then((success) => setErrMsg(''))
      .catch((reason: string) => setErrMsg(reason))
      .finally(() => setLoading(false))
  }, [])
  return (<>
    <div className='w-full flex flex-col items-center justify-center space-y-12 text-black'>
      <h1 className='text-4xl font-bold'>Leaderboard</h1>
      <div className='w-full md:w-2/3 lg:x-1/2 xl:w-1/3 mx-auto flex flex-col'>
        {
          loading ? (
            <div className='w-full flex justify-center py-6'>
              <Loader />
            </div>
          ) : (
            !!errMsg ? (
              <div className='w-full flex justify-center py-6'>
                <ErrorMessage message={errMsg} />
              </div>
            ) : (
              users.length === 0 ? (
                <div className='w-full flex justify-center py-6'>
                  <Empty />
                </div>
              ) : users.map((user, id) => (
                <div className={`grid grid-cols-9 py-1 ${id % 2 === 0 ? 'bg-gray-200' : ''}`} key={id}>
                  <div className='col-span-1 flex justify-center items-center'>
                    <span>{id + 1}</span>
                  </div>
                  <div className='col-span-2 flex justify-center items-center'>
                    <Image
                      alt={user.username}
                      className='w-16 rounded-full'
                      src={user.profileImage}
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className='col-span-4 flex justify-center items-center'>
                    <Link href={`/profile/${user.username}`} key={id}>
                      <span>{user.username}</span>
                    </Link>
                  </div>
                  {/* <div className='col-span-2 flex justify-center items-center'>
                    <span className='font-semibold'>{user.score}</span>
                  </div> */}
                  <div className='col-span-2 flex justify-center items-center'>
                    <HeartIcon className='w-8' fill={user.score > 500 ? 'red' : 'white'} />
                  </div>
                </div>
              ))
            )
          )
        }
      </div>
    </div>
  </>)

}


export default Leaderboard