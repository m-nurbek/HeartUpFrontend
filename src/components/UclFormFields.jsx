import { Form, Input, InputNumber } from 'antd';


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 12,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 12,
        },
    },
};

export default function UclFormFields({ onValuesChange = () => { }}) {
    return (
        <div style={{minWidth:'700px'}}>
            <Form {...formItemLayout} variant="filled"
                onValuesChange={onValuesChange}
            >
                <Form.Item
                    label="Survival"
                    name="survival"
                    style={{width: '500px'}}
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
                    style={{width: '500px'}}
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
                    style={{width: '500px'}}
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
                    style={{width: '500px'}}
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
                    style={{width: '500px'}}
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
                    style={{width: '500px'}}
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
                    style={{width: '500px'}}
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
                    style={{width: '500px'}}
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
                    style={{width: '500px'}}
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
        </div>
    );
}