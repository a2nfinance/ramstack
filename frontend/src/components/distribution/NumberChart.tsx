import { ChartPoint } from '@/controller/distribution/distributionSlice';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
export const NumberChart = ({data} : {data: ChartPoint[]}) => {
    let random1 = Math.floor(Math.random() * 255);
    let random2 = Math.floor(Math.random() * 255);
    let random3 = Math.floor(Math.random() * 255);
    let random_rgb = `rgb(${random1}, ${random2}, ${random3}, 0.8)`;
    return (
        <ResponsiveContainer>
             <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="point" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill={random_rgb} activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </ResponsiveContainer>
    );

}