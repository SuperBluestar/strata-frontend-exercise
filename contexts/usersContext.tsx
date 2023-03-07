import { createContext, useContext, FC, ReactNode, useState, useEffect, Dispatch, SetStateAction } from "react"

type UsersContextType = {
    users: User[],
    fetchUsers: () => Promise<boolean>,
    fetchUserDetail: (username: string) => Promise<boolean>,
    setPauseFetching: Dispatch<SetStateAction<boolean>>
}
const defaultUsersContextValue = {
    users: [],
    fetchUsers: () => Promise.resolve(true),
    fetchUserDetail: (username: string) => Promise.resolve(true),
    setPauseFetching: () => {}
}
export const UsersContext = createContext<UsersContextType>(defaultUsersContextValue)
export const useUsersContext = () => useContext<UsersContextType>(UsersContext)

const UsersProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([])
    const [pauseFetching, setPauseFetching] = useState<boolean>(false)
    const fetchUsers = () => {
        return new Promise<boolean>((resolve, reject: (reason: string) => void) => {
            fetch('/api/leaderboard')
                .then((response) => response.json())
                .then((data: LeaderboardData) => {
                    setUsers(data.leaderboard.sort((_user1, _user2) => _user2.score - _user1.score))
                    resolve(true)
                })
                .catch((err: { message: string }) => {
                    reject(err.message)
                })
        })
    }
    const fetchUserDetail = (username: string) => {
        return new Promise<boolean>((resolve, reject: (reason: string) => void) => {
            const tempFunc = () => fetch(`/api/profile/${username}`)
                .then((response) => response.json())
                .then((data: ProfileData) => {
                    setUsers((_users) => _users.map((_user) => _user.username === username ? ({ ..._user, ...data }) : _user))
                    resolve(true)
                })
                .catch((err: { message: string }) => {
                    reject(err.message)
                })
            if (users.filter((_user) => _user.username === username).length === 0) {
                fetchUsers().then().finally(tempFunc)
            } else {
                tempFunc()
            }
        })
    }
    useEffect(() => {
        let interval: NodeJS.Timer
        if (!pauseFetching) {
            interval = setInterval(fetchUsers, 20000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [pauseFetching])
    return (
        <UsersContext.Provider
            value={{
                users,
                fetchUsers,
                fetchUserDetail,
                setPauseFetching
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}

export default UsersProvider
