import classNames from "classnames/bind";
import styles from "./BlankLayout.module.scss";

const cx = classNames.bind(styles);

function BlankLayout({ children, title, description }) {
    return <>
        <div className={cx('main-detail-wrapper')}>
            <div className={cx('error-container')}>
                {children}
                <p className={cx('error-title')}>{title}</p>
                <p className={cx('error-description')}>{description}</p>
            </div>
        </div>
    </>;
}

export default BlankLayout;