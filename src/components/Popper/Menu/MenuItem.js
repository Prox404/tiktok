import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Menu.module.scss';
import clsx from 'clsx';
import { ChangeEventHandler } from "react";

const cx = classNames.bind(styles);

const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
};

const storedTheme = localStorage.getItem("theme");

const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
    setDark();
}

const toggleTheme = (e) => {
    if (e.target.checked) {
        setDark();
    } else {
        setLight();
    }
};

function MenuItem({ data, onClick, onThemeChange = false }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
            {onThemeChange &&
                <div className={cx('toggle-theme-wrapper')}>
                    <label className={cx('toggle-theme')} htmlFor="checkbox">
                        <input
                            type="checkbox"
                            id="checkbox"
                            onChange={toggleTheme}
                            defaultChecked={defaultDark}
                        />
                        <div className={clsx(cx('slider'), cx('round'))}></div>
                    </label>
                </div>
            }
        </Button>
    );
}

export default MenuItem;