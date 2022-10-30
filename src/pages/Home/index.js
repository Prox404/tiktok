import styles from './Home.module.scss';
import VideoItem from '~/components/VideoItem';
import * as getVideoList from '~/services/getListVideoServices';

import classNames from "classnames/bind";
import { useState, useEffect } from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

let cx = classNames.bind(styles);

function Home() {

    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        console.log('render');
        const loadVideo = async () => {
            try {
                setLoading(true);
                const res = await getVideoList.getVideoList('for-you', page);
                // console.log(res.data.data);
                setVideoList(res);
                setError('');
            } catch (error) {
                setError('Error while loading data. Try again later.');
            } finally {
                setLoading(false);
            };
        }
        loadVideo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchMoreData = async () => {
        try {
            const res = await axios.get(`https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=${page}`);
            // console.log(res.data.data);
            setVideoList([...videoList, ...res.data.data]);
            res.data.data.length === 0 && setHasMore(false);
            setPage(prev => prev + 1);
            setError('');
        } catch (error) {
            setError('Error while loading data. Try again later.');
        } finally {
            setLoading(false);
        };
    };

    window.addEventListener('load', videoScroll);
    window.addEventListener('scroll', videoScroll);

    async function videoScroll() {

        if (document.querySelectorAll('video[autoplay]').length > 0) {
            var windowHeight = window.innerHeight,
                videoEl = document.querySelectorAll('video[autoplay]');

            for (var i = 0; i < videoEl.length; i++) {

                var thisVideoEl = videoEl[i],
                    videoHeight = thisVideoEl.clientHeight,
                    videoClientRect = thisVideoEl.getBoundingClientRect().top;

                if (videoClientRect <= ((windowHeight) - (videoHeight * .75)) && videoClientRect >= (0 - (videoHeight * .25))) {
                    thisVideoEl.play();
                } else {
                    thisVideoEl.pause();
                }

            }
        }

    }

    return <div className={cx('wrapper')}>
        <InfiniteScroll
            hasMore={hasMore}
            loadMore={fetchMoreData}
            loader={<div key={0} className={cx('loading-container')}>
                <svg className={cx('spinner')} width="25" height="25" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M24 12.5C17.6487 12.5 12.5 17.6487 12.5 24C12.5 30.3513 17.6487 35.5 24 35.5C26.8172 35.5 29.3919 34.4902 31.3919 32.8101C32.4491 31.9219 34.026 32.059 34.9142 33.1161C35.8023 34.1733 35.6653 35.7503 34.6081 36.6384C31.741 39.0471 28.0369 40.5 24 40.5C14.8873 40.5 7.5 33.1127 7.5 24C7.5 14.8873 14.8873 7.5 24 7.5C33.1127 7.5 40.5 14.8873 40.5 24C40.5 25.3807 39.3807 26.5 38 26.5C36.6193 26.5 35.5 25.3807 35.5 24C35.5 17.6487 30.3513 12.5 24 12.5Z"></path></svg>
            </div>}
        >

            {
                videoList.map((video, index) => {
                    return (
                        <div key={index}><VideoItem data={video} /></div>
                    )
                })

            }
        </InfiniteScroll>
        {
            (loading && (
                <div className={cx('loading-container')}>
                    <svg className={cx('spinner')} width="25" height="25" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M24 12.5C17.6487 12.5 12.5 17.6487 12.5 24C12.5 30.3513 17.6487 35.5 24 35.5C26.8172 35.5 29.3919 34.4902 31.3919 32.8101C32.4491 31.9219 34.026 32.059 34.9142 33.1161C35.8023 34.1733 35.6653 35.7503 34.6081 36.6384C31.741 39.0471 28.0369 40.5 24 40.5C14.8873 40.5 7.5 33.1127 7.5 24C7.5 14.8873 14.8873 7.5 24 7.5C33.1127 7.5 40.5 14.8873 40.5 24C40.5 25.3807 39.3807 26.5 38 26.5C36.6193 26.5 35.5 25.3807 35.5 24C35.5 17.6487 30.3513 12.5 24 12.5Z"></path></svg>
                </div>
            )) || (error && (
                <div className={cx('error-container')}>
                    <p>{error}</p>
                </div>
            ))
        }
    </div>
}

export default Home;