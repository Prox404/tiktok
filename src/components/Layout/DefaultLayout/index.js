import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from './DefaultLayout.module.scss';
import classNames from "classnames/bind";

function DefaultLayout({ children }) {
    const cx = classNames.bind(styles);
    return <div className={cx('wrapper')}>
        <Header />
        <div className={cx('container')}>
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <div className={cx('content')}>
                        {children}
                    </div>
                </div>
            </div>


        </div>
    </div>;
}

export default DefaultLayout;