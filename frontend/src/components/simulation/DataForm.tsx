import { useAppSelector } from "@/controller/hooks";
import { whitelistedPairs } from "@/core/config";
import { getPricePaths } from "@/core/price_simulation";
import { Alert, Button, Card, Col, Divider, Form, InputNumber, Row, Select, Typography } from "antd";
const { Text } = Typography;
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
                t: 10,
                nsimulation: 1
            }}
            onFinish={onFinish}
            layout='vertical'>
            <Row gutter={8}>
                <Col span={8}>
                    <Card title="Historical price data" style={{ minHeight: 410 }}>
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
                                <Form.Item label={"Interval value"} name={"interval"} rules={[{ required: true, message: 'Missing token pair' }]}>
                                    <InputNumber style={{ width: "100%" }} min={1} precision={0} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={"Interval type"} name={"interval_type"} rules={[{ required: true, message: 'Missing token pair' }]}>
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

                        <Alert message={"If the limit number is 100, the interval value is 1, and the interval type is hour, then the price data includes 100 price candles with an interval of 1 hour. The interval type of price data is the same type as the time to maturity."} type="info" showIcon />


                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Simulation settings" style={{ minHeight: 410 }}>
                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item label={"Time to maturity"} name={"t"} rules={[{ required: true, message: 'Missing time to maturity' }]}>
                                    <InputNumber style={{ width: "100%" }} min={1} precision={0} />
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
                                <Form.Item label="Num of simulations" name={"nsimulation"} rules={[{ required: true, message: 'Missing price steps' }]}>
                                    <InputNumber
                                        style={{ width: "100%" }}
                                        min={1}
                                        max={10}
                                        precision={0}
                                        />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Alert message={"If the number of paths is 10, the number of steps is 20, the duration is 10 hours, and the number of simulations is 1, then the price chart will display 10 * 1 (num of paths * num of simulations) possible price paths, each with 20 price steps, all within a 10-hour period."}
                            type="info" showIcon />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ minHeight: 410 }}>
                        <Text>Historical price data is fetched from the Binance API, so it is always up to date. You can select one of the whitelisted token pairs. Price data will be pre-processed to obtain some statistical information before calling smart contracts that implement Monte Carlo algorithms.</Text>
                        <br />
                        <br />
                        <Text>Price simulation settings define how many paths and steps are shown on the chart. You can hide paths or prices on each step by clicking on the cell in the data table.</Text>
                        <br />
                        <br />
                        <Text>After the simulation, price data is shown on the chart. You can use this data to predict option prices for any strike price.</Text>
                        <Divider />

                        <Form.Item>
                            <Button loading={simulatePriceAction} size={"large"} type="primary" block htmlType="submit">Simulate price</Button>
                        </Form.Item>
                    </Card>

                </Col>
            </Row>

        </Form>
    )
}