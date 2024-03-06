import { useAppSelector } from '@/controller/hooks';
import { getCQRandomNumber } from '@/core/prob_distribution';
import { Button, Card, Col, Divider, Form, Input, Row } from 'antd';
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

                        <Form.Item label="Size" name={"size"}>
                            <Input type='number' />
                        </Form.Item>
                        <Form.Item label="Min excl" name={"min_excl"}>
                            <Input type='number' />
                        </Form.Item>
                        <Form.Item label="Max excl" name={"max_excl"}>
                            <Input type='number' />
                        </Form.Item>

                        <Divider />
                        <Button type='primary' block htmlType='submit' loading={getRandomNumberAction} size='large'>Generate numbers</Button>
                    </Form>
                </Card>
            </Col>
            <Col span={18}>
                <NumberChart data={cqChartPoints} />
            </Col>
            <Divider />
            <ShowNumbers title='Returned random numbers' data={cqRandomNumbers} />
        </Row>


    );

}
