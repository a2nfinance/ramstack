import { useAppSelector } from '@/controller/hooks';
import { getNDRandomNumber } from '@/core/prob_distribution';
import { Alert, Button, Card, Col, Divider, Form, InputNumber, Row } from 'antd';
import { NumberChart } from './NumberChart';
import { ShowNumbers } from './ShowNumbers';

export const Standard = () => {
  const { ndChartPoints } = useAppSelector(state => state.distribution);
  const { getRandomNumberAction } = useAppSelector(state => state.process);
  const onFinish = (values: any) => {
    getNDRandomNumber(values)
  }
  return (

    <Row gutter={6}>
      <Col span={6}>
        <Card title="Random number settings">
          <Form
            initialValues={{
              size: 300,
              min_excl: 0,
              max_excl: 50
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
            <Divider/>
            <Alert type='info' showIcon message={"These are the settings to generate random numbers based on a uniform distribution. Afterward, the generated numbers will be converted to random numbers based on a normal distribution."} />
            <Divider />
            <Button type='primary' block htmlType='submit' loading={getRandomNumberAction} size='large'>Generate & Convert</Button>
          </Form>
         
        </Card>
      </Col>
      <Col span={18}>
        <NumberChart data={ndChartPoints} />
        
      </Col>
      <Divider />
      <ShowNumbers title='Converted random numbers' data={ndChartPoints} />
    </Row>


  );

}
