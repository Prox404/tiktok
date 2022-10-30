import classNames from 'classnames/bind';
import { useState } from 'react';
import { AiOutlineCheck } from "react-icons/ai";

import Button from '~/components/Button';
import styles from './Upload.module.scss'
import * as uploadVideoServices from '~/services/uploadVideoServices';

let cx = classNames.bind(styles);

function Upload() {

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
        setFile(e.target.files[0]);
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
                            <div className={cx('upload-state')}>
                                {
                                    (file && (
                                        <>
                                            <AiOutlineCheck />
                                        </>
                                    )) || (
                                        <>
                                            <svg className={cx('upload-svg')} xmlns="http://www.w3.org/2000/svg" width="40" height="29" viewBox="0 0 40 29" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M21.5001 29H30.5C35.7467 29 40 24.7467 40 19.5C40 14.7115 36.4571 10.7504 31.8497 10.0951C30.937 4.37297 25.9792 0 20 0C13.3726 0 8 5.37258 8 12L8.00001 12.0145C3.53831 12.2733 0 15.9734 0 20.5C0 25.1944 3.80558 29 8.5 29H18.5001V17.1213L15.9143 19.7071C15.7191 19.9024 15.4025 19.9024 15.2072 19.7071L13.793 18.2929C13.5977 18.0976 13.5977 17.781 13.793 17.5858L18.9395 12.4393C19.5252 11.8536 20.475 11.8536 21.0608 12.4393L26.2072 17.5858C26.4025 17.781 26.4025 18.0976 26.2072 18.2929L24.793 19.7071C24.5977 19.9024 24.2812 19.9024 24.0859 19.7071L21.5001 17.1213V29Z" fill="#161823" fillOpacity="0.34" />
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
                                        </>
                                    )
                                }
                            </div>
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
                                    0/150
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
                                    <input onChange={handleAllowsChange} value="comment" type="checkbox" name="allows" /> Comment
                                    <input onChange={handleAllowsChange} value="duet" type="checkbox" name="allows" /> Duet
                                    <input onChange={handleAllowsChange} value="stitch" type="checkbox" name="allows" /> Stitch
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