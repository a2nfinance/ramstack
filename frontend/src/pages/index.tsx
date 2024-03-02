import { Divider, Typography } from "antd";
import Head from "next/head";
const {Title} = Typography;
export default function Index() {
    return (
        <>  
            <Head>
                <title>Ramstack homepage</title>
            </Head>
            <Title level={3}>{"Ramstack".toUpperCase()}</Title >
            <Divider />
        </>
    )
}