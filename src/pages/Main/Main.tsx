import {useQuery} from "react-query";
import {GitHubUsersService} from "@/services/gitHub-user/gitHub-users.service.ts";
import {ChangeEvent, useState} from "react";
import Container from "@/components/Container/Container.tsx";
import s from './Main.module.scss'
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import Input from "@/components/UI/Input/Input.tsx";
import useDebounce from "@/hooks/useDebounce.tsx";
import ReactPaginate from "react-paginate";
import User from "@/components/User/User.tsx";
import Select, {IOptions} from "@/components/UI/Select/Select.tsx";
import {formatter} from "@/help/formatter.ts";
import Skeleton from "@/components/Skeleton/Skeleton.tsx";
import github from '@/assets/img/github.jpg'
import ParticlesBackground from "@/components/ParticlesBackground/ParticlesBackground.tsx";
import {determinateWordHelper} from "@/help/determinateWord.ts";

const options = [
    {value: 'followers', label: 'Fewest Followers', order: 'asc'},
    {value: 'followers', label: 'Most Followers', order: 'desc'},
    {value: 'repositories', label: 'Fewest Repositories', order: 'asc'},
    {value: 'repositories', label: 'Most Repositories', order: 'desc'},
    {value: 'joined', label: 'Fewest Joined', order: 'asc'},
    {value: 'joined', label: 'Most Joined', order: 'desc'},
];

const Main = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [search, setSearch] = useState<string>(searchParams.get('q') ? String(searchParams.get('q')) : '')
    const debouncedSearchValue = useDebounce(search ? search : '');
    const params = useParams()
    const [selectedOption, setSelectedOption] = useState<IOptions>({
        value: searchParams.get('s') ? String(searchParams.get('s')) : '',
        order: searchParams.get('o') ? String(searchParams.get('o')) : '',
        label: options.find(option => option?.value === (searchParams.get('s') ? String(searchParams.get('s')) : '') && (searchParams.get('o') ? String(searchParams.get('o')) : ''))?.label
    } as IOptions);

    const {
        isLoading: usersLoading,
        data: usersData,
    } = useQuery(['getUsers', debouncedSearchValue, params?.page, selectedOption],
        () => GitHubUsersService.getUsers({
            q: debouncedSearchValue,
            page: params?.page === undefined ? 1 : Number(params.page),
            per_page: 30,
            sort: selectedOption?.value ? selectedOption?.value : undefined,
            order: selectedOption?.order ? selectedOption?.order : undefined
        }))

    const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value)
        window.history.pushState({}, '', `/${params?.page || 1}?q=${e.target.value}&s=${selectedOption?.value ? selectedOption?.value : ''}&o=${selectedOption?.order ? selectedOption?.order : ''}`);
    }

    const handlePageClick = (event: { selected: number }): void => {
        navigate(`/${event.selected + 1}?q=${search}&s=${selectedOption?.value ? selectedOption?.value : ''}&o=${selectedOption?.order ? selectedOption?.order : ''}`)
    };

    const words = ['пользователь', 'пользователя', 'пользователей']

    return (
        <Container>
            <ParticlesBackground/>

            <div className={s.main}>
                <Input
                    value={search}
                    setValue={setSearch}
                    placeholder={'Введите название аккаунта...'}
                    onChange={handleInput}
                    isLoading={usersLoading}
                />
                {
                    !search ?
                        <div className={s.noValue}>
                            <h1>GitHub API</h1>
                            <p>Добро пожаловать в GitHub API! Здесь вы сможете найти всевозможных пользователей, что
                                предоставляет API!</p>
                            <img src={github} alt='imgGitHub'/>
                        </div>

                        :
                        usersLoading ?
                            <>
                                {
                                    [...new Array(8)].map((_, index) =>
                                        <div
                                            key={index}
                                            className={s.skeleton}
                                        >
                                            <Skeleton width={40} height={40}/>
                                            <Skeleton width={200} height={40}/>
                                        </div>
                                    )

                                }
                                <div className={s.skeletonPaginate}>
                                    {
                                        [...new Array(7)].map((_, index) =>
                                            <Skeleton key={index} width={32} height={32}/>
                                        )
                                    }
                                </div>
                            </>
                            :
                            <>
                                {
                                    usersData?.data?.items?.length ?
                                        <>
                                            <div className={s.panel}>
                                                <div className={s.result}>
                                                    Найдено: {formatter.format(usersData.data.items.length * usersData.data.total_count)} {''}
                                                    {determinateWordHelper(usersData.data.items.length * usersData.data.total_count, words)}
                                                </div>
                                                <Select
                                                    options={options}
                                                    value={selectedOption}
                                                    onChange={option => setSelectedOption(!option ? {} as IOptions : option)}
                                                    search={search}
                                                    placeholder='Выберите фильтраицю...'
                                                />
                                            </div>
                                            <div className={s.users}>
                                                {
                                                    usersData.data.items.map((user) => (
                                                        <User key={user.id} user={user}/>
                                                    ))
                                                }
                                            </div>
                                            {
                                                usersData?.data?.total_count &&
                                                <ReactPaginate
                                                    pageCount={Math.ceil(usersData.data.total_count / 30) > 33 ? 33 : Math.ceil(usersData.data.total_count / 30)} // апишка github не отдает больше 1000 пользователей
                                                    onPageChange={handlePageClick}
                                                    containerClassName={s.pagination}
                                                    pageLinkClassName={s.pageNum}
                                                    previousLinkClassName={s.next}
                                                    nextLinkClassName={s.prev}
                                                    activeLinkClassName={s.active}
                                                    disabledLinkClassName={s.disabled}
                                                    forcePage={params?.page ? Number(params?.page) - 1 : 1}
                                                />
                                            }
                                        </>
                                        :
                                        navigate('/not-found')
                                }
                            </>
                }
            </div>
        </Container>
    )
}

export default Main;