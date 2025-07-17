import { Breadcrumb } from 'antd';
import { useState } from "react";
import FavoriteDetail from "@/components/client/favorite";
import 'styles/favorite.scss';
import { Link } from 'react-router-dom';

const FavoritePage = () => {

    const [currentStep, setCurrentStep] = useState<number>(0);

    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: <Link to={"/"}>Trang Chủ</Link>,
                        },

                        {
                            title: 'Sản phẩm yêu thích',
                        },
                    ]}
                />

                {currentStep === 0 &&
                    <FavoriteDetail setCurrentStep={setCurrentStep} />
                }

            </div>
        </div>
    )
}

export default FavoritePage;
