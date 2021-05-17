import cls from './Search.module.scss';
import {BiSearchAlt2} from 'react-icons/bi';

const Search = () => {
    return (
        <div className={cls.root}>
            <div className={cls.searchContent}>
                <BiSearchAlt2 />
                <input type='text' className={cls.searchInput} placeholder='Поиск пользователя' />
            </div>
        </div>
    )
}

export default Search;