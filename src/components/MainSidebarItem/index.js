import classNames from "classnames/bind";
import styles from "./MainSidebarItem.module.scss";
import { Link } from 'react-router-dom';

function MainSidebarItem({
    active = false,
    className,
    icon,
    title,
    to,
    ...props }) {

    let cx = classNames.bind(styles);
    // console.log(props);

    const classes = cx('wrapper', {
        [className]: className,
        active
    });

    return (<>
        <div className={cx('sidebar-item', classes)}>
            <Link className={cx('main-bar-link')} to={to}>
                <div className={cx('main-bar-icon')}>
                    {icon}
                </div>
                <h2 className={cx('main-bar-text')}>
                    {title}
                </h2>
            </Link>
        </div>
    </>);
}

export default MainSidebarItem;