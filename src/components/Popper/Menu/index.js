import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import MenuItem from './MenuItem';
import { useState } from 'react';

const cx = classNames.bind(styles);

//Bắt buộc phải có tránh undefine
const defaultFn = () => {};

function Menu({
    children,
    items = [],
    onChange = defaultFn,
    hideOnClick = false,
}) {
    //Mảng gồm dữ liệu mảng cấp 1 và mảng cấp 2
    const [histrory, setHistory] = useState([{ data: items }]);

    //Phần tử cuối mảng
    const current = histrory[histrory.length - 1];

    //Xét phần tử cuối mảng lấy ra data tức vẫn lấy ra mảng items
    const renderItems = () => {
        return current.data.map((item, index) => {
            //Lấy children(cấp 2) của item !! để convert sang boolen nếu k có sẽ trả về undefine
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            //push thêm để quay lại
                            setHistory((pre) => [...pre, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        //onHide xóa hết phần tử giữ lại phần tử đầu tiên
        <Tippy
            hideOnClick={hideOnClick}
            interactive
            delay={[0, 700]}
            // làm lệch
            offset={[12, 8]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {/* Nếu histrory >1 tức mảng đang có 2 p tử trở lên tức có cấp 2 ms có header */}
                        {histrory.length > 1 && (
                            <Header
                                title="Language"
                                //Back lại chỉ cần cắt đi phần tử cuối
                                onBack={() => {
                                    setHistory((pre) =>
                                        pre.slice(0, pre.length - 1),
                                    );
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
