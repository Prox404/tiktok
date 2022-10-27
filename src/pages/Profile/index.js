import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import * as getUserServices from '~/services/getUserServices';
import * as followUserServices from '~/services/followUserServices';
import * as unFollowUserServices from '~/services/unFollowUserServices';
import Image from '~/components/Image';
import styles from './Profile.module.scss';
import Button from '~/components/Button';
import BlankLayout from '~/components/BlankLayout';
import VideoListItem from '~/components/VideoListItem';

let cx = classNames.bind(styles);

function Profile() {
    const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
    const location = useLocation();

    const [user, setUser] = useState({});

    useEffect(() => {
        const getUserProfile = async () => {
            const result = await getUserServices.getUser(location.pathname);
            setUser(result);
        };
        getUserProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const videoList = user.videos ? user.videos : [];

    const [follow, setFollow] = useState(user.is_followed ? false : true);


    const handleFollowUser = () => {
        followUserServices.followUser(user.id);
        user.is_followed = true;
        setFollow(true);
    }
    const handleUnFollowUser = () => {
        unFollowUserServices.unFollowUser(user.id);
        user.is_followed = false;
        setFollow(false);
    }


    return (
        <>
            {
                user ? (
                    <div className={cx('profile-wrapper')}>
                        <div className={cx('profile-header')}>
                            <div className={cx('profile-info')}>
                                <div className={cx('avatar-container')}>
                                    <Image className={cx('user-avatar')} loading="lazy" circle src={user.avatar} />
                                </div>
                                <div className={cx('profile-tỉtle-container')}>
                                    <h2 className={cx('user-profile-name')}>
                                        {user.nickname}
                                    </h2>
                                    <h1 className={cx('user-profile-subtitle')}>
                                        {user.first_name + ' ' + user.last_name}
                                    </h1>
                                    <div className={cx('profile-follow-container')}>
                                        <div className={cx('button-wrapper')}>
                                            {
                                                (follow && <>
                                                    <Button primaryOutline onClick={handleUnFollowUser}>
                                                        Unfollow
                                                    </Button>
                                                </>) || (
                                                    user.id === currentUser.id ? (<>
                                                        <Button outline>
                                                            Chỉnh sửa
                                                        </Button>
                                                    </>) : (
                                                        <>
                                                            <Button primary onClick={handleFollowUser}>
                                                                Follow
                                                            </Button>
                                                        </>
                                                    )

                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className={cx('profile-info-count')}>
                                <div className={cx('profile-info-count-item')}>
                                    <strong title="Đang Follow">{user.followings_count}</strong>
                                    <span>Đang Follow</span>
                                </div>
                                <div className={cx('profile-info-count-item')}>
                                    <strong title="Đang Follow">{user.followers_count}</strong>
                                    <span>Follower</span>
                                </div>
                                <div className={cx('profile-info-count-item')}>
                                    <strong title="Đang Follow">{user.likes_count}</strong>
                                    <span>Thích</span>
                                </div>
                            </div>
                            <div className={cx('profile-description')}>
                                {user.bio ? user.bio : 'Chưa có tiểu sử'}
                            </div>
                            <a className={cx('profile-links')} href={user.website_url}>
                                <svg width="18" height="18" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M23.5857 9.58571C27.6805 5.49096 34.3194 5.49096 38.4141 9.58571C42.5089 13.6805 42.5089 20.3194 38.4141 24.4141L37.1212 25.707C36.7307 26.0975 36.0975 26.0975 35.707 25.707L34.2928 24.2928C33.9023 23.9023 33.9023 23.2691 34.2928 22.8786L35.5857 21.5857C38.1184 19.0531 38.1184 14.9468 35.5857 12.4141C33.053 9.88149 28.9468 9.88148 26.4141 12.4141L22.4141 16.4141C20.121 18.7072 19.9041 22.2903 21.7634 24.8275C22.0899 25.2729 22.0976 25.9023 21.707 26.2928L20.2928 27.707C19.9023 28.0975 19.2646 28.1001 18.9126 27.6745C15.5048 23.5554 15.7292 17.4422 19.5857 13.5857L23.5857 9.58571ZM27.707 20.2928C28.0976 19.9023 28.7352 19.8997 29.0873 20.3253C32.495 24.4444 32.2706 30.5576 28.4141 34.4141L24.4141 38.4141C20.3194 42.5089 13.6805 42.5089 9.58571 38.4141C5.49096 34.3193 5.49096 27.6804 9.58573 23.5857L10.8786 22.2928C11.2691 21.9023 11.9023 21.9023 12.2928 22.2928L13.707 23.707C14.0976 24.0975 14.0975 24.7307 13.707 25.1212L12.4141 26.4141C9.88148 28.9468 9.88148 33.053 12.4141 35.5857C14.9468 38.1183 19.053 38.1183 21.5857 35.5857L25.5857 31.5857C27.8788 29.2926 28.0957 25.7095 26.2364 23.1724C25.9099 22.7269 25.9023 22.0975 26.2928 21.707L27.707 20.2928Z"></path></svg>
                                <span className={cx('span-link')}> {user.website_url} </span>
                            </a>
                        </div>
                        <div className={cx('profile-footer')}>
                            <div className={cx('video-feed-tab')}>
                                <p className={clsx(cx('video-feed-tab-item'), cx('item-1'))}>
                                    Video
                                </p>
                                <p className={clsx(cx('video-feed-tab-item'), cx('item-2'))}>
                                    Đã thích
                                </p>
                                <div className={cx('bottom-line')}></div>
                            </div>
                            <div className={cx('video-list-container')}>
                                <div className={cx('video-list')}>
                                    {videoList.map((video, index) => {
                                        return (
                                            <VideoListItem
                                                videoId={video.id}
                                                videoUrl={video.file_url}
                                                thumbnail={video.thumbnail_url}
                                                description={video.description}
                                                viewCount={video.views_count}
                                                key={index} />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <BlankLayout
                        title="Không thể tìm thấy tài khoản này"
                        description="Bạn đang tìm kiếm video? Hãy thử duyệt tìm các tác giả, hashtag và âm thanh thịnh hành của chúng tôi."
                    >
                        <svg className={cx('error-svg')} width="90" height="90" viewBox="0 0 72 72" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16.6276 20.2241C16.6276 30.8074 25.2394 39.4192 35.8227 39.4192C46.4059 39.4192 55.0178 30.8074 55.0178 20.2241C55.0178 9.64086 46.4059 1.02899 35.8227 1.02899C25.2394 1.02899 16.6276 9.64086 16.6276 20.2241ZM19.7405 20.2244C19.7405 11.3583 26.9568 4.14202 35.8229 4.14202C44.689 4.14202 51.9053 11.3583 51.9053 20.2244C51.9053 29.0905 44.689 36.3068 35.8229 36.3068C26.9568 36.3068 19.7405 29.0905 19.7405 20.2244Z"></path><path d="M6.69813 70.9717C6.56844 70.9717 6.43874 70.9562 6.30904 70.9199C5.47898 70.7072 4.97576 69.8563 5.19365 69.0263C8.79922 55.045 21.3954 45.2762 35.8228 45.2762C50.2503 45.2762 62.8465 55.0398 66.4572 69.0211C66.6699 69.8512 66.1719 70.702 65.3366 70.9147C64.5014 71.1326 63.6558 70.6293 63.4379 69.7941C60.1851 57.1876 48.8288 48.3837 35.8176 48.3837C22.8117 48.3837 11.4554 57.1876 8.19743 69.7941C8.02104 70.5048 7.39331 70.9717 6.69813 70.9717Z"></path></svg>
                    </BlankLayout>
                )
            }
        </>
    );
}

export default Profile;