import { forwardRef, useState } from "react";
import classNames from "classnames";
import images from "~/assets/images";
import styles from "./Image.module.scss";

const Image = forwardRef(({ src, alt, className, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleFallback = () => {
        setFallback(images.defaultAvatar);
    }

    return <img className={classNames(styles.wrapper, className)} src={fallback || src} alt={alt} {...props} ref={ref} onError={handleFallback} />;
});

export default Image;