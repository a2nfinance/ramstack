import { useAppSelector } from "@/controller/hooks";
import { whitelistedPairs } from "@/core/config";
import { getPricePaths } from "@/core/price_simulation";
import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd";

export const DataForm = () => {
    const {simulatePriceAction} = useAppSelector(state => state.process);
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        getPricePaths(values);
    };
    return (
        <Card>
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
                <Card title="Historical data">
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item label="Token pair" name="pair" rules={[{ required: true, message: 'Missing token pair' }]}>
                                <Select options={whitelistedPairs} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={"Limit"} name={"limit"} rules={[{ required: true, message: 'Missing limit' }]}>
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item label={"Interval"} name={"interval"} rules={[{ required: true, message: 'Missing token pair' }]}>
                                <Input type="number" />
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


                </Card>
                <Divider />
                <Card title="Simulation settings">
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item label="Price paths" name={"nrep"} rules={[{ required: true, message: 'Missing price paths' }]}>
                                <Select options={(new Array(15).fill(0)).map((_, index) => {
                                    return {
                                        label: index + 1,
                                        value: index + 1
                                    }
                                })} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Price steps" name={"nsteps"} rules={[{ required: true, message: 'Missing price steps' }]}>
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
                        <Input type="number" />
                    </Form.Item>
                </Card>
                <Divider />
                <Form.Item>
                    <Button loading={simulatePriceAction} type="primary" block htmlType="submit">Simulate price</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}