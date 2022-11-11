import classNames from 'classnames/bind';
import { useEffect, useState, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import clsx from 'clsx';

import * as getVideoServices from '~/services/getVideoServices';
import * as getCommentServices from '~/services/getCommentServices';
import * as createCommentServices from '~/services/createCommentServices';
import * as deleteCommentServices from '~/services/deleteCommentServices';
import * as likeVideoServices from '~/services/likeVideoServices';
import * as unLikeVideoServices from '~/services/unLikeVideoServices';
import * as followUserServices from '~/services/followUserServices';
import * as unFollowUserServices from '~/services/unFollowUserServices';

import styles from './Videos.module.scss';
import Image from '../Image';
import Button from '../Button';
import CommentItem from '~/components/CommentItem';
import { toast } from 'react-toastify';
import VideoControls from '../VideoControls';


let cx = classNames.bind(styles);

function Videos({ data }) {

    const [id, setId] = useState(data ? data : 1);
    const [video, setVideo] = useState({});
    const [user, setUser] = useState({});
    const [comment, setComment] = useState({});
    const [commentContent, setCommentContent] = useState('');
    const commentRef = useRef();
    const videoRef = useRef();
    const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
    const location = useLocation();
    console.log(location);

    useEffect(() => {
        const loadVideo = async () => {
            const res = await getVideoServices.getVideo(id);
            setVideo(res);
            setUser(res.user);
        }
        loadVideo();


        const loadComment = async () => {
            const comment = await getCommentServices.getComment(id);
            setComment(comment);
        }

        currentUser && loadComment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    async function commentVideo(id) {
        const newComment = await createCommentServices.comment(id, {
            comment: commentContent
        })
        setComment([...comment, newComment]);

        setCommentContent('');
        commentRef.current.focus();
    }

    const handleDeleteComment = (id, commentContent) => {
        deleteCommentServices.deleteComment(id, {
            comment: commentContent
        });

        setComment(comment.filter(item => item.id !== id));
        console.log(comment);
    }

    const handleFollowUser = () => {
        const newContent = followUserServices.followUser(user.id);
        console.log(newContent);
        newContent.then(res => {
            setUser((user) => ({
                ...user,
                ...res,
            }));
        });
    }
    const handleUnFollowUser = () => {
        const newContent = unFollowUserServices.unFollowUser(user.id);
        newContent.then(res => {
            setUser((user) => ({
                ...user,
                ...res,
            }));
        });
    }

    const handleLikePost = () => {
        const newContent = likeVideoServices.likePost(video.id);
        newContent.then(res => {
            setVideo((video) => ({
                ...video,
                ...res,
            }));
        });

    }

    const handleUnLikePost = () => {
        const newContent = unLikeVideoServices.unLikePost(video.id);
        newContent.then(res => {
            setVideo((video) => ({
                ...video,
                ...res,
            }));
        });
        console.log(newContent);
    }

    const [hasMore, setHasMore] = useState(true);
    const [hasLess, setHasLess] = useState(true);

    const handleNextVideo = () => {
        try {
            const isHasMore = getVideoServices.getVideo(id + 1);

            isHasMore.then(res => {
                if (res) {
                    setId(id + 1);
                    setHasLess(true);
                }
                else {
                    toast.error('This is the last video');
                    setHasMore(false);
                    setHasLess(true);
                }
            });
        } catch (error) {
            console.log(error);
        }

    };

    const handlePrevVideo = () => {
        try {
            const isHasMore = getVideoServices.getVideo(id - 1);

            isHasMore.then(res => {
                if (res) {
                    setId(id - 1);
                    setHasMore(true);
                }
                else {
                    toast.error('This is the last video');
                    setHasLess(false);
                    setHasMore(true);
                }
            });
        } catch (error) {
            console.log(error);
        }

    };

    const copyVideoHref = () => {
        navigator.clipboard.writeText(`https://prox-tiktok.vercel.app/videos/${id}?share=true`);
        toast.success('Coppy link success');
    }

    // console.log(video);
    // console.log('render');

    return (<>
        {
            Object.keys(video).length !== 0 && (
                <div className={cx('wrapper')}>
                    <div className={cx('video-container')}>
                        <Image className={cx('video-background')} src={video.thumb_url}></Image>
                        <video ref={videoRef} className={cx('video-player')} src={video.file_url} ></video>
                        <VideoControls refVideo={videoRef} />
                        {
                            hasMore && (<Button key="1" onClick={handleNextVideo} className={clsx(cx('video-actions-btn'), cx('arrow-up'))}>
                                <svg width="26" height="26" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M34.4142 22.5858L18.1213 6.29289C17.7308 5.90237 17.0976 5.90237 16.7071 6.29289L15.2929 7.70711C14.9024 8.09763 14.9024 8.7308 15.2929 9.12132L30.1716 24L15.2929 38.8787C14.9024 39.2692 14.9024 39.9024 15.2929 40.2929L16.7071 41.7071C17.0976 42.0976 17.7308 42.0976 18.1213 41.7071L34.4142 25.4142C35.1953 24.6332 35.1953 23.3668 34.4142 22.5858Z"></path></svg>
                            </Button>)}
                        {
                            hasLess && (<Button onClick={handlePrevVideo} key="2" className={clsx(cx('video-actions-btn'), cx('arrow-down'))}>
                                <svg width="26" height="26" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M34.4142 22.5858L18.1213 6.29289C17.7308 5.90237 17.0976 5.90237 16.7071 6.29289L15.2929 7.70711C14.9024 8.09763 14.9024 8.7308 15.2929 9.12132L30.1716 24L15.2929 38.8787C14.9024 39.2692 14.9024 39.9024 15.2929 40.2929L16.7071 41.7071C17.0976 42.0976 17.7308 42.0976 18.1213 41.7071L34.4142 25.4142C35.1953 24.6332 35.1953 23.3668 34.4142 22.5858Z"></path></svg>
                            </Button>)}
                    </div>
                    <div className={cx('content-container')}>
                        <div className={cx('info-container')}>
                            <Link className={cx('avatar-container')} to={`@${user.nickname}`}>
                                <div className={cx('avatar-wrapper')}>
                                    <Image className={cx('avatar-img')} circle src={user.avatar} />
                                </div>
                            </Link>
                            <Link className={cx('user-container')} to={`@${user.nickname}`}>
                                <span className={cx('user-nickname')}>{user.nickname}</span>
                                <br />
                                <span className={cx('user-name')}>
                                    {user.first_name + ' ' + user.last_name}
                                </span>
                            </Link>
                            {
                                (user.is_followed && (<>
                                    <Button onClick={handleUnFollowUser} outline className={cx('follow-btn')}>
                                        Đang Follow
                                    </Button>
                                </>)) || (<>
                                    <Button onClick={handleFollowUser} primaryOutline className={cx('follow-btn')}>
                                        Follow
                                    </Button>
                                </>)
                            }
                        </div>
                        <div className={cx('main-content')}>
                            <div className={cx('description-container')}>
                                <span>
                                    {video.description}
                                </span>
                            </div>
                            <div className={cx('music-container')}>
                                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" ><path fillRule="evenodd" clipRule="evenodd" d="M35.0001 10.7587C35.0001 10.1169 34.4041 9.64129 33.7784 9.78359L17.7902 13.4192C17.335 13.5227 17.0119 13.9275 17.0119 14.3943V37.9972H17.0109C17.0374 40.1644 14.8022 42.4189 11.612 43.2737C8.05093 44.2279 4.64847 43.0769 4.01236 40.7028C3.37624 38.3288 5.74735 35.6308 9.30838 34.6766C10.606 34.3289 11.8826 34.2608 13.0119 34.4294V14.3943C13.0119 12.0601 14.6271 10.0364 16.9033 9.5188L32.8914 5.88317C36.0204 5.17165 39.0001 7.54986 39.0001 10.7587V33.1191C39.084 35.3108 36.8331 37.6109 33.6032 38.4763C30.0421 39.4305 26.6397 38.2795 26.0036 35.9055C25.3675 33.5315 27.7386 30.8334 31.2996 29.8792C32.5961 29.5319 33.8715 29.4635 35.0001 29.6316V10.7587Z"></path></svg>
                                {video.music}
                            </div>
                            <div className={cx('social-container')}>
                                <div className={cx('actions-container')}>
                                    <div className={cx('actions-item')}>
                                        <Button onClick={video.is_liked ? handleUnLikePost : handleLikePost} className={cx('actions-btn')}>
                                            <div className={cx('actions-btn-wrapper')}>
                                                <span className={cx('span-icon-wrapper')}>
                                                    <svg viewBox="0 0 24 24" fill={video.is_liked ? 'rgba(254, 44, 85, 1)' : 'currentColor'} width="20" height="20">
                                                        <path className={video.is_liked ? cx('liked') : ''} fillRule="evenodd" clipRule="evenodd" d="M7.5 2.25C10.5 2.25 12 4.25 12 4.25C12 4.25 13.5 2.25 16.5 2.25C20 2.25 22.5 4.99999 22.5 8.5C22.5 12.5 19.2311 16.0657 16.25 18.75C14.4095 20.4072 13 21.5 12 21.5C11 21.5 9.55051 20.3989 7.75 18.75C4.81949 16.0662 1.5 12.5 1.5 8.5C1.5 4.99999 4 2.25 7.5 2.25Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M2.40179 12.1998C3.58902 14.6966 5.7592 16.9269 7.74989 18.75C9.5504 20.3989 10.9999 21.5 11.9999 21.5C12.9999 21.5 14.4094 20.4072 16.2499 18.75C19.231 16.0657 22.4999 12.5 22.4999 8.49997C22.4999 8.41258 22.4983 8.32566 22.4952 8.23923C20.5671 13.6619 13.6787 18.5 11.75 18.5C10.3127 18.5 5.61087 15.8131 2.40179 12.1998Z" fill="black" fillOpacity="0.03"></path>
                                                    </svg>
                                                </span>
                                                <strong className={cx('strong-text')}>
                                                    {video.likes_count}
                                                </strong>
                                            </div>
                                        </Button>
                                        <Button className={cx('actions-btn')}>
                                            <div className={cx('actions-btn-wrapper')}>
                                                <span className={cx('span-icon-wrapper')}>
                                                    <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M16.0393 14.7137C17.75 13 18.75 11.215 18.75 9.13662C18.75 4.91897 14.8887 1.49997 10.125 1.49997C5.36129 1.49997 1.5 4.91897 1.5 9.13675C1.5 13.3545 5.48622 16.25 10.25 16.25V17.6487C10.25 18.0919 10.7095 18.3771 11.0992 18.1659C12.3166 17.5062 14.5725 16.183 16.0393 14.7137ZM5.93527 8.10679C6.61608 8.10679 7.16797 8.65471 7.16797 9.32962C7.16797 10.0059 6.61608 10.5538 5.93527 10.5538C5.2556 10.5538 4.70368 10.0059 4.70368 9.32962C4.70368 8.65471 5.2556 8.10679 5.93527 8.10679ZM11.3572 9.32962C11.3572 8.65471 10.8055 8.10679 10.125 8.10679C9.44459 8.10679 8.89289 8.65471 8.89289 9.32962C8.89292 10.0059 9.44462 10.5538 10.125 10.5538C10.8055 10.5538 11.3572 10.0059 11.3572 9.32962ZM14.3146 8.10679C14.9953 8.10679 15.5464 8.65471 15.5464 9.32962C15.5464 10.0059 14.9953 10.5538 14.3146 10.5538C13.6339 10.5538 13.082 10.0059 13.0821 9.32962C13.0821 8.65471 13.6339 8.10679 14.3146 8.10679Z"></path><path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M10.25 16.2499C10.25 16.2499 15.0278 15.8807 17.025 13.3234C15.0278 16.1364 13.0307 17.6708 11.2831 18.1822C9.53561 18.6937 10.25 16.2499 10.25 16.2499Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                                <strong className={cx('strong-text')}>
                                                    {video.comments_count}
                                                </strong>
                                            </div>
                                        </Button>
                                    </div>

                                    <div className={cx('actions-item')}>
                                        <div className={cx('share-item')}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#161823" fillOpacity="0.75"></path><path fillRule="evenodd" clipRule="evenodd" d="M12.313 7.96568C12.3665 7.65966 12.658 7.45498 12.964 7.50851C13.27 7.56203 13.4747 7.8535 13.4211 8.15951L12.0506 15.9952C11.997 16.3012 11.7056 16.5059 11.3996 16.4523C11.0936 16.3988 10.8889 16.1073 10.9424 15.8013L12.313 7.96568ZM16.2402 8.77448C15.96 8.48453 15.5058 8.48453 15.2256 8.77448C14.9454 9.06443 14.9454 9.53454 15.2256 9.82449L17.454 12.1307L15.2262 14.4364C14.946 14.7263 14.946 15.1964 15.2262 15.4864C15.5063 15.7763 15.9606 15.7763 16.2407 15.4864L19.4551 12.1598C19.4704 12.1439 19.4704 12.1182 19.4551 12.1023L19.2233 11.8623L19.2201 11.8586L19.2158 11.854L16.2402 8.77448ZM8.88972 15.4867C8.59977 15.7766 8.12966 15.7766 7.83971 15.4867L5.4207 13.0677L4.76017 12.4071L4.51191 12.1589C4.49603 12.143 4.49603 12.1173 4.51191 12.1014L7.83853 8.77477C8.12848 8.48482 8.59859 8.48482 8.88854 8.77477C9.17849 9.06472 9.17849 9.53482 8.88854 9.82478L6.58318 12.1301L8.88972 14.4367C9.17967 14.7266 9.17967 15.1967 8.88972 15.4867Z" fill="white"></path></svg>
                                        </div>
                                        <div className={cx('share-item')}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#FE2C55"></path><path fillRule="evenodd" clipRule="evenodd" d="M18.7913 7.1875C18.6796 6.99413 18.4733 6.875 18.25 6.875H5.75001C5.50258 6.875 5.27845 7.02097 5.17839 7.24727C5.07834 7.47356 5.1212 7.73758 5.28771 7.9206L8.55021 11.5065C8.72305 11.6965 8.9945 11.7614 9.23456 11.6702L13.7656 9.94799C13.8184 9.92795 13.8423 9.93624 13.8527 9.94039C13.871 9.94765 13.8971 9.96649 13.9177 10.0013C13.9382 10.0361 13.9421 10.0681 13.9396 10.0876C13.9382 10.0987 13.9339 10.1237 13.8909 10.1602L10.1707 13.3155C9.97902 13.4782 9.90339 13.7398 9.97878 13.9796L11.4038 18.5124C11.4781 18.749 11.6853 18.9192 11.9317 18.9463C12.1781 18.9734 12.4173 18.8522 12.5413 18.6375L18.7913 7.81251C18.9029 7.61913 18.9029 7.38088 18.7913 7.1875Z" fill="white"></path></svg>
                                        </div>
                                        <div className={cx('share-item')}>
                                            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z" fill="white"></path><path d="M24 1C11.2964 1 1 11.2964 1 24C1 35.4775 9.40298 44.9804 20.3846 46.7205L20.3936 30.6629H14.5151V24.009H20.3936C20.3936 24.009 20.3665 20.2223 20.3936 18.5363C20.4206 16.8503 20.7542 15.2274 21.6288 13.7487C22.9722 11.4586 25.0639 10.3407 27.6335 10.0251C29.7432 9.76362 31.826 10.0521 33.9087 10.3407C34.0529 10.3587 34.125 10.3767 34.2693 10.4038C34.2693 10.4038 34.2783 10.6472 34.2693 10.8005C34.2603 12.4053 34.2693 16.0839 34.2693 16.0839C33.2685 16.0659 31.6096 15.9667 30.5096 16.138C28.6884 16.4175 27.6425 17.5806 27.6064 19.4108C27.5704 20.8354 27.5884 24.009 27.5884 24.009H33.9988L32.962 30.6629H27.5974V46.7205C38.597 44.9984 47.009 35.4775 47.009 24C47 11.2964 36.7036 1 24 1Z" fill="#0075FA"></path></svg>
                                        </div>
                                        <div className={cx('share-item')}>
                                            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z" fill="#25D366"></path><path fillRule="evenodd" clipRule="evenodd" d="M30.9028 25.6129C30.5802 25.4515 28.9944 24.6713 28.6988 24.5635C28.4031 24.4559 28.1881 24.4021 27.9731 24.7249C27.758 25.0478 27.1399 25.7744 26.9517 25.9897C26.7636 26.2049 26.5754 26.2319 26.2529 26.0704C25.9303 25.909 24.891 25.5684 23.659 24.4694C22.7002 23.6141 22.0528 22.5579 21.8647 22.235C21.6765 21.9121 21.8446 21.7375 22.0061 21.5767C22.1512 21.4321 22.3287 21.2 22.4899 21.0116C22.6512 20.8233 22.705 20.6887 22.8125 20.4735C22.92 20.2582 22.8663 20.0699 22.7855 19.9085C22.7049 19.747 22.0599 18.1593 21.7911 17.5134C21.5293 16.8845 21.2634 16.9697 21.0654 16.9598C20.8774 16.9504 20.6622 16.9484 20.4472 16.9484C20.2322 16.9484 19.8827 17.0291 19.587 17.352C19.2914 17.6749 18.4581 18.4553 18.4581 20.0428C18.4581 21.6306 19.6139 23.1643 19.7752 23.3795C19.9365 23.5949 22.0496 26.8528 25.2853 28.2499C26.0548 28.5823 26.6557 28.7807 27.1241 28.9293C27.8968 29.1749 28.5999 29.1402 29.1557 29.0572C29.7754 28.9646 31.064 28.277 31.3328 27.5235C31.6016 26.7699 31.6016 26.1242 31.521 25.9897C31.4404 25.8551 31.2253 25.7744 30.9028 25.6129ZM25.0178 33.6472H25.0134C23.0881 33.6465 21.1998 33.1292 19.5524 32.1517L19.1606 31.9191L15.0998 32.9844L16.1837 29.0251L15.9286 28.6191C14.8546 26.9109 14.2873 24.9365 14.2881 22.9091C14.2905 16.9934 19.1037 12.1805 25.022 12.1805C27.8879 12.1815 30.5817 13.299 32.6076 15.3271C34.6333 17.3551 35.7482 20.0509 35.7471 22.9178C35.7447 28.8339 30.9315 33.6472 25.0178 33.6472ZM34.1489 13.7858C31.7117 11.3458 28.4706 10.0014 25.0173 10C17.902 10 12.111 15.7906 12.1082 22.908C12.1073 25.1832 12.7017 27.4039 13.8313 29.3617L12 36.0509L18.8432 34.2559C20.7287 35.2843 22.8516 35.8264 25.0121 35.827H25.0174H25.0174C32.132 35.827 37.9234 30.0359 37.9263 22.9184C37.9276 19.4691 36.5861 16.2258 34.1489 13.7858Z" fill="white"></path></svg>
                                        </div>
                                        <div className={cx('share-item')}>
                                            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M24.0002 47.001C36.7028 47.001 47.0002 36.7035 47.0002 24.001C47.0002 11.2984 36.7028 1.00098 24.0002 1.00098C11.2977 1.00098 1.00024 11.2984 1.00024 24.001C1.00024 36.7035 11.2977 47.001 24.0002 47.001Z" fill="#1DA1F2"></path><path fillRule="evenodd" clipRule="evenodd" d="M38.2029 13.5327C37.3894 14.0824 35.5215 14.8813 34.6003 14.8813V14.8829C33.5484 13.7237 32.0675 13 30.4252 13C27.2353 13 24.6488 15.7287 24.6488 19.0925C24.6488 19.5598 24.7001 20.0157 24.795 20.4529H24.794C20.4671 20.3331 15.7348 18.0452 12.886 14.1294C11.1344 17.3277 12.6501 20.8848 14.6378 22.1809C13.9574 22.235 12.7049 22.0982 12.1153 21.4913C12.0758 23.6142 13.0434 26.4269 16.5714 27.4473C15.8919 27.8329 14.6892 27.7223 14.1662 27.6402C14.3497 29.4322 16.7285 31.775 19.3297 31.775C18.4026 32.9063 14.9144 34.9582 11 34.3054C13.6584 36.0118 16.7568 37 20.0362 37C29.3556 37 36.5929 29.0322 36.2034 19.2027C36.2019 19.1919 36.2019 19.1811 36.2009 19.1693C36.2019 19.144 36.2034 19.1187 36.2034 19.0925C36.2034 19.0619 36.2009 19.0331 36.2 19.0035C37.0484 18.3914 38.1868 17.3087 39 15.8836C38.5284 16.1577 37.1134 16.7064 35.7968 16.8426C36.6418 16.3615 37.8937 14.7858 38.2029 13.5327Z" fill="white"></path></svg>
                                        </div>
                                        <div className={cx('share-item')}>
                                            <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M26.4588 3.90871C25.3403 2.86068 23.4902 3.64074 23.4902 5.16041V13.0502C20.4499 14.1752 11.3194 18.1407 6.6047 26.6176C-1.49677 42.1311 3.82522 43.478 5.77105 39.7411C13.2467 29.1857 20.8146 30.4298 23.4902 31.3209V38.2274C23.4902 39.7114 25.2658 40.5055 26.4023 39.5298L43.3681 24.9655C44.9268 23.6274 44.9791 21.2608 43.4811 19.8573L26.4588 3.90871Z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('share-container')}>
                                    <p className={cx('copy-link-text')}>
                                        {`https://prox-tiktok.vercel.app/video/${video._id}?share=true`}
                                    </p>
                                    <Button onClick={copyVideoHref} className={cx('copy-btn')}>
                                        Sao chép liên kết
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('comment-list-container')}>
                            {
                                Object.keys(comment).length !== 0 && comment.map((item, index) => (
                                    <div className={cx('comment-item-wrapper')}>
                                        <Button key={index + 1} onClick={() => handleDeleteComment(item.id, item.comment)} className={cx('delete-btn')}>
                                            Xoá
                                        </Button>
                                        <CommentItem key={index} data={item} />
                                    </div>
                                ))
                            }
                        </div>

                        <div className={cx('bottom-comment-container')}>
                            <div className={cx('comment-container')}>
                                {
                                    (currentUser && (
                                        <>
                                            <div className={cx('layout-container')}>
                                                <div className={cx('input-area-container')}>
                                                    <input
                                                        ref={commentRef}
                                                        value={commentContent}
                                                        onChange={e => setCommentContent(e.target.value)}
                                                        type="text" placeholder="Thêm bình luận..."
                                                        className={cx('input-area')} />
                                                </div>
                                            </div>

                                            <Button onClick={() => commentVideo(video.id)} className={commentContent.length > 0 ? cx('post-comment-btn') : cx('post-comment-btn-disabled')}>
                                                Đăng
                                            </Button>
                                        </>
                                    )) || (
                                        <>
                                            <p className={cx('warning-title')}>Bạn cần
                                                <Link to="/login" state={{ modal: location }} className={cx('login-link')}> đăng nhập </Link>
                                                để bình luận !</p>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </div>
            )
        }

    </>);
}

export default memo(Videos);