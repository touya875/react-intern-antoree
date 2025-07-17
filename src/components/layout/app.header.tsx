import { useState } from 'react';
import { FaReact } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa';
import { VscSearchFuzzy } from 'react-icons/vsc';
import { Divider, Badge, Popover, Empty } from 'antd';
import { useNavigate } from 'react-router';
import './app.header.scss';
import { useCurrentApp } from 'components/context/app.context';
import { isMobile } from 'react-device-detect';

interface IProps {
    searchTerm: string;
    setSearchTerm: (v: string) => void;
}

const AppHeader = (props: IProps) => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const {
        carts, setCarts
    } = useCurrentApp();

    const navigate = useNavigate();


    const contentPopover = () => {
        return (
            <div className='pop-cart-body'>
                <div className='pop-cart-content'>
                    {carts?.map((book, index) => {
                        return (
                            <div className='book' key={`book-${index}`}>
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} />
                                <div>{book?.detail?.mainText}</div>
                                <div className='price'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price ?? 0)}
                                </div>
                            </div>
                        )
                    })}
                </div>
                {carts.length > 0 ?
                    <div className='pop-cart-footer'>
                        <button onClick={() => navigate('/favorite')}>Xem sản phẩm yêu thích</button>
                    </div>
                    :
                    <Empty
                        description="Chưa có sản phẩm yêu thích"
                    />
                }
            </div>
        )
    }

    return (
        <>
            <div className='header-container'>
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={() => {
                            setOpenDrawer(true)
                        }}>☰</div>
                        <div className='page-header__logo'>
                            <span className='logo'>
                                <span onClick={() => navigate('/')}> <FaReact className='rotate icon-react' />React Intern</span>

                                <VscSearchFuzzy className='icon-search' />
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="Tìm sản phẩm"
                                value={props.searchTerm}
                                onChange={(e) => props.setSearchTerm(e.target.value)}
                            />
                        </div>

                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                {!isMobile
                                    ?
                                    <Popover
                                        className="popover-carts"
                                        placement="topRight"
                                        rootClassName="popover-carts"
                                        title={"Sản phẩm yêu thích"}
                                        content={contentPopover}
                                        arrow={true}>
                                        <Badge
                                            count={carts?.length ?? 0}
                                            size={"small"}
                                            showZero
                                        >
                                            <FaHeart className='icon-cart' />
                                        </Badge>
                                    </Popover>
                                    :
                                    <Badge
                                        count={carts?.length ?? 0}
                                        size={"small"}
                                        showZero
                                        onClick={() => navigate("/favorite")}
                                    >
                                        <FaHeart className='icon-cart' />
                                    </Badge>
                                }
                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                        </ul>
                    </nav>
                </header>
            </div>

        </>
    )
};

export default AppHeader;
