import { useAppSelector } from '@/controller/hooks';
import { getRandomColor } from '@/helper/random_color';
import { Card, Col, Divider, Flex, Row, Space } from 'antd';
import { useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export const Multiline = () => {
    const { paths, minValue, maxValue, rep, visibleCells, visiblePaths } = useAppSelector(state => state.simulation);
    useEffect(() => {
        console.log("Start load");
    }, [])

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {

            let columnIndex = parseInt(label.replace("S", ""));
            let pointsPerPage = 10;
            let numPages = payload.length / pointsPerPage;
            if (numPages > parseInt(numPages.toString())) {
                numPages = parseInt(numPages.toString()) + 1;
            } else {
                numPages = parseInt(numPages.toString())
            }

            let width = numPages * 90;

            let multiCols = <>
                {
                    payload.map((pld) => {
                        let rowIndex = parseInt(pld.dataKey.replace("P", ""));
                        let visible = visibleCells?.[rowIndex]?.[columnIndex];
                        if (visible) {
                            return <p key={`${label}-${pld.dataKey}`} style={{ ...pld, visible: visible, minWidth: 80 }
                            } > {`${pld.dataKey} : ${pld.value}`}</p>
                        }

                        return <></>
                    }
                    )
                }
            </>;



            return (
                <div className="custom-tooltip" style={{ backgroundColor: "white", padding: "10px 15px" }}>
                    <div className="label" style={{ color: "#333333" }}>{label}</div>
                    <hr />
                    <Flex wrap="wrap" gap="small" style={{ width: width }}>
                        {multiCols}
                    </Flex>

                </div >
            );
        }

        return null;
    };

    return (<ResponsiveContainer>
        <LineChart
            data={paths}
            margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis name='Steps' dataKey="name" />
            <YAxis name="Paths" domain={[minValue, maxValue]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {
                (new Array(rep).fill(0)).map((_, index) => {
                    let color = getRandomColor(index);
                    return <Line
                        key={`path-${index}`}
                        type="monotone"
                        dataKey={`P${index}`}
                        stroke={color}
                        display={!visiblePaths[index] ? "none" : ""}
                        activeDot={{ r: 8 }} />
                })
            }
        </LineChart>
    </ResponsiveContainer>
    )
}
