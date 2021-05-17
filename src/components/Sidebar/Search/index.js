import cls from './Search.module.scss';
import {BiSearchAlt2} from 'react-icons/bi';

const Search = ({ value, setValue }) => {

    const handleChange = e => {
        setValue(e.target.value);
    }

    return (
        <div className={cls.root}>
            <div className={cls.searchContent}>
                <BiSearchAlt2 />
                <input onChange={handleChange} value={value} type='text' className={cls.searchInput} placeholder='Поиск пользователя' />
            </div>
        </div>
    )
}

export default Search;