import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
let x: {value: number, positive: boolean}[] = [
    {
      value: 3734130658247592160,
      positive: false
    },
    {
      value: 5274160177247493265,
      positive: false
    },
    {
      value: 7727627218231068215,
      positive: false
    },
    {
      value: 13300520588843113972,
      positive: false
    },
    {
      value: 28636564992966779340,
      positive: true
    },
    {
      value: 14147493219603935190,
      positive: true
    },
    {
      value: 1146184545422894593,
      positive: false
    },
    {
      value: 8437268638873330871,
      positive: true
    },
    {
      value: 2890479362150707152,
      positive: false
    },
    {
      value: 2890479362150707153,
      positive: false
    },
    {
      value: 32681849491021429141,
      positive: false
    },
    {
      value: 4854660747444330419,
      positive: true
    },
    {
      value: 19475110104354257512,
      positive: true
    },
    {
      value: 8435956990244154910,
      positive: true
    },
    {
      value: 28531748979429206815,
      positive: false
    },
    {
      value: 9640661662646117506,
      positive: false
    },
    {
      value: 2890479362150707153,
      positive: false
    },
    {
      value: 11485389857083853851,
      positive: false
    },
    {
      value: 6115614179227219208,
      positive: true
    },
    {
      value: 16828235830697895131,
      positive: false
    },
    {
      value: 38760701180018363305,
      positive: false
    },
    {
      value: 7652893132469241357,
      positive: false
    },
    {
      value: 19473120274165341002,
      positive: false
    },
    {
      value: 4847468665940733254,
      positive: false
    },
    {
      value: 22305593196536019122,
      positive: false
    },
    {
      value: 9622900914970558741,
      positive: true
    },
    {
      value: 4231913472346970745,
      positive: false
    },
    {
      value: 12376959977932452739,
      positive: true
    },
    {
      value: 12352895955669849694,
      positive: true
    },
    {
      value: 12352895955669849694,
      positive: true
    },
    {
      value: 16828235830697895131,
      positive: false
    },
    {
      value: 13300520588843113972,
      positive: false
    },
    {
      value: 19473120274165341004,
      positive: false
    },
    {
      value: 13300520588843113972,
      positive: false
    },
    {
      value: 4854660747444330419,
      positive: true
    },
    {
      value: 3734130658247592160,
      positive: false
    },
    {
      value: 8435956990244154910,
      positive: true
    },
    {
      value: 38760701180018363305,
      positive: false
    },
    {
      value: 6775342682552246251,
      positive: true
    },
    {
      value: 4853906047151256664,
      positive: true
    },
    {
      value: 16828235830697895131,
      positive: false
    },
    {
      value: 12376959977932452739,
      positive: true
    },
    {
      value: 32681849491021429141,
      positive: false
    },
    {
      value: 4847468665940733256,
      positive: false
    },
    {
      value: 13300520588843113972,
      positive: false
    },
    {
      value: 28636564992966779340,
      positive: true
    },
    {
      value: 17182576133149658565,
      positive: false
    },
    {
      value: 15169552757188755690,
      positive: false
    },
    {
      value: 19473120274165341004,
      positive: false
    },
    {
      value: 5749101943929144525,
      positive: false
    },
    {
      value: 15169552757188755692,
      positive: false
    },
    {
      value: 25015748199153471647,
      positive: true
    },
    {
      value: 10899874916541662491,
      positive: true
    },
    {
      value: 2095116005965292525,
      positive: false
    },
    {
      value: 10899874916541662491,
      positive: true
    },
    {
      value: 14149692915513863322,
      positive: true
    },
    {
      value: 1663132620440631554,
      positive: false
    },
    {
      value: 6771119215180525086,
      positive: true
    },
    {
      value: 32681849491021429141,
      positive: false
    },
    {
      value: 22226220826691273836,
      positive: false
    },
    {
      value: 3734130658247592160,
      positive: false
    },
    {
      value: 14149692915513863322,
      positive: true
    },
    {
      value: 5749101943929144525,
      positive: false
    },
    {
      value: 7284696429989393051,
      positive: true
    },
    {
      value: 22226220826691273836,
      positive: false
    },
    {
      value: 4231913472346970745,
      positive: false
    },
    {
      value: 14745275331346962869,
      positive: true
    },
    {
      value: 33984174662445391758,
      positive: true
    },
    {
      value: 13300520588843113972,
      positive: false
    },
    {
      value: 33984174662445391758,
      positive: true
    },
    {
      value: 14125365359097054443,
      positive: false
    },
    {
      value: 17182576133149658565,
      positive: false
    },
    {
      value: 7727627218231068215,
      positive: false
    },
    {
      value: 3345696581020478133,
      positive: true
    },
    {
      value: 9622900914970558741,
      positive: true
    },
    {
      value: 3345696581020478133,
      positive: true
    },
    {
      value: 26454452425390014367,
      positive: false
    },
    {
      value: 13300520588843113972,
      positive: false
    },
    {
      value: 4853906047151256664,
      positive: true
    },
    {
      value: 6115614179227219208,
      positive: true
    },
    {
      value: 15169552757188755690,
      positive: false
    },
    {
      value: 28654426973245433047,
      positive: true
    },
    {
      value: 3296658870216772030,
      positive: false
    },
    {
      value: 5749101943929144525,
      positive: false
    },
    {
      value: 22059487674147740050,
      positive: true
    },
    {
      value: 28654426973245433047,
      positive: true
    },
    {
      value: 11485389857083853852,
      positive: false
    },
    {
      value: 4853906047151256664,
      positive: true
    },
    {
      value: 22226220826691273836,
      positive: false
    },
    {
      value: 15169552757188755690,
      positive: false
    },
    {
      value: 1663132620440631554,
      positive: false
    },
    {
      value: 3345696581020478133,
      positive: true
    },
    {
      value: 8435956990244154910,
      positive: true
    },
    {
      value: 25175675092058174089,
      positive: false
    },
    {
      value: 10899874916541662491,
      positive: true
    },
    {
      value: 5749101943929144523,
      positive: false
    },
    {
      value: 9640661662646117507,
      positive: false
    },
    {
      value: 14125365359097054443,
      positive: false
    },
    {
      value: 17086243461946520919,
      positive: true
    },
    {
      value: 7284696429989393051,
      positive: true
    },
    {
      value: 25971449197874966602,
      positive: true
    },
    {
      value: 6086705313688887583,
      positive: true
    },
    {
      value: 2269036078824261151,
      positive: false
    },
    {
      value: 15349619014640879476,
      positive: false
    },
    {
      value: 18415082038824508066,
      positive: false
    },
    {
      value: 30983505645074267885,
      positive: false
    },
    {
      value: 7971888618061939783,
      positive: true
    },
    {
      value: 18475041265024251269,
      positive: true
    },
    {
      value: 20103725547416451310,
      positive: true
    },
    {
      value: 20103725547416451310,
      positive: false
    },
    {
      value: 9596256848788192769,
      positive: false
    },
    {
      value: 10630224243838255334,
      positive: true
    },
    {
      value: 12523700044851948003,
      positive: false
    },
    {
      value: 18475041265024251269,
      positive: false
    },
    {
      value: 8377677390227643798,
      positive: true
    },
    {
      value: 11125916657337667303,
      positive: true
    },
    {
      value: 20103725547416451310,
      positive: false
    },
    {
      value: 13254846482380594022,
      positive: true
    },
    {
      value: 13391327117596422408,
      positive: true
    },
    {
      value: 4941215869307598255,
      positive: true
    },
    {
      value: 11381168751320834340,
      positive: true
    },
    {
      value: 8831909484934076760,
      positive: true
    },
    {
      value: 22473178793125423139,
      positive: true
    },
    {
      value: 33714885128002650052,
      positive: true
    },
    {
      value: 25742026800785104162,
      positive: true
    },
    {
      value: 21071213813699427577,
      positive: true
    },
    {
      value: 29433604717099448701,
      positive: true
    },
    {
      value: 7959150597875553600,
      positive: false
    },
    {
      value: 27049069111307448942,
      positive: true
    },
    {
      value: 27049069111307448942,
      positive: true
    },
    {
      value: 4941215869307598255,
      positive: false
    },
    {
      value: 15349619014640879476,
      positive: false
    },
    {
      value: 22473178793125423139,
      positive: false
    },
    {
      value: 15349619014640879476,
      positive: false
    },
    {
      value: 10630224243838255334,
      positive: true
    },
    {
      value: 25971449197874966602,
      positive: true
    },
    {
      value: 18475041265024251269,
      positive: false
    },
    {
      value: 11381168751320834340,
      positive: false
    },
    {
      value: 4354248349019331624,
      positive: true
    },
    {
      value: 10630224243838255334,
      positive: false
    },
    {
      value: 4941215869307598255,
      positive: false
    },
    {
      value: 7959150597875553600,
      positive: false
    },
    {
      value: 9596256848788192769,
      positive: true
    },
    {
      value: 33714885128002650052,
      positive: false
    },
    {
      value: 15349619014640879476,
      positive: false
    },
    {
      value: 18415082038824508066,
      positive: false
    },
    {
      value: 19829749938896889138,
      positive: true
    },
    {
      value: 17506597120766958053,
      positive: true
    },
    {
      value: 22473178793125423139,
      positive: false
    },
    {
      value: 39985882320526932340,
      positive: false
    },
    {
      value: 17506597120766958053,
      positive: false
    },
    {
      value: 16076645182264901288,
      positive: true
    },
    {
      value: 23867396842018845643,
      positive: true
    },
    {
      value: 14571851896076429154,
      positive: true
    },
    {
      value: 23867396842018845643,
      positive: true
    },
    {
      value: 30983505645074267885,
      positive: true
    },
    {
      value: 11567341454884503566,
      positive: true
    },
    {
      value: 4354248349019331624,
      positive: false
    },
    {
      value: 9596256848788192769,
      positive: false
    },
    {
      value: 6526207272615061724,
      positive: false
    },
    {
      value: 25971449197874966602,
      positive: true
    },
    {
      value: 30983505645074267885,
      positive: true
    },
    {
      value: 39985882320526932340,
      positive: false
    },
    {
      value: 15953740316939868518,
      positive: false
    },
    {
      value: 6526207272615061724,
      positive: false
    },
    {
      value: 29433604717099448701,
      positive: true
    },
    {
      value: 9482123815426166576,
      positive: false
    },
    {
      value: 21840302896826410774,
      positive: true
    },
    {
      value: 15349619014640879476,
      positive: false
    },
    {
      value: 21840302896826410774,
      positive: true
    },
    {
      value: 4147581491864772003,
      positive: false
    },
    {
      value: 19829749938896889138,
      positive: true
    },
    {
      value: 2269036078824261151,
      positive: false
    },
    {
      value: 7326053612873694769,
      positive: true
    },
    {
      value: 21071213813699427577,
      positive: true
    },
    {
      value: 7326053612873694769,
      positive: true
    },
    {
      value: 30530065590913754063,
      positive: true
    },
    {
      value: 15349619014640879476,
      positive: false
    },
    {
      value: 10630224243838255334,
      positive: false
    },
    {
      value: 13391327117596422408,
      positive: true
    },
    {
      value: 17506597120766958053,
      positive: true
    },
    {
      value: 18415082038824508066,
      positive: true
    },
    {
      value: 22928766078779719774,
      positive: true
    },
    {
      value: 39985882320526932340,
      positive: false
    },
    {
      value: 14185614627789304624,
      positive: false
    },
    {
      value: 18415082038824508066,
      positive: true
    },
    {
      value: 13254846482380594022,
      positive: false
    },
    {
      value: 10630224243838255334,
      positive: false
    },
    {
      value: 6526207272615061724,
      positive: false
    },
    {
      value: 17506597120766958053,
      positive: true
    },
    {
      value: 11567341454884503566,
      positive: true
    },
    {
      value: 7326053612873694769,
      positive: true
    },
    {
      value: 18475041265024251269,
      positive: false
    },
    {
      value: 7392245184636853730,
      positive: false
    },
    {
      value: 23867396842018845643,
      positive: true
    },
    {
      value: 39985882320526932340,
      positive: true
    },
    {
      value: 11125916657337667303,
      positive: false
    },
    {
      value: 4147581491864772003,
      positive: true
    },
    {
      value: 10980661919390567955,
      positive: true
    },
    {
      value: 15953740316939868518,
      positive: false
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
let range = 0.2;
let steps = Math.floor((max - min) / range);
console.log(min);
console.log(max);
console.log(steps);
let data: {range: string, count: number}[] = [];

for (let j=0; j < steps; j++) {
    data.push(
        {
            range: (min + range*j).toFixed(2),
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

export const RandomBar = () => {
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
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill={random_rgb} activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </ResponsiveContainer>
    );

}
