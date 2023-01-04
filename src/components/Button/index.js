import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    large = false,
    small = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        //Chuyển hướng mở tab mới
        ...passProps,
    };

    //Khi có disabled thì không thực hiện thao tác bấm dc nữa, check sk on nếu có thì không
    //cho can thiệp
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof key == 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    //Khi nào primary được truyền add thêm primary vô classes
    const classes = cx('wrapper', {
        primary,
        outline,
        text,
        rounded,
        disabled,
        small,
        large,
        [className]: className,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

//node có thể render được tất trừ hàm còn số, mảng, object, ...
Button.prototype = {
    children: PropTypes.node,
};
export default Button;
