import seedrandom from "seedrandom";
export const getRandomColor = (index) => {
    
    let random1 = Math.floor(seedrandom(index)() * 255);
    let random2 = Math.floor(seedrandom(index + 1)() * 255);
    let random3 = Math.floor(seedrandom(index + 2)() * 255);
    return `rgb(${random1}, ${random2}, ${random3}, 0.8)`;
}