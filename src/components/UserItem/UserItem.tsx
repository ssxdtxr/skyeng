import {FC, useState} from "react";
import {GitHubUsersService} from "@/services/gitHub-user/gitHub-users.service.ts";
import {useQuery} from "react-query";
import Skeleton from "@/components/Skeleton/Skeleton.tsx";
import {IUser} from "@/types/IUser.ts";
import s from './UserItem.module.scss'
import {Link} from "react-router-dom";

interface UserItem {
    login: string
}

const UserItem: FC<UserItem> = ({login}) => {
    const [user, setUser] = useState<IUser | undefined>(undefined)
    const {isLoading, error} = useQuery(['getUser', login],
        () => GitHubUsersService.getUsers({q: login}), {
            onSuccess: (data) => {
                setUser(data?.data.items[0])
            },
        })
    return (
        <>
            {
                isLoading ?
                    <div className={s.body}>
                        <Skeleton width={200} height={200}/>
                        <div className={s.rightSide}>
                            <Skeleton width={200} height={20}/>
                            <div className={s.info}>
                                <Skeleton width={200} height={20}/>
                                <Skeleton width={200} height={20}/>
                                <Skeleton width={200} height={20}/>
                                <div className={s.item}>
                                    <Skeleton width={200} height={20}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    !error ?
                        <div className={s.body}>
                            <img width={200} height={200} src={user?.avatar_url} alt=""/>
                            <div className={s.rightSide}>
                                <div className={s.id}>Id: {user?.id}</div>
                                <div className={s.info}>
                                    <div className={s.item}>Score: {user?.score}</div>
                                    <div className={s.item}>Type: {user?.type}</div>
                                    <div className={s.item}>
                                        GitHub: <Link target='_blank'
                                                      to={user?.html_url ? user?.html_url : ''}>{user?.login}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={s.error}>
                            Не удалось загрузить данные. Повторите попытку позже!
                        </div>
            }
        </>
    );
};

export default UserItem;