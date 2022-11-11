import classNames from 'classnames/bind';
import { useState } from 'react';
import images from '~/assets/images';

import Button from '~/components/Button';
import styles from './Upload.module.scss'
import * as uploadVideoServices from '~/services/uploadVideoServices';
import Image from '~/components/Image';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

let cx = classNames.bind(styles);

function Upload() {

    const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
    const navigate = useNavigate();

    useEffect(() => {
        currentUser ? console.log(currentUser) : navigate('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const [file, setFile] = useState();
    const [description, setDescription] = useState('');
    const [music, setMusic] = useState('');
    const [thumbnail, setThumbnail] = useState('1');
    const [viewable, setViewable] = useState('public');
    const [allows, setAllows] = useState([])


    const handleAllowsChange = (e) => {
        const { value } = e.target;
        if (allows.includes(value)) {
            setAllows(allows.filter((allow) => allow !== value));
        } else {
            setAllows([...allows, value]);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        description === '' && setDescription(file.name);
        console.log(file);
        setFile(file);

    }

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('upload_file', file);
        formData.append('thumbnail_time', thumbnail);
        formData.append('music', music);
        formData.append('viewable', viewable);
        // eslint-disable-next-line array-callback-return
        allows.map((allow) => {
            formData.append('allows[]', allow);
        });


        console.log(description, file, thumbnail, viewable, allows);
        // console.log(formData);
        uploadVideoServices.upload(formData);
    }

    return (
        <div className={cx('upload-wrapper')}>
            <div className={cx('upload-container')}>
                <span className={cx('upload-title')}>
                    Tải video lên
                </span>
                <div className={cx('upload-sub-title')}>
                    <span>
                        Đăng video vào tài khoản của bạn
                    </span>
                </div>
                <div className={cx('upload-content')}>
                    <div className={cx('upload-content-left')}>
                        <label htmlFor="video">

                            {
                                (file && (
                                    <>
                                        <div className={cx('phone-frame')}>
                                            <video className={cx('phone-frame-video')} src={file.preview} autoPlay loop muted />
                                            <div className={cx('phone-background')}>.</div>
                                            <Image className={cx('phone-frame-img')} src={images.phoneframe} />
                                            <div className={cx('phone-frame-disk')}>
                                                <Image className={cx('phone-frame-disk-img')} src={currentUser.avatar} />
                                                <div className={cx('phone-frame-disk-wrapper')}>
                                                </div>
                                            </div>
                                            <div className={cx('phone-frame-music-symbols')}>
                                                <div className={cx('music-symbol-item-3')}></div>
                                                <div className={cx('music-symbol-item-2')}></div>
                                                <div className={cx('music-symbol-item-1')}></div>
                                            </div>

                                            <div className={cx('phone-frame-title')}>
                                                <span className={cx('phone-frame-title-text')}>Đang Follow</span>
                                                <span>Dành cho bạn</span>
                                            </div>
                                            <div className={cx('user-avatar')}>
                                                <Image className={cx('user-avatar-img')} src={currentUser.avatar} />
                                            </div>
                                            <div className={cx('icon-bar-wrapper')}>
                                                <svg width="29" height="125" viewBox="0 0 29 125" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0)">
                                                        <g filter="url(#filter0_d)">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.70313 3.58264C13.2031 3.58264 14.9531 5.91597 14.9531 5.91597C14.9531 5.91597 16.7031 3.58264 20.2031 3.58264C24.2865 3.58264 27.2031 6.79096 27.2031 10.8743C27.2031 15.541 23.3894 19.701 19.9115 22.8326C17.7643 24.7661 16.1198 26.041 14.9531 26.041C13.7865 26.041 12.0954 24.7564 9.99479 22.8326C6.57586 19.7016 2.70312 15.541 2.70312 10.8743C2.70312 6.79096 5.61979 3.58264 9.70313 3.58264Z" fill="white" fill-opacity="0.9" />
                                                        </g>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.75586 15.1911C5.14098 18.1039 7.67277 20.7058 9.99516 22.8327C12.0958 24.7564 13.7868 26.041 14.9535 26.041C16.1202 26.041 17.7646 24.7661 19.9118 22.8327C23.3898 19.701 27.2035 15.541 27.2035 10.8743C27.2035 10.7723 27.2017 10.6708 27.1981 10.5698C24.9488 16.8964 16.912 22.541 14.6618 22.541C12.985 22.541 7.49978 19.4065 3.75586 15.1911Z" fill="black" fill-opacity="0.03" />
                                                    </g>
                                                    <g clip-path="url(#clip1)">
                                                        <g opacity="0.9" filter="url(#filter1_d)">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M23.4081 69.5568C25.8031 67.1576 27.2031 64.6587 27.2031 61.7489C27.2031 55.8442 21.7974 51.0576 15.1281 51.0576C8.45893 51.0576 3.05313 55.8442 3.05313 61.7491C3.05313 67.654 8.63383 71.7076 15.3031 71.7076V72.7067C15.3031 73.7703 16.4073 74.4494 17.3318 73.9235C19.103 72.916 21.6572 71.3107 23.4081 69.5568ZM9.2625 60.3072C10.2156 60.3072 10.9883 61.0743 10.9883 62.0191C10.9883 62.9659 10.2156 63.7329 9.2625 63.7329C8.31097 63.7329 7.53828 62.9659 7.53828 62.0191C7.53828 61.0743 8.31097 60.3072 9.2625 60.3072ZM16.8516 62.0192C16.8516 61.0743 16.0792 60.3072 15.1265 60.3072C14.1739 60.3072 13.4016 61.0743 13.4016 62.0192C13.4016 62.9659 14.174 63.733 15.1265 63.733C16.0792 63.733 16.8516 62.9659 16.8516 62.0192ZM20.9933 60.3072C21.9462 60.3072 22.7178 61.0743 22.7178 62.0191C22.7178 62.9659 21.9463 63.7329 20.9933 63.7329C20.0403 63.7329 19.2677 62.9659 19.2678 62.0191C19.2678 61.0743 20.0403 60.3072 20.9933 60.3072Z" fill="white" />
                                                        </g>
                                                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M15.3039 71.7077C15.3039 71.7077 21.9929 71.1908 24.7889 67.6106C21.9929 71.5488 19.1969 73.6969 16.7503 74.413C14.3038 75.129 15.3039 71.7077 15.3039 71.7077Z" fill="url(#paint0_linear)" />
                                                    </g>
                                                    <g opacity="0.9" filter="url(#filter2_d)">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M16.0023 104.371C16.0023 103.105 17.5186 102.455 18.4354 103.328L24.6069 109.205C25.8347 110.375 25.7918 112.346 24.5143 113.461L18.3891 118.806C17.4576 119.618 16.0023 118.957 16.0023 117.721V115.833C16.0023 115.833 7.29294 114.264 4.49919 119.392C4.23872 119.87 3.22345 120.038 3.42982 117.652C4.29282 113.262 6.05654 106.408 16.0023 106.408V104.371Z" fill="white" />
                                                    </g>
                                                    <path opacity="0.03" fillRule="evenodd" clipRule="evenodd" d="M22.006 106.758L23.2741 109.294C23.7638 110.273 23.5285 111.46 22.7023 112.178L16.056 117.958C16.056 117.958 15.706 119.708 16.756 119.708C17.806 119.708 26.206 112.008 26.206 112.008C26.206 112.008 26.556 110.958 25.506 109.908C24.456 108.858 22.006 106.758 22.006 106.758Z" fill="#161823" />
                                                    <path opacity="0.09" fillRule="evenodd" clipRule="evenodd" d="M16.0023 106.78V115.88C16.0023 115.88 7.66747 114.706 5.05705 118.68C2.54526 122.505 2.77595 114.361 6.55728 110.306C10.3386 106.251 16.0023 106.78 16.0023 106.78Z" fill="url(#paint1_radial)" />
                                                    <defs>
                                                        <filter id="filter0_d" x="0.303125" y="2.38264" width="29.3" height="27.2583" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                            <feOffset dy="1.2" />
                                                            <feGaussianBlur stdDeviation="1.2" />
                                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                                        </filter>
                                                        <filter id="filter1_d" x="0.652734" y="49.8576" width="28.95" height="27.8477" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                            <feOffset dy="1.2" />
                                                            <feGaussianBlur stdDeviation="1.2" />
                                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                                        </filter>
                                                        <filter id="filter2_d" x="1.00234" y="101.728" width="26.8984" height="21.556" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                            <feOffset dy="1.2" />
                                                            <feGaussianBlur stdDeviation="1.2" />
                                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                                        </filter>
                                                        <linearGradient id="paint0_linear" x1="12.8599" y1="70.9318" x2="13.9669" y2="74.4106" gradientUnits="userSpaceOnUse">
                                                            <stop />
                                                            <stop offset="1" stopOpacity="0.01" />
                                                        </linearGradient>
                                                        <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.3082 121.776) rotate(-113.046) scale(11.1391 10.9498)">
                                                            <stop />
                                                            <stop offset="0.995496" stopOpacity="0.01" />
                                                            <stop offset="1" stopOpacity="0.01" />
                                                        </radialGradient>
                                                        <clipPath id="clip0">
                                                            <rect width="28" height="28" fill="white" transform="translate(0.953125 0.957642)" />
                                                        </clipPath>
                                                        <clipPath id="clip1">
                                                            <rect width="28" height="28" fill="white" transform="translate(0.953125 48.9576)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </div>
                                            <div className={cx('phone-frame-information')}>
                                                <div className={cx('phone-frame-information-name')}>
                                                    {`@${currentUser.nickname}`}
                                                </div>
                                                <div className={cx('phone-frame-information-description')}>
                                                    {description}
                                                </div>
                                                <div className={cx('phone-frame-information-music')}>
                                                    <div className={cx('sound-icon')}>
                                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.6195 4.54371C12.6195 4.32979 12.4208 4.17124 12.2123 4.21868L6.88287 5.43055C6.73112 5.46506 6.62344 5.59997 6.62344 5.75559V13.6232H6.62311C6.63194 14.3456 5.88686 15.0971 4.82345 15.382C3.63644 15.7001 2.50229 15.3164 2.29025 14.5251C2.07821 13.7338 2.86858 12.8344 4.05559 12.5163C4.48814 12.4004 4.91366 12.3777 5.29011 12.434V5.75559C5.29011 4.9775 5.8285 4.30294 6.58722 4.13041L11.9166 2.91853C12.9596 2.68136 13.9528 3.4741 13.9528 4.54371V11.9972C13.9808 12.7277 13.2305 13.4944 12.1539 13.7829C10.9668 14.101 9.83269 13.7173 9.62066 12.926C9.40862 12.1346 10.199 11.2353 11.386 10.9172C11.8182 10.8014 12.2433 10.7786 12.6195 10.8347V4.54371Z" fill="white" />
                                                        </svg>
                                                    </div>
                                                    <div className={cx('sound-name')}>
                                                        <p className={cx('sound-name-p')}>
                                                            {music ? music : 'Chưa có nhạc nền'}
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </>
                                )) || (
                                    <>
                                        <div className={cx('upload-state')}>
                                            <svg className={cx('upload-svg')} xmlns="http://www.w3.org/2000/svg" width="40" height="29" viewBox="0 0 40 29" fill="currentColor">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M21.5001 29H30.5C35.7467 29 40 24.7467 40 19.5C40 14.7115 36.4571 10.7504 31.8497 10.0951C30.937 4.37297 25.9792 0 20 0C13.3726 0 8 5.37258 8 12L8.00001 12.0145C3.53831 12.2733 0 15.9734 0 20.5C0 25.1944 3.80558 29 8.5 29H18.5001V17.1213L15.9143 19.7071C15.7191 19.9024 15.4025 19.9024 15.2072 19.7071L13.793 18.2929C13.5977 18.0976 13.5977 17.781 13.793 17.5858L18.9395 12.4393C19.5252 11.8536 20.475 11.8536 21.0608 12.4393L26.2072 17.5858C26.4025 17.781 26.4025 18.0976 26.2072 18.2929L24.793 19.7071C24.5977 19.9024 24.2812 19.9024 24.0859 19.7071L21.5001 17.1213V29Z" fill="currentColor" fillOpacity="0.34" />
                                            </svg>
                                            <span className={cx('upload-state-title')}>
                                                Chọn video để tải lên
                                            </span>
                                            <span className={cx('upload-state-sub-title')}>
                                                Hoặc kéo và thả tập tin
                                            </span>
                                            <span className={cx('upload-state-notice')}>
                                                MP4 hoặc WebM
                                            </span>
                                            <span className={cx('upload-state-notice')}>
                                                Độ phân giải 720x1280 trở lên
                                            </span>
                                            <span className={cx('upload-state-notice')}>
                                                Tối đa 10 phút
                                            </span>
                                            <span className={cx('upload-state-notice')}>
                                                Nhỏ hơn 2 GB
                                            </span>

                                            <div className={cx('upload-btn')}>
                                                Chọn tập tin
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </label>
                        <input onChange={handleFileChange} id="video" type="file" accept="video/*" />
                    </div>
                    <div className={cx('upload-content-right')}>
                        <div className={cx('form-item')}>
                            <div className={cx('form-header')}>
                                <span className={cx('form-label')}>
                                    Mô tả
                                </span>
                                <span className={cx('form-count')}>
                                    {description ? description.length : 0}/150
                                </span>
                            </div>
                            <div className={cx('form-footer')}>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={cx('form-textarea')} placeholder="Mô tả video của bạn" />
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('form-header')}>
                                <span className={cx('form-label')}>
                                    Vị trí chụp thumbnail
                                </span>
                            </div>
                            <div className={cx('form-footer')}>
                                <input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className={cx('form-input')} type="text" placeholder="Vị trí chụp thumbnail, đơn vị giây" />
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('form-header')}>
                                <span className={cx('form-label')}>
                                    Nhạc nền
                                </span>
                            </div>
                            <div className={cx('form-footer')}>
                                <input value={music} onChange={(e) => setMusic(e.target.value)} className={cx('form-input')} type="text" placeholder="Nhạc nền" />
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('form-header')}>
                                <span className={cx('form-label')}>
                                    Ai có thể xem video này
                                </span>
                            </div>
                            <div className={cx('form-footer')}>
                                <select onChange={(e) => setViewable(e.target.value)} className={cx('form-select')}>
                                    <option value="public">Công khai</option>
                                    <option value="friends">Bạn bè</option>
                                    <option value="private">Chỉ mình tôi</option>
                                </select>
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('form-header')}>
                                <span className={cx('form-label')}>
                                    Cho phép người dùng
                                </span>
                            </div>
                            <div className={cx('form-footer')}>
                                <div className={cx('form-checkbox')}>
                                    <input className={cx('checkbox')} onChange={handleAllowsChange} value="comment" type="checkbox" name="allows" checked /> Comment
                                    <input className={cx('checkbox')} onChange={handleAllowsChange} value="duet" type="checkbox" name="allows" checked /> Duet
                                    <input className={cx('checkbox')} onChange={handleAllowsChange} value="stitch" type="checkbox" name="allows" checked /> Stitch
                                </div>
                            </div>
                        </div>
                        <div className={cx('button-container')}>
                            <Button outline>
                                Huỷ bỏ
                            </Button>
                            <Button onClick={handleUpload} primary>
                                Đăng
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;