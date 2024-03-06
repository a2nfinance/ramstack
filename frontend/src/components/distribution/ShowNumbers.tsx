import { Card, Collapse, CollapseProps, Flex, Tag } from "antd";

export const ShowNumbers = ({ title, data }: { title: string, data: any[] }) => {
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: title,
            children: <>
                <Flex gap="small" wrap="wrap">
                    {
                        data.map(item => {
                            return (
                                <Tag color="lime">{item.toString()}</Tag>
                            )
                        })
                    }
                </Flex>
            </>,
        },
    ];
    return <Card style={{width: "100%"}}><Collapse items={items} /></Card>;
}