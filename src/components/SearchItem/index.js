import styles from "./SearchItem.module.scss";
import classNames from "classnames/bind";
import { BiSearch } from "react-icons/bi";

function SearchItem(...props) {
    let cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <BiSearch className={cx('search')} />
            <p className={cx('result')}>
                {props[0].result}
            </p>
        </div>
    );
}

export default SearchItem;