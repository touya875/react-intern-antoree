import { Col, Empty, Row } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { useCurrentApp } from '@/components/context/app.context';
import 'styles/favorite.scss';
import { isMobile } from 'react-device-detect';

interface IProps {
    setCurrentStep: (v: number) => void;
}

const FavoriteDetail = (props: IProps) => {
    const { carts, setCarts } = useCurrentApp();

    const handleRemoveBook = (_id: string) => {
        const cartStorage = localStorage.getItem("carts");
        if (cartStorage) {
            //update
            const carts = JSON.parse(cartStorage) as ICart[];
            const newCarts = carts.filter(item => item._id !== _id)
            localStorage.setItem("carts", JSON.stringify(newCarts));
            //sync React Context
            setCarts(newCarts);
        }
    }

    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto', overflow: "hidden" }}>
                <Row gutter={[20, 20]}>
                    <Col md={24} xs={24}>
                        {carts?.map((item, index) => {
                            const currentBookPrice = item?.detail?.price ?? 0;
                            return (
                                <div className='order-book' key={`index-${index}`}
                                    style={isMobile ? { flexDirection: 'column' } : {}}
                                >
                                    {!isMobile ?
                                        <div className='book-content'>
                                            <div className='image'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.thumbnail}`} />
                                            </div>
                                            <div className='title'>
                                                {item?.detail?.mainText}
                                            </div>
                                            <div className='price'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice)}
                                            </div>
                                            <div className='action'>
                                                <DeleteTwoTone
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleRemoveBook(item._id)}
                                                    twoToneColor="#eb2f96"
                                                />
                                            </div>
                                        </div>
                                        :
                                        <>
                                            <div>{item?.detail?.mainText}</div>
                                            <div className='book-content ' style={{ width: "100%" }}>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.thumbnail}`} />
                                                <div className='action' >
                                                    <DeleteTwoTone
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleRemoveBook(item._id)}
                                                        twoToneColor="#eb2f96"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>

                            )
                        })}

                        {carts.length === 0 &&
                            <Empty
                                description="Hãy lựa chọn sản phẩm yêu thích"
                            />
                        }
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default FavoriteDetail;