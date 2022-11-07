import classNames from "classnames/bind";
import styles from "./VideoControls.module.scss"
import { FaPause, FaPlay, FaVolumeUp } from 'react-icons/fa';
import { useState, forwardRef } from "react";

const cx = classNames.bind(styles)

const VideoControls = ({ refVideo }) => {
    const [play, setPlay] = useState(true)

    const handlePlayVideo = () => {
        refVideo.current.play()
        setPlay(false)
    }

    return (
        <div className={cx('wrapper')}>
            {play &&
                <span onClick={() => {
                    handlePlayVideo()
                }
                } className={cx('play')}>
                    <FaPlay />
                </span>}

            {!play &&
                <span onClick={() => {
                    refVideo.current.pause()
                    setPlay(true)
                }} className={cx('pause')}>
                    <FaPause />
                </span>
            }

            <div className={cx('speaker')}>
                <span className={cx('icon')}>
                    <FaVolumeUp />
                </span>
                <div className={cx('volume')}>
                    <input onChange={(e) => {
                        refVideo.current.volume = e.target.value / 100
                    }
                    } type="range" min="0" max="100" step="1" orient="vertical" />

                </div>
            </div>
        </div>
    )
}

export default VideoControls