import styles from './Home.module.scss';
import classNames from "classnames/bind";
import VideoItem from '~/components/VideoItem';
import { useState, useEffect } from 'react'

let cx = classNames.bind(styles);

function Home() {

    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=${encodeURIComponent(page)}`)
            .then((res) => res.json())
            .then((res) => {
                setVideoList(res.data);
            })
            .catch(() => {
                setVideoList([]);
            });
    }, [page]);

    return <div className={cx('wrapper')}>
        {
            videoList.map((video) => {
                return <VideoItem key={video.id} data={video} />
            })

        }
    </div>;
}

export default Home;