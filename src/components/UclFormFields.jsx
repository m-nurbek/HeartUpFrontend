import { Form, Input, InputNumber } from 'antd';


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};

export default function UclFormFields({ onValuesChange = () => { }, className = "models_page__model__form" }) {
    return (
        <>
            <Form {...formItemLayout} variant="filled"
                style={{
                    maxWidth: '100%',
                }}
                onValuesChange={onValuesChange}
            >
                <Form.Item
                    label="Survival"
                    name="survival"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Age"
                    name="age"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Pericardial fusion"
                    name="pericardialfusion"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Fractional Shortening"
                    name="fractionalshortening"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="EPSS"
                    name="epss"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="LVDD"
                    name="lvdd"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Wall Motion Score"
                    name="wallmotion_score"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Wall Motion Index"
                    name="wallmotion_index"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Mult"
                    name="mult"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
            </Form >
        </>
    );
}