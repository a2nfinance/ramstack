import { Aptos, AptosConfig, InputViewRequestData, MoveValue, Network, ViewRequest } from "@aptos-labs/ts-sdk";
const aptosConfig = new AptosConfig({ network: Network.RANDOMNET });
let aptos: Aptos;
export const getAptos = () => {
    if (!aptos) {
        aptos = new Aptos(aptosConfig);
    }
    return aptos;
}

export const packageAddress = "0x131af981c6ee5ee61c9440c5254f0448aef8e5cb8d2c321ff3024490c71eaaaa";