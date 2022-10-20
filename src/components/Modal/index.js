import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

let cx = classNames.bind(styles);
Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.5)';
Modal.defaultStyles.overlay.zIndex = 10000;

function CustomModal({ children, ...props }) {
    return <Modal className={cx('modal')} {...props}>
        <div className={cx('modal-content')}>
            {children}
        </div>
    </Modal>;
}

export default CustomModal;