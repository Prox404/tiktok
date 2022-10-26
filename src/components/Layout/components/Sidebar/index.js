import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import MainSidebarItem from "~/components/MainSidebarItem";
import Button from "~/components/Button";
import AccountItem from '~/components/AccountItem';
import DiscoverItem from '~/components/DiscoverItem';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {
    let cx = classNames.bind(styles);

    const [page, setPage] = useState(1);
    const [suggested, setSuggested] = useState([]);
    const currentUser = localStorage.getItem('user') ? localStorage.getItem('user') : undefined;

    useEffect(() => {
        fetch(`https://tiktok.fullstack.edu.vn/api/users/suggested?page=${encodeURIComponent(page)}`)
            .then((res) => res.json())
            .then((res) => {
                setSuggested(res.data);
            })
            .catch(() => {
                throw new Error('Error');
            });

    }, [page]);

    const handleSeeMore = () => {
        setPage(page + 1);
    }

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('main-nav-container')}>
                <MainSidebarItem
                    active
                    to="/"
                    icon={<svg width="32" height="32" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M24.9505 7.84001C24.3975 7.38666 23.6014 7.38666 23.0485 7.84003L6.94846 21.04C6.45839 21.4418 6.2737 22.1083 6.48706 22.705C6.70041 23.3017 7.26576 23.7 7.89949 23.7H10.2311L11.4232 36.7278C11.5409 38.0149 12.6203 39 13.9128 39H21.5C22.0523 39 22.5 38.5523 22.5 38V28.3153C22.5 27.763 22.9477 27.3153 23.5 27.3153H24.5C25.0523 27.3153 25.5 27.763 25.5 28.3153V38C25.5 38.5523 25.9477 39 26.5 39H34.0874C35.3798 39 36.4592 38.0149 36.577 36.7278L37.7691 23.7H40.1001C40.7338 23.7 41.2992 23.3017 41.5125 22.705C41.7259 22.1082 41.5412 21.4418 41.0511 21.04L24.9505 7.84001Z"></path></svg>}
                    title="Dành cho bạn" />
                <MainSidebarItem
                    to="/Following"
                    icon={<svg width="32" height="32" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18 12.5C15.5897 12.5 13.5849 14.5018 13.5849 17.0345C13.5849 19.5672 15.5897 21.569 18 21.569C20.4103 21.569 22.4151 19.5672 22.4151 17.0345C22.4151 14.5018 20.4103 12.5 18 12.5ZM10.5849 17.0345C10.5849 12.9017 13.8766 9.5 18 9.5C22.1234 9.5 25.4151 12.9017 25.4151 17.0345C25.4151 21.1673 22.1234 24.569 18 24.569C13.8766 24.569 10.5849 21.1673 10.5849 17.0345ZM18 29.8793C14.0801 29.8793 10.7403 32.5616 9.69697 36.2673C9.5473 36.7989 9.03833 37.1708 8.49337 37.0811L7.50662 36.9189C6.96166 36.8292 6.58837 36.3131 6.72325 35.7776C8.00732 30.6788 12.5509 26.8793 18 26.8793C23.449 26.8793 27.9927 30.6788 29.2767 35.7776C29.4116 36.3131 29.0383 36.8292 28.4934 36.9189L27.5066 37.0811C26.9617 37.1708 26.4527 36.7989 26.303 36.2673C25.2597 32.5616 21.9199 29.8793 18 29.8793Z"></path><path fillRule="evenodd" clipRule="evenodd" d="M33 31.5371C32.2445 31.5371 31.5198 31.668 30.8447 31.9093C30.3246 32.0951 29.7189 31.9243 29.4549 31.4392L28.9769 30.5608C28.713 30.0757 28.8907 29.463 29.4009 29.2516C30.513 28.791 31.7285 28.5371 33 28.5371C37.4554 28.5371 41.1594 31.6303 42.2706 35.7812C42.4135 36.3147 42.0386 36.8308 41.4935 36.9196L40.5065 37.0804C39.9614 37.1692 39.4546 36.7956 39.2894 36.2686C38.4217 33.5 35.91 31.5371 33 31.5371Z"></path><path fillRule="evenodd" clipRule="evenodd" d="M33 18.5C31.6193 18.5 30.5 19.6193 30.5 21C30.5 22.3807 31.6193 23.5 33 23.5C34.3807 23.5 35.5 22.3807 35.5 21C35.5 19.6193 34.3807 18.5 33 18.5ZM27.5 21C27.5 17.9624 29.9624 15.5 33 15.5C36.0376 15.5 38.5 17.9624 38.5 21C38.5 24.0376 36.0376 26.5 33 26.5C29.9624 26.5 27.5 24.0376 27.5 21Z"></path></svg>}
                    title="Đang Follow" />
                <MainSidebarItem
                    to="/Live"
                    icon={<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.78511 10.3334C6.95518 10.3334 6.33301 10.9792 6.33301 11.7143V20.2858C6.33301 21.0209 6.95518 21.6667 7.78511 21.6667H18.5744C19.4043 21.6667 20.0265 21.0209 20.0265 20.2858V17.5602C20.0265 17.1826 20.2392 16.8372 20.5763 16.6672C20.9135 16.4973 21.3177 16.5317 21.6212 16.7563L25.6663 19.7488V12.2513L21.6212 15.2439C21.3177 15.4684 20.9135 15.5029 20.5763 15.3329C20.2392 15.1629 20.0265 14.8175 20.0265 14.4399V11.7143C20.0265 10.9792 19.4043 10.3334 18.5744 10.3334H7.78511ZM25.6855 12.2371C25.6831 12.2388 25.6839 12.2383 25.6839 12.2383L25.6855 12.2371ZM25.6716 12.2177C25.673 12.2212 25.6746 12.2243 25.6763 12.2269C25.6798 12.2324 25.6834 12.2355 25.6855 12.2371L25.6874 12.2383C25.6874 12.2383 25.6865 12.238 25.6839 12.2383M4.33301 11.7143C4.33301 9.81952 5.90653 8.33337 7.78511 8.33337H18.5744C20.453 8.33337 22.0265 9.81953 22.0265 11.7143V12.4562L24.4963 10.629C25.0929 10.1877 25.8879 10.1155 26.5542 10.4359C27.224 10.758 27.6663 11.4325 27.6663 12.1905V19.8096C27.6663 20.5676 27.224 21.2421 26.5542 21.5642C25.888 21.8846 25.0929 21.8124 24.4963 21.371L22.0265 19.5439V20.2858C22.0265 22.1806 20.453 23.6667 18.5744 23.6667H7.78511C5.90653 23.6667 4.33301 22.1806 4.33301 20.2858V11.7143Z"></path><path d="M15 15.134C15.6667 15.5189 15.6667 16.4811 15 16.866L12 18.5981C11.3333 18.983 10.5 18.5019 10.5 17.7321L10.5 14.2679C10.5 13.4981 11.3333 13.017 12 13.4019L15 15.134Z"></path></svg>}
                    title="LIVE" />
            </div>
            {
                currentUser === undefined ? (

                    <div className={cx('frame-container')}>
                        <p className={cx('login-hint')}>
                            Đăng nhập để follow các tác giả, thích video và xem bình luận.
                        </p>
                        <div className={cx('login-button')}>
                            <Button primaryOutline w100 className={cx('login-button')} >
                                Đăng nhập
                            </Button>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }

            <div className={cx('user-container')}>
                <p className={cx('p-title')}>
                    Tài khoản được đề xuất
                </p>
                {
                    suggested && suggested.map((account, index) => {
                        return <AccountItem key={index} data={account} notShowInformation />
                    })
                }

                <div className={cx('show-more-text-container')}>
                    <p className={cx('show-more-text')} onClick={handleSeeMore}>
                        Xem tất cả
                    </p>
                </div>
            </div>
            <div className={cx('discover-container')}>
                <p className={cx('p-title')}>
                    Khám phá
                </p>
                <div className={cx('discover-item-container')}>
                    <DiscoverItem icon="hashtag" title="suthatla" />
                    <DiscoverItem icon="hashtag" title="mackedoi" />
                    <DiscoverItem icon="hashtag" title="sansangthaydoi" />
                    <DiscoverItem icon="hashtag" title="7749hieuung" />
                    <DiscoverItem icon="hashtag" title="genzlife" />
                    <DiscoverItem icon="music" title="Sóng gió" />
                    <DiscoverItem icon="music" title="Nơi tình yêu bắt đầu" />
                    <DiscoverItem icon="music" title="Bạc phận" />
                    <DiscoverItem icon="music" title="Hồng nhan" />
                </div>
            </div>
            <div className={cx('footer-container')}>
                <div className={cx('link-container')}>
                    <Link to="/" className={cx('styled-nav-link')}>
                        Giới thiệu
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        TikTok Browse
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        Bảng tin
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        Liên hệ
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        Sự nghiệp
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        ByteDance
                    </Link>
                </div>
                <div className={cx('link-container')}>
                    <Link to="/" className={cx('styled-nav-link')}>
                        TikTok for Good
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        Quảng cáo
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        Developers
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        Transparency
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        TikTok Rewards
                    </Link>
                </div>
                <div className={cx('link-container')}>
                    <Link to="/" className={cx('styled-nav-link')}>
                        Trợ giúp
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        An toàn
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        Điều khoản
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        Quyền riêng tư
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        Creator Portal
                    </Link>
                    <Link to="/" className={cx('styled-nav-link')}>
                        Hướng dẫn Cộng đồng
                    </Link>
                </div>

                <div className={cx('show-more-container')}>
                    <span className={cx('span-more-text')}>
                        Thêm
                    </span>
                </div>
                <span className={cx('coppyright')}>
                    © 2022 Prox
                </span>
            </div>



        </aside >
    );
}

export default Sidebar;