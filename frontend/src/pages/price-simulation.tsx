
import { DataForm } from "@/components/simulation/DataForm";
import { Multiline } from "@/components/simulation/Multiline";
import { getPricePaths } from "@/core/price_simulation";
import { Button, Col, Row, Typography } from "antd";
import Head from "next/head";
import { useCallback } from "react";
const { Title } = Typography;
export default function Index() {
    return (
        <>
            <Head>
                <title>Price simulation</title>
            </Head>
            <Row gutter={6}>
                <Col span={6}>
                    <DataForm />
                </Col>
                <Col span={18}>
                    <Multiline />
                </Col>
            </Row>

        </>
    )
}