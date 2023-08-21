import { FC, useEffect, useState, MouseEvent} from "react";
import s from './Select.module.scss'
import cn from "classnames"
import {useParams} from "react-router-dom";

export interface IOptions {
    value: string
    label: string
    order: string
}

interface ISelect {
    options: IOptions[]
    value?: IOptions
    onChange: (value: IOptions | undefined) => void
    search?: string
    placeholder: string
}

const Select: FC<ISelect> = ({options, value, onChange, search, placeholder}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0)
    const params = useParams()

    const clearOptions = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        onChange(undefined)
        window.history.pushState({}, '', `/${params?.page || 1}?q=${search}&s=&o=`);
    }

    const selectOption = (option: IOptions): void => {
        setIsOpen(false)
        if (option !== value) onChange(option)
        window.history.pushState({}, '', `/${params?.page || 1}?q=${search}&s=${option?.value}&o=${option?.order}`);
    }

    const isOptionSelected = (option: IOptions) => {
        return option === value
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])
    return (
        <div
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            tabIndex={0}
            className={s.container}
        >
            <span className={s.value}>{value?.label || placeholder}</span>
            <button
                onClick={e => clearOptions(e)}
                className={s["clear-btn"]}
            >
                &times;
            </button>
            <div className={s.divider}></div>
            <div className={s.caret}></div>
            <ul className={cn(s.options, isOpen ? s.show : '')}>
                {options.map((option, index) => (
                    <li
                        key={option.label}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className={cn(s.option, isOptionSelected(option) ? s.selected : '', index === highlightedIndex ? s.highlighter : '')}
                        onClick={() => selectOption(option)}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;