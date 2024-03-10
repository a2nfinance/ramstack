import { useAppSelector } from "@/controller/hooks";
import { calculateOptionPrice } from "@/core/price_simulation";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, InputNumber, Row, Select, message } from "antd";
import { useState } from "react";

export const OptionPricePrediction = () => {
    const [optionPrice, setOptionPrice] = useState(0);
    const { paths } = useAppSelector(state => state.simulation);
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (values: { call_or_put: "call" | "put", strike_price: number }) => {
        let calculatedOptionPrice = calculateOptionPrice(values);
        setOptionPrice(calculatedOptionPrice)
    }
    return (
        <Card title={"Option price prediction"}>
             {contextHolder}
            <Form
                onFinish={onFinish}
                initialValues={
                    {
                        call_or_put: "call",
                        strike_price: 1
                    }
                } layout="vertical">
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="Call or Put" name={"call_or_put"} rules={[{ required: true, message: 'Missing call or put' }]}>
                            <Select options={[
                                { label: "Call", value: "call" },
                                { label: "Put", value: "put" }
                            ]} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Execution Price" name={"strike_price"} rules={[{ required: true, message: 'Missing execution price' }]}>
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                {
                    optionPrice !== 0 && <>
                        <Button icon={<CopyOutlined />}
                            onClick={() => { 
                                navigator.clipboard.writeText(optionPrice.toFixed(5));
                                messageApi.success("Copied address");
                            }}
                            block>
                            Predicted option price: {optionPrice.toFixed(5)}
                        </Button>
                        <Divider />
                    </>

                }

                <Form.Item>
                    <Button htmlType="submit" block type="primary" size="large" disabled={!paths.length}>Predict option price</Button>
                </Form.Item>

            </Form>
        </Card>
    )
}