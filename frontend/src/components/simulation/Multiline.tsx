import { useAppSelector } from '@/controller/hooks';
import { useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export const Multiline = () => {
    const {paths, minValue, maxValue, rep} = useAppSelector(state => state.simulation);
    useEffect(() => {
        console.log("Start load");
    }, [])
    return (<ResponsiveContainer>
        <LineChart
            data={paths}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis name='Steps' dataKey="name" />
            <YAxis name="Paths" domain={[minValue, maxValue]} />
            <Tooltip />
            <Legend />
            {
                (new Array(rep).fill(0)).map((_, index) => {
                    let random1 = Math.floor(Math.random() * 255);
                    let random2 = Math.floor(Math.random() * 255);
                    let random3 = Math.floor(Math.random() * 255);
                    return <Line key={`path-${index}`} type="monotone" dataKey={`p${index}`} stroke={`rgb(${random1}, ${random2}, ${random3}, 0.8)`} activeDot={{ r: 8 }} />
                })
            }
        </LineChart>
    </ResponsiveContainer>)
}
