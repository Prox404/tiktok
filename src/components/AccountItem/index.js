import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Image from '../Image';
import clsx from 'clsx';

const cx = classNames.bind(styles);

function AccountItem({ data, notShowInformation = false }) {
    return (
        <>
            {(data && (
                <Link className={cx('wrapper')} to={`/@${data.nickname}`}>
                    <Image
                        className={cx('avatar')}
                        src={data.avatar}
                        alt="Avatar"
                    />


                    <div className={clsx(cx('info'), notShowInformation === true ? cx('hide') : cx(''))}>
                        <h4 className={cx('name')}>
                            <span>{data.nickname}</span>
                            {
                                (data.tick) && (
                                    <BsCheckCircleFill className={cx('check')} />
                                )
                            }
                        </h4>
                        <span className={cx('username')}>{data.nickname}</span>
                    </div>



                </Link>
            ))}
        </>
    );
}

export default AccountItem;