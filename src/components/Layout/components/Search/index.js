import { IoIosCloseCircle } from "react-icons/io";
import { RiLoader4Fill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import HeadlessTippy from '@tippyjs/react/headless';
import { useState, useRef, useEffect, memo } from "react";

import * as searchServices from '~/services/searchServices';
import { useDebounce } from '~/hooks';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import classNames from "classnames/bind";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {

    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef(null);
    const debounced = useDebounce(searchValue, 500);

    const handleSearch = () => {

    }

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced);


            setSearchResult(result);
            if (result) {
                setVisible(true);
            }
            setLoading(false);
        };
        fetchApi();

    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        searchRef.current.focus();
    };

    const handleHideResult = () => {
        setVisible(false);
    };

    return (
        <div className={cx('wrapper')}>
            <HeadlessTippy
                visible={visible && searchResult.length > 0}
                interactive={true}
                onClickOutside={handleHideResult}
                render={
                    attrs => (
                        <div {...attrs} className={cx('search-results')} tabIndex="-1">
                            <WrapperPopper>
                                <div className={cx('search-item')}>
                                    <BiSearch className={cx('search-item-icon')} />
                                    <p className={cx('result')}>
                                        {searchValue}
                                    </p>
                                </div>
                                <h4 className={cx('search-title')}>Accounts</h4>

                                {searchResult && searchResult.map((result) => (
                                    <AccountItem key={result.id} data={result} />
                                ))}

                                <div className={cx('last-item')}>
                                    <p className={cx('last-item-title')}>
                                        Xem tất cả kết quả dành cho "{searchValue}"
                                    </p>
                                </div>
                            </WrapperPopper>
                        </div>

                    )
                }>
                <div className={cx('search')} >
                    <input
                        ref={searchRef}
                        type="text" placeholder="Search"
                        spellCheck={false}
                        value={searchValue}
                        onChange={(e) => { setSearchValue(e.target.value) }}
                        onFocus={handleSearch}
                    />
                    <button type="button" className={cx('search-action')}>
                        {!!searchValue && !loading && (
                            <IoIosCloseCircle className={cx('clear')}
                                onClick={handleClear}
                            />
                        )}
                    </button>
                    {/* loading */}
                    {loading && <RiLoader4Fill className={cx('loading')} />}
                    <button className={cx('search-btn')} onClick={() => handleSearch()}>
                        <BiSearch />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default memo(Search);