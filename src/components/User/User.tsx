import s from "./User.module.scss";
import {FC, useContext} from "react";
import {IUser} from "@/types/IUser.ts";
import UserItem from "@/components/UserItem/UserItem.tsx";
import {ModalContext} from "@/context/ModalContext.ts";

const User: FC<{ user: IUser }> = ({user}) => {
    const {openModal} = useContext(ModalContext)
    const openUserModal = () => {
        openModal(<UserItem login={user.login}/>)
    }
    return (
        <>
            <div
                className={s.card}
                onClick={openUserModal}
            >
                <img
                    width={40}
                    height={40}
                    key={user.id}
                    src={user.avatar_url}
                    alt={user.login}
                />
                <div className={s.info}>
                    <div className={s.url}
                    >
                        {user.login}
                    </div>
                    <div>Score: {user.score}</div>
                </div>
            </div>
        </>
    );
};

export default User;