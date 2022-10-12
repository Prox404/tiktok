import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { BsCheckCircleFill } from "react-icons/bs";

const cx = classNames.bind(styles);

function AccountItem(...props) {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src={props[0].avatar}
                alt="Avatar"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{props[0].name}</span>
                    <BsCheckCircleFill className={cx('check')} />
                </h4>
                <span className={cx('username')}>{props[0].username}</span>
            </div>
        </div>
    );
}

export default AccountItem;