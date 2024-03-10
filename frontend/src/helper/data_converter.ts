import { ChartPoint } from "@/controller/distribution/distributionSlice";

export const convertPathsData = (data: string[][], steps: number, rep: number) => {
    let paths: any[] = [];

    let minValue = Number(BigInt(data[0][0])) / Number(BigInt(2 ** 64));
    let maxValue = minValue;
    let floorValue = 0;
    for (let i = 0; i < steps + 1; i++) {
        let stepName = `S${i}`;
        let colData = {
            name: stepName
        };
        for (let j = 0; j < rep; j++) {
            let originValue = Number(BigInt(data[j][i])) / Number(BigInt(2 ** 64));
            floorValue = parseFloat(originValue.toFixed(3));
            colData[`P${j}`] = floorValue;
            if (floorValue < minValue) minValue = floorValue;
            if (floorValue > maxValue) maxValue = floorValue;
        }

        paths.push(colData);
    }

    return {
        paths,
        minValue,
        maxValue
    }
}

export const convertNDNumbersToChartPoint = (numbers: { positive: boolean, value: string }[], range: number) => {
    let convertedNumbers: number[] = [];
    let chartPoints: ChartPoint[] = [];
    for (let i = 0; i < numbers.length; i++) {
        let originValue = Number(BigInt(numbers[i].value)) / Number(BigInt(2 ** 64));

        if (numbers[i].positive) {
            convertedNumbers.push(originValue);
        } else {
            convertedNumbers.push((originValue) * -1);
        }
    }

    let min = Math.min(...convertedNumbers);
    let max = Math.max(...convertedNumbers);
    let steps = Math.floor((max - min) / range) + 1;

    for (let j = 0; j < steps; j++) {
        let point = min + range * j;
        point += range / 2
        chartPoints.push(
            {
                point: point.toFixed(2),
                count: 0
            }
        )
    }

    for (let i = 0; i < convertedNumbers.length; i++) {
        for (let j = 0; j < steps; j++) {
            if (convertedNumbers[i] >= (min + j * range) && convertedNumbers[i] < (min + (j + 1) * range)) {
                chartPoints[j].count += 1;
            }
        }
    }

    return {
        ndRandomNumbers: convertedNumbers,
        ndChartPoints: chartPoints
    }
}




export const convertLLNumbersToChartPoint = (numbers: { positive: boolean, value: string }[], range: number) => {
    const { ndRandomNumbers, ndChartPoints } = convertNDNumbersToChartPoint(numbers, range);

    return {
        llRandomNumbers: ndRandomNumbers,
        llChartPoints: ndChartPoints
    }
}

export const convertExpNumbersToChartPoint = (numbers: { value: string }[], range: number) => {
    let convertedNumbers: number[] = [];
    let chartPoints: ChartPoint[] = [];
    for (let i = 0; i < numbers.length; i++) {
        let originValue = Number(BigInt(numbers[i].value)) / Number(BigInt(2 ** 64));
        convertedNumbers.push(originValue);

    }

    let min = Math.min(...convertedNumbers);
    let max = Math.max(...convertedNumbers);
    let steps = Math.floor((max - min) / range) + 1;

    for (let j = 0; j < steps; j++) {
        let point = min + range * j;
        point += range / 2
        chartPoints.push(
            {
                point: point.toFixed(2),
                count: 0
            }
        )
    }

    for (let i = 0; i < convertedNumbers.length; i++) {
        for (let j = 0; j < steps; j++) {
            if (convertedNumbers[i] >= (min + j * range) && convertedNumbers[i] < (min + (j + 1) * range)) {
                chartPoints[j].count += 1;
            }
        }
    }

    return {
        expRandomNumbers: convertedNumbers,
        expChartPoints: chartPoints
    }
}


export const convertCQNumbersToChartPoint = (numbers: { value: string }[], range: number) => {
    const { expRandomNumbers, expChartPoints } = convertExpNumbersToChartPoint(numbers, range);

    return {
        cqRandomNumbers: expRandomNumbers,
        cqChartPoints: expChartPoints
    }
}

export const convertToDataSource = (paths, nrep) => {

    let dataSource: any[] = [];

    for (let i = 0; i < nrep; i++) {
        let rowData = {
            path: `P${i}`
        };
        for(let j = 0; j < paths.length; j++) {
            rowData[`S${j}`] = paths[j][`P${i}`] 
        }
        dataSource.push(rowData)
    }
    return dataSource;


}
