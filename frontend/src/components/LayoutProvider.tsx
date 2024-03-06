import {
    GithubOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button, Form, Image, Layout, Menu, Space, theme } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { FaSuperscript } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { LiaRandomSolid } from "react-icons/lia";
const { Header, Sider, Content, Footer } = Layout;

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export const LayoutProvider = (props: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={250} onCollapse={() => setCollapsed(!collapsed)} collapsed={collapsed} style={{ background: colorBgContainer }}>
                <div style={{ height: 50, margin: 16 }}>
                    {
                        !collapsed ? <Image src={"/logo.png"} alt="dpay" preview={false} width={150} /> : <Image src={"/icon.png"} alt="dpay" preview={false} width={50} height={50} />
                    }
                </div>

                <Menu
                    style={{ fontWeight: 600 }}
                    inlineIndent={10}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label: "Home",
                            onClick: () => router.push("/")
                        },
                        {
                            key: '2',
                            icon: <LiaRandomSolid />,
                            label: "Price simulation",
                            onClick: () => router.push("/price-simulation"),
                        },
                        {
                            key: '3',
                            icon: <GiPerspectiveDiceSixFacesRandom />,
                            label: "Random numbers",
                            children: [
                                {
                                    key: '3.1',
                                    label: 'Normal distribution',
                                    onClick: () => router.push("/distribution/normal")
                                },
                                {
                                    key: '3.2',
                                    label: 'Laplacian distribution',
                                    onClick: () => router.push("/distribution/laplacian")
                                },
                                {
                                    key: '3.3',
                                    label: 'Exponential distribution',
                                    onClick: () => router.push("/distribution/exponential")
                                },
                                {
                                    key: '3.4',
                                    label: 'Chi-square distribution',
                                    onClick: () => router.push("/distribution/chisquare")
                                },
                            ]
                        },

                        { type: "divider" },
                        {
                            key: "4",
                            type: "group",
                            label: !collapsed ? 'Ramstack v0.0.1' : "",
                            children: [
                                {
                                    key: '4.1',
                                    icon: <FaSuperscript />,
                                    label: 'Twitter',
                                    onClick: () => window.open("https://twitter.com/ramstacka2n", "_blank")
                                },
                                {
                                    key: '4.2',
                                    icon: <GithubOutlined />,
                                    label: 'Github',
                                    onClick: () => window.open("https://github.com/a2nfinance/ramstack", "_blank")
                                },
                            ]
                        },

                    ]}
                />
            </Sider>
            <Layout>

                <Header //@ts-ignore
                    style={{ padding: 0, backgroundColor: colorBgContainer }}>
                    <Space align="center" style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Form layout="inline">

                            <Form.Item >
                                {/* <AutoSearch /> */}
                            </Form.Item>
                            <Form.Item>

                                {/* <WalletBar /> */}
                            </Form.Item>
                        </Form>
                    </Space>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0 16px',
                        padding: 16,
                        boxSizing: "border-box",
                        // background: colorBgContainer,
                        width: "100%",
                        marginRight: "auto",
                        marginLeft: "auto"
                    }}
                >
                    {props.children}
                </Content>
                <Footer style={{ textAlign: 'center', maxHeight: 50 }}>Ramstack ©2024 Created by A2N Finance</Footer>
            </Layout>

        </Layout>
    )

}
