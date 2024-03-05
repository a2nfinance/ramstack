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
            colData[`p${j}`] = floorValue;
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