import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";

function Sidebar() {
    let cx = classNames.bind(styles);
    return (
        <aside className={cx('wrapper')}>
            <h2>Sidebar</h2>
        </aside>
    );
}

export default Sidebar;