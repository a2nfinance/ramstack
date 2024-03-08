
import { Button, Card, Col, Divider, Image, Row, Space } from "antd";
import Head from "next/head";
import { Typography } from "antd";
import { useRouter } from "next/router";
const { Title, Text } = Typography;
export default function Index() {
const router = useRouter();

    return (
        <>
            <Head>
                <title>Ramstack homepage</title>
            </Head>
            <Card style={{ maxWidth: 1200, marginRight: "auto", marginLeft: "auto", background: "none"}}>
                <Row gutter={12} >
                    <Col span={10}>
                        <Card>
                            <Space direction="vertical">
                                <Title level={4}>Randomness + Aptos + Move = R.A.M</Title>
                                <Text>Ramstack provides new math modules for Aptos Move. These libraries help developers conduct analytics or create complex formulas on-chain.</Text>
                                <Text>Use-cases include creating <strong>AI tools, simulation processes, game loot systems, and flexible rewards systems.</strong></Text>
                                <Text>We have developed an application based on Ramstack modules that allows <strong>the simulation of token pair prices using the Monte Carlo method</strong>; all algorithms are built on-chain.</Text>
                                <Text>This application also visualizes how random numbers of probability distributions are generated. To check how the modules work, go to our GitHub.</Text>

                            </Space>
                            <Divider />
                            <Space direction="horizontal">
                                <Button type="primary" size="large" onClick={() => router.push("/price-simulation")}>Try price simulation</Button>
                                <Button type="primary" size="large" onClick={() => router.push("/distribution/normal")}>Generate random numbers</Button>
                            </Space>
                        </Card>
                    </Col>

                    <Col span={13}>
                        <Image preview={false} alt={"data"} style={{ transform: "rotate(180deg)", marginTop: 45 }} width={"100%"} src={"/data.gif"} />
                    </Col>

                </Row>
            </Card>

        </>
    )
}