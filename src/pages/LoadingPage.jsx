import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function LoadingPage() {
    return (
        <>
            <div style={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center"
            }}>
                <Spin
                    indicator={
                        <LoadingOutlined
                            style={{
                                fontSize: 70,
                            }}
                            spin
                        />
                    }
                />
            </div>
        </>
    );
}