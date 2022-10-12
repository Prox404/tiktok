// import { useState } from "react";
import classNames from "classnames/bind";
import { IoIosCloseCircle } from "react-icons/io";
// import { RiLoader4Fill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import Tippy from '@tippyjs/react/headless';
// import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import images from "~/assets/images";
import { Wrapper as WrapperPopper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import SearchItem from '~/components/SearchItem';


const cx = classNames.bind(styles);

function Header() {

    // const [searchResult, setSearchResult] = useState([]);
    const searchResult = [
        {
            result: 'test'
        },
        {
            result: 'test2'
        },
        {
            result: 'test3'
        }
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                </div>
                <Tippy
                    visible={searchResult.length > 0}
                    interactive={true}
                    render={
                        attrs => (

                            <div {...attrs} className={cx('search-results')} tabIndex="-1">
                                <WrapperPopper>
                                    <h4 className={cx('search-title')}>Search Result</h4>
                                    {searchResult.map((item, key) => {
                                        return (
                                            <SearchItem key={key} result={item.result} />
                                        )
                                    }
                                    )}
                                    <h4 className={cx('search-title')}>Accounts</h4>
                                    <AccountItem avatar="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/97387265_911934715945271_6195268394929881088_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=athQpXE4orYAX_LBNE3&_nc_ht=scontent.fdad1-3.fna&oh=00_AT_ctKotLK6YdcRCBra2xXCQ-9yaLbzs59v8k8Vq0n0vmw&oe=636DDF5A"
                                        name="Prox"
                                        username="prox404" />
                                    <AccountItem avatar="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/97387265_911934715945271_6195268394929881088_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=athQpXE4orYAX_LBNE3&_nc_ht=scontent.fdad1-3.fna&oh=00_AT_ctKotLK6YdcRCBra2xXCQ-9yaLbzs59v8k8Vq0n0vmw&oe=636DDF5A"
                                        name="Prox01"
                                        username="prox404" />
                                    <AccountItem avatar="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/97387265_911934715945271_6195268394929881088_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=athQpXE4orYAX_LBNE3&_nc_ht=scontent.fdad1-3.fna&oh=00_AT_ctKotLK6YdcRCBra2xXCQ-9yaLbzs59v8k8Vq0n0vmw&oe=636DDF5A"
                                        name="Prox02"
                                        username="prox404" />
                                    <div className={cx('last-item')}>
                                        <p className={cx('last-item-title')}>
                                            Xem tất cả kết quả dành cho ""
                                        </p>
                                    </div>
                                </WrapperPopper>
                            </div>

                        )
                    }>
                    <div className={cx('search')} >
                        <input type="text" placeholder="Search" spellCheck={false} />
                        <button type="button" className={cx('search-action')}>
                            {/* <RiLoader4Fill className={cx('loading')} /> */}
                            <IoIosCloseCircle className={cx('clear')} />
                        </button>
                        {/* loading */}
                        <button className={cx('search-btn')}>
                            <BiSearch />
                        </button>
                    </div>
                </Tippy>

                <div className={cx('actions')}>
                    {/* action */}
                </div>
            </div>
        </div>
    );
}

export default Header;