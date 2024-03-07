import { useAppSelector } from "@/controller/hooks";
import { whitelistedPairs } from "@/core/config";
import { getPricePaths } from "@/core/price_simulation";
import { Alert, Button, Card, Col, Divider, Form, Input, InputNumber, Row, Select } from "antd";

export const DataForm = () => {
    const { simulatePriceAction } = useAppSelector(state => state.process);
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        getPricePaths(values);
    };
    return (
        <Form
            form={form}
            name='simulation_settings'
            initialValues={{
                pair: whitelistedPairs[0].value,
                limit: 100,
                interval: 1,
                interval_type: "h",
                nsteps: 20,
                nrep: 10,
                t: 10
            }}
            onFinish={onFinish}
            layout='vertical'>
            <Card title="Historical price data">
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="Token pair" name="pair" rules={[{ required: true, message: 'Missing token pair' }]}>
                            <Select options={whitelistedPairs} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Limit"} name={"limit"} rules={[{ required: true, message: 'Missing limit' }]}>
                            <InputNumber style={{ width: "100%" }} min={1} max={1000} precision={0} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label={"Interval"} name={"interval"} rules={[{ required: true, message: 'Missing token pair' }]}>
                            <InputNumber style={{ width: "100%" }} min={1} precision={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Type"} name={"interval_type"} rules={[{ required: true, message: 'Missing token pair' }]}>
                            <Select options={[
                                {
                                    label: "Hour",
                                    value: "h"
                                },
                                {
                                    label: "Day",
                                    value: "d"
                                }
                            ]} />
                        </Form.Item>
                    </Col>
                </Row>

                <Alert message={"For example, if the limit number is 100, the interval is 1, and the type is hour, then the price data includes 100 price candles with an interval of 1 hour."} type="info" showIcon />


            </Card>
            <Divider />
            <Card title="Price simulation settings">
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="Num of paths" name={"nrep"} rules={[{ required: true, message: 'Missing price paths' }]}>
                            <Select options={(new Array(15).fill(0)).map((_, index) => {
                                return {
                                    label: index + 1,
                                    value: index + 1
                                }
                            })} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Num of steps" name={"nsteps"} rules={[{ required: true, message: 'Missing price steps' }]}>
                            <Select options={(new Array(10).fill(0)).map((_, index) => {
                                return {
                                    label: (index + 1) * 2,
                                    value: (index + 1) * 2
                                }
                            })} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label={"Time to maturity"} name={"t"} rules={[{ required: true, message: 'Missing time to maturity' }]}>
                    <InputNumber style={{ width: "100%" }} min={1} precision={0} />
                </Form.Item>

                <Alert message={"For example, if the number of paths is 10, the number of steps is 20, and the duration is 10 hours, then the price chart will display 10 possible price paths, each with 20 price points, all within a 10-hour period."}
                    type="info" showIcon />
            </Card>
            <Divider />
            <Form.Item>
                <Button loading={simulatePriceAction} size={"large"} type="primary" block htmlType="submit">Simulate price</Button>
            </Form.Item>
        </Form>
    )
}