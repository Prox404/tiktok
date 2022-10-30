import classNames from "classnames/bind";
import { useRef } from "react";
import { Link } from "react-router-dom";

import styles from './VideoListItem.module.scss';

let cx = classNames.bind(styles);

function VideoListItem({ videoUrl = '', videoId = 0, description = '', viewCount = 0, thumbnail = '' }) {

    const videoRef = useRef();

    const handlePlayVideo = () => {
        videoRef.current.play();
    }

    const handlePauseVideo = () => {
        videoRef.current.pause();
    }

    return (<>
        <div className={cx('video-list-item-container')}>
            <div className={cx('video-container')}>
                <div className={cx('video-container-div')}>
                    <div className={cx('video-wrapper')}>
                        <Link to={`video/${videoId}`}>
                            <div className={cx('player-container')}>
                                <div className={cx('player-header')}>
                                    <video
                                        className={cx('video-player')}
                                        ref={videoRef}
                                        src={videoUrl}
                                        poster={thumbnail}
                                        loop
                                        muted
                                        onMouseOver={handlePlayVideo}
                                        onMouseOut={handlePauseVideo} />

                                </div>
                                <div className={cx('player-footer')}>
                                    <svg className={cx('play-svg')} width="18" height="18" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"></path></svg>
                                    <strong className={cx('strong-view-count')}>
                                        {viewCount}
                                    </strong>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={cx('video-description')}>
                <p className={cx('video-description-text')}>
                    {description}
                </p>
            </div>

        </div>
    </>);
}

export default VideoListItem;