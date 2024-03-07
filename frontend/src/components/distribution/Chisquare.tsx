import { useAppSelector } from '@/controller/hooks';
import { getCQRandomNumber } from '@/core/prob_distribution';
import { Alert, Button, Card, Col, Divider, Form, Input, InputNumber, Row } from 'antd';
import { NumberChart } from './NumberChart';
import { ShowNumbers } from './ShowNumbers';

export const Chisquare = () => {
    const { cqRandomNumbers, cqChartPoints } = useAppSelector(state => state.distribution);
    const { getRandomNumberAction } = useAppSelector(state => state.process);
    const onFinish = (values: any) => {
        getCQRandomNumber(values)
    }
    return (

        <Row gutter={6}>
            <Col span={6}>
                <Card title="Random number settings">
                    <Form
                        initialValues={{
                            size: 200,
                            min_excl: 0,
                            max_excl: 20
                        }}
                        onFinish={onFinish}
                        layout='vertical'>

                        <Form.Item label="Size" name={"size"} rules={[{ required: true, message: 'Missing size' }]}>
                            <InputNumber style={{ width: "100%" }} min={1} max={400} precision={0} />
                        </Form.Item>
                        <Form.Item label="Min excl" name={"min_excl"} rules={[{ required: true, message: 'Missing min excl' }]}>
                            <InputNumber style={{ width: "100%" }} min={0} precision={0} />
                        </Form.Item>
                        <Form.Item label="Max excl" name={"max_excl"} rules={[{ required: true, message: 'Missing max excl' }]}>
                            <InputNumber style={{ width: "100%" }} min={1} precision={0} />
                        </Form.Item>
                        <Divider />
                        <Alert type='info' showIcon message={"These are the settings to generate random numbers based on a uniform distribution. Afterward, the generated numbers will be converted to random numbers based on a chi-square distribution."} />
                        <Divider />
                        <Button type='primary' block htmlType='submit' loading={getRandomNumberAction} size='large'>Generate & Convert</Button>
                    </Form>
                </Card>
            </Col>
            <Col span={18}>
                <NumberChart data={cqChartPoints} />
            </Col>
            <Divider />
            <ShowNumbers title='Converted numbers' data={cqRandomNumbers} />
        </Row>


    );

}
