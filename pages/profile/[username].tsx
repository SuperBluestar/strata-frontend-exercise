import { FC, useEffect, useState } from 'react'
import Loader from '../../components/loader'
import { useRouter } from 'next/router'
import Image from 'next/image';
import { useUsersContext } from '../../contexts/usersContext';
import ErrorMessage from '../../components/errorMessage';
import Empty from '../../components/empty';
import LabelInfo from '../../components/labelInfo';
import { HeartIcon } from '@heroicons/react/24/outline';
import { LikeButton } from '../../components/buttons/likeButton';
import { BackButton } from '../../components/buttons/backButton';


const User: FC = () => {
  const router = useRouter();
  const { username } = router.query;
  const { users, fetchUserDetail, setPauseFetching } = useUsersContext()
  const pickedUser = users.filter((_user) => _user.username === username)?.[0]
  const [loading, setLoading] = useState<boolean>(true)
  const [errMsg, setErrMsg] = useState<string>('')
  const [like, setLike] = useState<boolean>(false)
  useEffect(() => {
    if (!!username && typeof username === 'string') {
      setLoading(true)
      setErrMsg('')
      fetchUserDetail(username)
        .then((success) => setErrMsg(''))
        .catch((reason: string) => setErrMsg(reason))
        .finally(() => setLoading(false))
    } else {
      setErrMsg('Invalid Param')
    }
  }, [username])
  useEffect(() => {
    setPauseFetching(true)
    return () => {
      setPauseFetching(false)
    }
  }, [])
  return (<>
    <div className='w-full flex flex-col items-center justify-center space-y-12 text-black relative'>
      <div className='absolute left-10 top-0'>
        <BackButton />
      </div>
      {
        loading ? (
          <div className="w-full flex justify-center py-6">
            <Loader />
          </div>
        ) : (
          !!errMsg ? (
            <div className="w-full flex justify-center py-6">
              <ErrorMessage message={errMsg} />
            </div>
          ) : (
            pickedUser ? (
              <>
                <h1 className='text-2xl md:text-4xl font-bold'>User Profile : <span className='uppercase'>{pickedUser.username}</span></h1>
                <div className='grid grid-cols-12'>
                  <div className='col-span-12 md:col-span-5 flex flex-col items-center gap-2'>
                    <div className='flex items-center justify-center w-80 h-80'>
                      <Image
                        alt={pickedUser.username}
                        className='rounded-full'
                        src={pickedUser.profileImage}
                        width="240"
                        height="240"
                      />
                    </div>
                    <span className='font-bold'>{pickedUser.age} years eld | {pickedUser.birthday}</span>
                    <LikeButton like={like} onClick={() => setLike((_like) => !_like)} />
                  </div>
                  <div className='col-span-12 md:col-span-7 flex flex-col p-2 gap-1'>
                    <LabelInfo label='Username' info={pickedUser.username} />
                    <LabelInfo label='Email' info={pickedUser.email || ''} />
                    <LabelInfo label='Bio' type='textarea' info={pickedUser.bio || ''} />
                    <LabelInfo label='Twitter' info={pickedUser.twitter || ''} />
                    <div className='flex justify-center'>
                      <LikeButton like={like} onClick={() => setLike((_like) => !_like)} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full flex justify-center py-6">
                <Empty />
              </div>
            )
          )
        )
      }
    </div>
  </>)

}


export default User