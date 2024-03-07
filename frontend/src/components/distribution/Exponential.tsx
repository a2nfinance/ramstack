import { useAppSelector } from '@/controller/hooks';
import { getEXPRandomNumber } from '@/core/prob_distribution';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Row } from 'antd';
import { NumberChart } from './NumberChart';
import { ShowNumbers } from './ShowNumbers';

export const Exponential = () => {
    const { expRandomNumbers, expChartPoints } = useAppSelector(state => state.distribution);
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
                            lambda: 1
                        }}
                        onFinish={onFinish}
                        layout='vertical'>

                        <Form.Item label="Size" name={"size"}>
                            <InputNumber style={{ width: "100%" }} min={1} max={400} precision={0} />
                        </Form.Item>
                        <Form.Item label="Min excl" name={"min_excl"}>
                            <InputNumber style={{ width: "100%" }} min={0} precision={0} />
                        </Form.Item>
                        <Form.Item label="Max excl" name={"max_excl"}>
                            <InputNumber style={{ width: "100%" }} min={1} precision={0} />
                        </Form.Item>
                        <Form.Item label="Lambda" name={"lambda"}>
                            <InputNumber style={{ width: "100%" }} min={0} />
                        </Form.Item>
                        <Divider />
                        <Button type='primary' block htmlType='submit' loading={getRandomNumberAction} size='large'>Generate numbers</Button>
                    </Form>
                </Card>
            </Col>
            <Col span={18}>
                <NumberChart data={expChartPoints} />
            </Col>
            <Divider />
            <ShowNumbers title='Returned random numbers' data={expRandomNumbers} />
        </Row>


    );

}
