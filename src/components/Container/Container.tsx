import s from "./Container.module.scss"
import {FC, ReactNode} from "react";
interface IContainer {
    children: ReactNode
}
const Container: FC<IContainer> = ({children}) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    );
};

export default Container;