
import { Multiline } from "@/components/simulation/Multiline";
import { Typography } from "antd";
import Head from "next/head";
const {Title} = Typography;
export default function Index() {
    return (
        <>  
            <Head>
                <title>Price simulation</title>
            </Head>
            <Multiline />
        </>
    )
}