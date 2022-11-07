import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { memo, useState } from 'react';

import * as likeCommentServices from '~/services/likeCommentServices';
import * as unLikeCommentServices from '~/services/unLikeCommentServices';

import styles from './CommentItem.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function CommentItem({ data }) {

    const [commentData, setCommentData] = useState(data);

    const handleLike = async () => {
        try {
            const res = await likeCommentServices.likeComment(data.id);
            setCommentData((commentData) => ({
                ...commentData,
                ...res,
            }));
            console.log(commentData);
        } catch (error) {
            console.log(error);
        };
    }

    const handleUnLike = async () => {
        try {
            const res = await unLikeCommentServices.unLikeComment(data.id);
            setCommentData((commentData) => ({
                ...commentData,
                ...res,
            }));
        } catch (error) {
            console.log(error);
        };
    }

    return commentData && (
        <div className={cx('wrapper')}>
            <div className={cx('comment-wrapper')}>
                <div className={cx('info-container')}>
                    <Link className={cx('avatar-container')} to={`/@${commentData.user.nickname}`}>
                        <div className={cx('avatar-wrapper')}>
                            <Image className={cx('avatar-img')} circle src={commentData.user.avatar} />
                        </div>
                    </Link>
                    <Link className={cx('user-container')} to={`/@${commentData.user.nickname}`}>
                        <span className={cx('user-nickname')}>{commentData.user.first_name + ' ' + commentData.user.last_name}</span>
                        <br />
                        <span className={cx('user-comment')}>
                            {commentData.comment}
                        </span>
                        <span className={cx('user-sub-content')}>
                            {commentData.updated_at}
                        </span>
                    </Link>
                    <div className={cx('like-container')}>

                        <div className={cx('like-wrapper')}>

                            {
                                (commentData.is_liked && (
                                    <Button onClick={handleUnLike} className={cx('like-btn')}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(254, 44, 85, 1)" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.5 2.25C10.5 2.25 12 4.25 12 4.25C12 4.25 13.5 2.25 16.5 2.25C20 2.25 22.5 4.99999 22.5 8.5C22.5 12.5 19.2311 16.0657 16.25 18.75C14.4095 20.4072 13 21.5 12 21.5C11 21.5 9.55051 20.3989 7.75 18.75C4.81949 16.0662 1.5 12.5 1.5 8.5C1.5 4.99999 4 2.25 7.5 2.25Z"></path></svg>
                                    </Button>)) || (
                                    <Button onClick={handleLike} className={cx('like-btn')}>
                                        <svg width="20" height="20" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"></path></svg>
                                    </Button>
                                )
                            }
                            <span>{commentData.likes_count}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(CommentItem);