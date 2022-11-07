import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

let cx = classNames.bind(styles);
Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.5)';
Modal.defaultStyles.overlay.zIndex = 10000;

function CustomModal({ children, fullScreen = false, ...props }) {
    return <Modal className={fullScreen ? cx('modal-full') : cx('modal')} {...props}>
        <div className={fullScreen ? cx('modal-content-full') : cx('modal-content')}>
            {children}
        </div>
    </Modal>;
}

export default CustomModal;