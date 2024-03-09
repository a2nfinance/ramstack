
import { DataForm } from "@/components/simulation/DataForm";
import { DataPoints } from "@/components/simulation/DataPoints";
import { Multiline } from "@/components/simulation/Multiline";
import { getPricePaths } from "@/core/price_simulation";
import { Button, Col, Row, Space, Typography } from "antd";
import Head from "next/head";
import { useCallback } from "react";
const { Title } = Typography;
export default function Index() {
    return (
        <>
            <Head>
                <title>Price simulation</title>
            </Head>

            <Space direction="vertical">

                <DataForm />


                <Row gutter={8}>
                    <Col span={16}> 
                        <Multiline />
                    </Col>
                    <Col span={8}>
                        <DataPoints />
                    </Col>
                </Row>


            </Space>

        </>
    )
}