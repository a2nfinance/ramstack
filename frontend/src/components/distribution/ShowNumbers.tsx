import { Card, Collapse, CollapseProps, Flex, Space, Tag } from "antd";

export const ShowNumbers = ({ title, data }: { title: string, data: any[] }) => {
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: title,
            children: <>
                <Flex gap="small" wrap="wrap">
                    {
                        data.map((point, pointIndex) => {
                           return <Card style={{maxWidth: 250}} key={`range-${pointIndex}`} title={`${point.point} +/- ${point.range/2} | total: ${point.numbers.length} `}>
                                <Space direction="vertical">
                                {
                                    point.numbers.map((n, nIndex) => {
                                        return (
                                            <Tag key={`n-${pointIndex}-${nIndex}`} color="lime">{n}</Tag>                                 
                                        )
                                    })
                                }
                                </Space>
                            </Card>
                        })
                    }
                </Flex>
            </>,
        },
    ];
    return <Card style={{width: "100%"}}><Collapse items={items} /></Card>;
}