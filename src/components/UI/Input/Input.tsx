import {ChangeEvent, FC} from "react";
import s from "./Input.module.scss"
import loading from "@/assets/gif/loading.gif"
import remove from "@/assets/img/exit.svg"

interface IInput {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    isLoading?: boolean
    setValue: (value: string) => void
}

const Input: FC<IInput> = ({value, onChange, placeholder, isLoading, setValue}) => {


    return (
        <label>
            <input
                className={s.input}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {
                (isLoading && value) ?
                    <img
                        className={s.loading}
                        src={loading}
                        alt='loading'
                        width={30}
                        height={30}
                    />
                    :
                    value ?
                        <button className={s.remove} onClick={() => setValue('')}>
                            <img width={30}
                                 height={30}
                                 src={remove}
                                 alt='imgRemove'
                            />
                        </button>
                        :
                        ''
            }
        </label>
    );
};

export default Input;