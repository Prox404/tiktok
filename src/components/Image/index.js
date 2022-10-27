import { forwardRef, useState } from "react";
import classNames from "classnames";
import images from "~/assets/images";
import styles from "./Image.module.scss";

const Image = forwardRef(({ src, alt, className, circle = false, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleFallback = () => {
        setFallback(images.defaultAvatar);
    }

    circle = circle ? styles.circle : '';

    return <img className={classNames(styles.wrapper, className, circle)} src={fallback || src} alt={alt} {...props} ref={ref} onError={handleFallback} />;
});

export default Image;