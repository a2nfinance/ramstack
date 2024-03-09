import { useAppSelector } from '@/controller/hooks';
import { Card, Col, Divider, Row } from 'antd';
import { useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export const Multiline = () => {
    const { paths, minValue, maxValue, rep, visibleCells } = useAppSelector(state => state.simulation);
    useEffect(() => {
        console.log("Start load");
    }, [])

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {

            let columnIndex = parseInt(label.replace("S", ""));
            
            return (
                <div className="custom-tooltip" style={{ backgroundColor: "white", padding: "10px 15px" }}>
                    <div className="label">{label}</div>
                    <hr />
                    {
                        payload.map((pld) => {
                            let rowIndex = parseInt(pld.dataKey.replace("P", ""));
                            let visible = visibleCells?.[rowIndex]?.[columnIndex];
                            if (visible) {
                                return <p style={{ ...pld, visible: visible }
                                } > {`${pld.dataKey} : ${pld.value}`}</p>
                            }

                            return <></>

                        })
                    }

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
                right: 5,
                left: 5,
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
                    let random1 = Math.floor(Math.random() * 255);
                    let random2 = Math.floor(Math.random() * 255);
                    let random3 = Math.floor(Math.random() * 255);
                    return <Line key={`path-${index}`} type="monotone" dataKey={`P${index}`} stroke={`rgb(${random1}, ${random2}, ${random3}, 0.8)`} activeDot={{ r: 8 }} />
                })
            }
        </LineChart>
    </ResponsiveContainer>
    )
}
