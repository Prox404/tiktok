import classNames from "classnames/bind";
import styles from './Popper.module.scss';

function Wrapper({ children, className }) {
    const cx = classNames.bind(styles);
    return <div className={cx('wrapper', className)}>
        {children}
    </div>;
}

export default Wrapper;