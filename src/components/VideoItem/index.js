import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import * as likeVideoServices from '~/services/likeVideoServices';
import * as unLikeVideoServices from '~/services/unLikeVideoServices';
import * as followUserServices from '~/services/followUserServices';
import * as unFollowUserServices from '~/services/unFollowUserServices';
import Image from '../Image';
import Button from '~/components/Button';
import styles from './VideoItem.module.scss';

let cx = classNames.bind(styles);

function VideoItem({ data }) {
    const [content, setContent] = useState(data);
    const [followed, setFollowed] = useState(content.user.is_followed ? content.user.is_followed : false);

    const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
    const location = useLocation();

    const handleFollowUser = () => {
        followUserServices.followUser(content.user.id);
        setFollowed(true);
    }
    const handleUnFollowUser = () => {
        unFollowUserServices.unFollowUser(content.user.id);
        setFollowed(false);
    }

    const handleLikePost = () => {
        const newContent = likeVideoServices.likePost(content.id);
        newContent.then(res => {
            setContent((content) => ({
                ...content,
                ...res,
            }));
        });

    }

    const handleUnLikePost = () => {
        const newContent = unLikeVideoServices.unLikePost(content.id);
        newContent.then(res => {
            setContent((content) => ({
                ...content,
                ...res,
            }));
        });
    }

    // console.log('render');
    // console.log(content);

    return (
        <>
            {
                content && (
                    <div className={cx('wrapper')}>
                        <Link to={`/@${content.user.nickname}`}>
                            <Image className={cx('avatar')}
                                src={content.user.avatar} />
                        </Link>
                        <div className={cx('content-container')}>
                            <div className={cx('text-info-container')}>
                                <div className={cx('author-container')}>
                                    <Link className={cx('author-anchor')} to="/">
                                        <h3 className={cx('author-name')}>
                                            {content.user.first_name + ' ' + content.user.last_name}
                                        </h3>
                                        <h4 className={cx('author-nickname')}>
                                            {content.user.nickname}
                                        </h4>
                                    </Link>
                                </div>
                                {
                                    (followed === false && (
                                        <Button onClick={handleFollowUser} primaryOutline small className={cx('follow-btn')}>
                                            Follow
                                        </Button>
                                    )) || (
                                        <>
                                            <Button onClick={handleUnFollowUser} outline small className={cx('follow-btn')}>
                                                Đang theo dõi
                                            </Button>
                                        </>
                                    )
                                }

                                <div className={cx('description-container')}>
                                    <span className={cx('text-description')}>
                                        {content.description}
                                    </span>
                                </div>
                                <div className={cx('music-container')}>
                                    <svg className={cx('music-svg')} fill="currentColor" width="16" height="16" viewBox="0 0 48 48"><path fillRule="evenodd" clipRule="evenodd" d="M35.0001 10.7587C35.0001 10.1169 34.4041 9.64129 33.7784 9.78359L17.7902 13.4192C17.335 13.5227 17.0119 13.9275 17.0119 14.3943V37.9972H17.0109C17.0374 40.1644 14.8022 42.4189 11.612 43.2737C8.05093 44.2279 4.64847 43.0769 4.01236 40.7028C3.37624 38.3288 5.74735 35.6308 9.30838 34.6766C10.606 34.3289 11.8826 34.2608 13.0119 34.4294V14.3943C13.0119 12.0601 14.6271 10.0364 16.9033 9.5188L32.8914 5.88317C36.0204 5.17165 39.0001 7.54986 39.0001 10.7587V33.1191C39.084 35.3108 36.8331 37.6109 33.6032 38.4763C30.0421 39.4305 26.6397 38.2795 26.0036 35.9055C25.3675 33.5315 27.7386 30.8334 31.2996 29.8792C32.5961 29.5319 33.8715 29.4635 35.0001 29.6316V10.7587Z"></path></svg>
                                    <span className={cx('music-name')}>
                                        {content.music}
                                    </span>
                                </div>
                            </div>
                            <div className={cx('video-container')}>
                                <div className={cx('video-card-container')}>
                                    <div className={cx('video-player')}>
                                        <video className={cx('video-card')}
                                            src={content.file_url}
                                            width="56.25" height="100"
                                            controls
                                            loop
                                            autoPlay
                                            playsInline
                                            muted
                                        />
                                    </div>
                                </div>
                                <div className={cx('actions-container')}>
                                    <Button onClick={content.is_liked ? handleUnLikePost : handleLikePost} className={cx('action-btn')}>
                                        <span className={cx('span-icon')}>
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                                <path className={content.is_liked ? cx('liked') : ''} fillRule="evenodd" clipRule="evenodd" d="M7.5 2.25C10.5 2.25 12 4.25 12 4.25C12 4.25 13.5 2.25 16.5 2.25C20 2.25 22.5 4.99999 22.5 8.5C22.5 12.5 19.2311 16.0657 16.25 18.75C14.4095 20.4072 13 21.5 12 21.5C11 21.5 9.55051 20.3989 7.75 18.75C4.81949 16.0662 1.5 12.5 1.5 8.5C1.5 4.99999 4 2.25 7.5 2.25Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M2.40179 12.1998C3.58902 14.6966 5.7592 16.9269 7.74989 18.75C9.5504 20.3989 10.9999 21.5 11.9999 21.5C12.9999 21.5 14.4094 20.4072 16.2499 18.75C19.231 16.0657 22.4999 12.5 22.4999 8.49997C22.4999 8.41258 22.4983 8.32566 22.4952 8.23923C20.5671 13.6619 13.6787 18.5 11.75 18.5C10.3127 18.5 5.61087 15.8131 2.40179 12.1998Z" fill="black" fillOpacity="0.03"></path>
                                            </svg>
                                        </span>
                                        <strong className={cx('strong-text')}>
                                            {content.likes_count}
                                        </strong>
                                    </Button>

                                    <Button to={currentUser ? `videos/${content.id}` : '/login'} state={currentUser ? { videos: location } : { modal: location }} className={cx('action-btn')}>
                                        <span className={cx('span-icon')}>
                                            <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M16.0393 14.7137C17.75 13 18.75 11.215 18.75 9.13662C18.75 4.91897 14.8887 1.49997 10.125 1.49997C5.36129 1.49997 1.5 4.91897 1.5 9.13675C1.5 13.3545 5.48622 16.25 10.25 16.25V17.6487C10.25 18.0919 10.7095 18.3771 11.0992 18.1659C12.3166 17.5062 14.5725 16.183 16.0393 14.7137ZM5.93527 8.10679C6.61608 8.10679 7.16797 8.65471 7.16797 9.32962C7.16797 10.0059 6.61608 10.5538 5.93527 10.5538C5.2556 10.5538 4.70368 10.0059 4.70368 9.32962C4.70368 8.65471 5.2556 8.10679 5.93527 8.10679ZM11.3572 9.32962C11.3572 8.65471 10.8055 8.10679 10.125 8.10679C9.44459 8.10679 8.89289 8.65471 8.89289 9.32962C8.89292 10.0059 9.44462 10.5538 10.125 10.5538C10.8055 10.5538 11.3572 10.0059 11.3572 9.32962ZM14.3146 8.10679C14.9953 8.10679 15.5464 8.65471 15.5464 9.32962C15.5464 10.0059 14.9953 10.5538 14.3146 10.5538C13.6339 10.5538 13.082 10.0059 13.0821 9.32962C13.0821 8.65471 13.6339 8.10679 14.3146 8.10679Z"></path><path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M10.25 16.2499C10.25 16.2499 15.0278 15.8807 17.025 13.3234C15.0278 16.1364 13.0307 17.6708 11.2831 18.1822C9.53561 18.6937 10.25 16.2499 10.25 16.2499Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                        <strong className={cx('strong-text')}>
                                            {content.comments_count}
                                        </strong>
                                    </Button>
                                    <Button className={cx('action-btn')}>
                                        <span className={cx('span-icon')}>
                                            <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10.9376 3.17495C10.9376 2.58272 11.6469 2.27873 12.0758 2.68715L18.6021 8.90241C19.1764 9.44937 19.1564 10.3717 18.5588 10.8931L12.0541 16.5689C11.6184 16.9491 10.9376 16.6397 10.9376 16.0614V13.4894C10.9376 13.4894 3.95344 12.2312 1.7131 16.3434C1.50423 16.7268 0.690072 16.8609 0.855563 14.948C1.54761 11.4273 2.96196 5.93084 10.9376 5.93084V3.17495Z" fill="currentColor"></path><path opacity="0.03" fillRule="evenodd" clipRule="evenodd" d="M15.7538 6.21161L17.0486 8.80136C17.2777 9.25947 17.1677 9.81453 16.7812 10.1506L10.9824 15.193C10.9824 15.193 10.7017 16.5964 11.5437 16.5964C12.3857 16.5964 19.1218 10.4217 19.1218 10.4217C19.1218 10.4217 19.4025 9.57964 18.5605 8.73763C17.7185 7.89563 15.7538 6.21161 15.7538 6.21161Z" fill="#161823"></path><path opacity="0.09" fillRule="evenodd" clipRule="evenodd" d="M10.9374 6.22983V13.5272C10.9374 13.5272 4.25359 12.5854 2.16026 15.7726C0.146021 18.8394 0.331011 12.3091 3.36331 9.05711C6.39561 5.8051 10.9374 6.22983 10.9374 6.22983Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                        <strong className={cx('strong-text')}>
                                            {content.shares_count}
                                        </strong>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }
        </>
    );
}

export default VideoItem;