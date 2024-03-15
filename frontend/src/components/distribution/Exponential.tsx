import { useAppSelector } from '@/controller/hooks';
import { getEXPRandomNumber } from '@/core/prob_distribution';
import { Alert, Button, Card, Col, Divider, Form, InputNumber, Row } from 'antd';
import { NumberChart } from './NumberChart';
import { ShowNumbers } from './ShowNumbers';

export const Exponential = () => {
    const { expChartPoints } = useAppSelector(state => state.distribution);
    const { getRandomNumberAction } = useAppSelector(state => state.process);
    const onFinish = (values: any) => {
        getEXPRandomNumber(values)
    }
    return (

        <Row gutter={6}>
            <Col span={6}>
                <Card title="Random number settings">
                    <Form
                        initialValues={{
                            size: 200,
                            min_excl: 0,
                            max_excl: 20,
                            lambda: 0.5
                        }}
                        onFinish={onFinish}
                        layout='vertical'>

                        <Form.Item label="Size" name={"size"} rules={[{ required: true, message: 'Missing size' }]}>
                            <InputNumber style={{ width: "100%" }} min={1} max={500} precision={0} />
                        </Form.Item>
                        <Form.Item label="Min excl" name={"min_excl"} rules={[{ required: true, message: 'Missing min excl' }]}>
                            <InputNumber style={{ width: "100%" }} min={0} precision={0} />
                        </Form.Item>
                        <Form.Item label="Max excl" name={"max_excl"} rules={[{ required: true, message: 'Missing max excl' }]}>
                            <InputNumber style={{ width: "100%" }} min={1} precision={0} />
                        </Form.Item>
                        <Divider />
                        <Alert type='info' showIcon message={"These are the settings to generate random numbers based on a uniform distribution. Afterward, the generated numbers will be converted to random numbers based on an exponential distribution."} />
                        <Divider />
                        <Form.Item help={"Lambda is the rate parameter of the exponential distribution."} label="Lambda" name={"lambda"} rules={[{ required: true, message: 'Missing lambda' }]}>
                            <InputNumber style={{ width: "100%" }} min={0} />
                        </Form.Item>

                        <Divider />
                        <Button type='primary' block htmlType='submit' loading={getRandomNumberAction} size='large'>Generate & Convert</Button>
                    </Form>
                </Card>
            </Col>
            <Col span={18}>
                <NumberChart data={expChartPoints} />
            </Col>
            <Divider />
            <ShowNumbers title='Converted random numbers' data={expChartPoints} />
        </Row>


    );

}
