import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
let x: {value: number, positive: boolean}[] = [
    {
     value: 9423069547904273726,
     positive: false
   },
    {
     value: 29688889273197213358,
     positive: true
   },
    {
     value: 29688889273197213358,
     positive: true
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 29688889273197213358,
     positive: true
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 16902580627994557698,
     positive: true
   },
    {
     value: 4116271982791902043,
     positive: false
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 16902580627994557703,
     positive: false
   },
    {
     value: 9423069547904273722,
     positive: true
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 4116271982791902040,
     positive: true
   },
    {
     value: 9423069547904273722,
     positive: true
   },
    {
     value: 4116271982791902040,
     positive: true
   },
    {
     value: 16902580627994557698,
     positive: true
   },
    {
     value: 16902580627994557703,
     positive: false
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 4116271982791902043,
     positive: false
   },
    {
     value: 16902580627994557703,
     positive: false
   },
    {
     value: 9423069547904273722,
     positive: true
   },
    {
     value: 16902580627994557703,
     positive: false
   },
    {
     value: 16902580627994557703,
     positive: false
   },
    {
     value: 4116271982791902040,
     positive: true
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 16902580627994557703,
     positive: false
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 16902580627994557698,
     positive: true
   },
    {
     value: 9423069547904273726,
     positive: false
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 29688889273197213358,
     positive: true
   },
    {
     value: 16902580627994557698,
     positive: true
   },
    {
     value: 4116271982791902040,
     positive: true
   },
    {
     value: 9423069547904273722,
     positive: true
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 9423069547904273726,
     positive: false
   },
    {
     value: 4116271982791902043,
     positive: false
   },
    {
     value: 16902580627994557703,
     positive: false
   },
    {
     value: 4116271982791902043,
     positive: false
   },
    {
     value: 16902580627994557703,
     positive: false
   },
    {
     value: 9423069547904273726,
     positive: false
   },
    {
     value: 9423069547904273722,
     positive: true
   },
    {
     value: 9423069547904273726,
     positive: false
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 16902580627994557698,
     positive: true
   },
    {
     value: 29688889273197213358,
     positive: true
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 4116271982791902043,
     positive: false
   },
    {
     value: 9423069547904273726,
     positive: false
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 4116271982791902040,
     positive: true
   },
    {
     value: 4116271982791902043,
     positive: false
   },
    {
     value: 16902580627994557703,
     positive: false
   },
    {
     value: 4116271982791902040,
     positive: true
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 9423069547904273722,
     positive: true
   },
    {
     value: 9423069547904273726,
     positive: false
   },
    {
     value: 29688889273197213358,
     positive: true
   },
    {
     value: 29688889273197213358,
     positive: true
   },
    {
     value: 4116271982791902043,
     positive: false
   },
    {
     value: 29688889273197213358,
     positive: true
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 16902580627994557698,
     positive: true
   },
    {
     value: 9423069547904273722,
     positive: true
   },
    {
     value: 4116271982791902043,
     positive: false
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 4116271982791902043,
     positive: false
   },
    {
     value: 9423069547904273726,
     positive: false
   },
    {
     value: 29688889273197213368,
     positive: false
   },
    {
     value: 4116271982791902040,
     positive: true
   },
    {
     value: 16902580627994557698,
     positive: true
   },
    {
     value: 4116271982791902043,
     positive: false
   },
    {
     value: 4116271982791902043,
     positive: false
   },
    {
     value: 16902580627994557698,
     positive: true
   },
    {
     value: 29688889273197213358,
     positive: true
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 9423069547904273726,
     positive: false
   },
    {
     value: 9423069547904273726,
     positive: false
   },
    {
     value: 9423069547904273722,
     positive: true
   },
    {
     value: 9423069547904273722,
     positive: true
   },
    {
     value: 0,
     positive: false
   },
    {
     value: 4116271982791902040,
     positive: true
   }
 ];
  
  let mockData: number[] = [];
  for(let i=0; i < x.length; i++) {
      if (x[i].positive) {
        mockData.push(x[i].value / 2**64);
      } else {
        mockData.push((x[i].value / 2**64) * -1);
      }
  }

let min = Math.min(...mockData);
let max = Math.max(...mockData);
let range = 0.5;
let steps = Math.floor((max - min) / range) + 1;

let data: {point: string, count: number}[] = [];

for (let j=0; j < steps; j++) {
    let point = min + range*j;
    point += range / 2
    data.push(
        {
            point: point.toFixed(2),
            count: 0
        }
    )
}

for (let i = 0; i < mockData.length; i++) {
    for(let j = 0; j < steps; j++) {
        if (mockData[i] >= (min + j*range) && mockData[i] < (min + (j+1) * range)) {
            data[j].count += 1;
        }
    }
}

export const Laplacian = () => {
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
