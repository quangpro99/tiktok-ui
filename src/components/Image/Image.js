import { forwardRef, useState } from 'react';
import image from '~/assets/images';
import styles from './Image.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Image = forwardRef(
    (
        {
            src,
            alt,
            className,
            fallback: customFallback = image.noImage,
            ...props
        },
        ref,
    ) => {
        //Tạo nếu link ảnh lỗi src thì nhận fallback
        const [fallback, setFallback] = useState('');

        //Khi lỗi lấy ảnh ở image là noImage
        const handleError = () => {
            setFallback(customFallback);
        };
        //ref được forward ra ngoài
        return (
            <img
                //Vẫn có css chính nó là wrappẻr nếu muốn custom riêng thì có props className
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={fallback || src}
                alt={alt}
                {...props}
                onError={handleError}
            />
        );
    },
);

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
