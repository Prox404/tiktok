import styles from './NotFound.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import Button from '~/components/Button';

let cx = classNames.bind(styles);

function NotFound() {
    return (<div className={cx('wrapper')}>
        <div className={cx('container')}>
            <p className={cx('title')}>
                <span>4</span>
                <span >
                    <Image className={cx('smile-face')} src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/site/static/webapp-static-site/bbad6f99219877ac47f9.png" alt="0" />
                </span>
                <span>4</span>
            </p>
            <p className={cx('subtitle')}>Couldn't find this page</p>
            <p className={cx('recommend-title')}>
                Check out more trending videos on TikTok
            </p>

            <Button to="/" primary className={cx('home-btn')}>
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path fillRule="evenodd" clipRule="evenodd" d="M12 8.78a3 3 0 014.56-2.57l25.07 15.23a3 3 0 010 5.12L16.56 41.8A3 3 0 0112 39.22V8.78z"></path></svg>
                Watch Now
            </Button>
        </div>
    </div>);
}

export default NotFound;