import { Alert, Button, Card, Col, Divider, Form, Input, InputNumber, Row } from 'antd';
import { NumberChart } from './NumberChart';
import { useAppSelector } from '@/controller/hooks';
import { getLLRandomNumber } from '@/core/prob_distribution';
import { ShowNumbers } from './ShowNumbers';

export const Laplacian = () => {
  const { llRandomNumbers, llChartPoints } = useAppSelector(state => state.distribution);
  const { getRandomNumberAction } = useAppSelector(state => state.process);
  const onFinish = (values: any) => {
    getLLRandomNumber(values)
  }
  return (

    <Row gutter={6}>
      <Col span={6}>
        <Card title="Random number settings">
          <Form
            initialValues={{
              size: 300,
              min_excl: 0,
              max_excl: 50,
              mu: 0,
              beta: 1
            }}
            onFinish={onFinish}
            layout='vertical'>

            <Form.Item label="Size" name={"size"} rules={[{ required: true, message: 'Missing size' }]}>
              <InputNumber style={{ width: "100%" }} min={1} max={400} precision={0} />
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Min excl" name={"min_excl"} rules={[{ required: true, message: 'Missing min excl' }]}>
                  <InputNumber style={{ width: "100%" }} min={0} precision={0} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Max excl" name={"max_excl"} rules={[{ required: true, message: 'Missing max excl' }]}>
                  <InputNumber style={{ width: "100%" }} min={1} precision={0} />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Alert type='info' showIcon message={"These are the settings to generate random numbers based on a uniform distribution. Afterward, the generated numbers will be converted to random numbers based on an exponential distribution."} />
            <Divider />
            <Form.Item help={"MU is the location parameter of the exponential distribution."} label="MU" name={"mu"} rules={[{ required: true, message: 'Missing MU' }]}>
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
            <Form.Item help={"Beta is the scale parameter of the exponential distribution."} label="Beta" name={"beta"} rules={[{ required: true, message: 'Missing beta' }]}>
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
            <Divider />
            <Button type='primary' block htmlType='submit' loading={getRandomNumberAction} size='large'>Generate & Convert</Button>
          </Form>
        </Card>
      </Col>
      <Col span={18}>
        <NumberChart data={llChartPoints} />
      </Col>
      <Divider />
      <ShowNumbers title='Converted numbers' data={llRandomNumbers} />
    </Row>


  );

}
