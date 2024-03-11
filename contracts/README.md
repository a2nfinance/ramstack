## Introduction

Ramstack implements math modules and algorithms on-chain to simulate token pair price and predict option price.

## Demo information
- [Frontend Application](https://ramstack.a2n.finance)
- [Video demo]()


For more detailed information on product features, you can refer to [our project description on TaiKai.](https://taikai.network/aptos/hackathons/aptos-random-hack/projects/cltmp232e06djwc017mvepq7j/idea)

## Key ideas
Our project employs the main idea of developing an on-chain algorithm using Monte Carlo in smart contracts and implementing distributed computation using smart contracts to simulate the token price. Our project includes features:

## Architecture

- We use Aptos_std and Aptos_framework as the foundation to develop Ramstack. The most important modules are fixed_point64 and math_fixed64.

- To generate random numbers following probability distributions, we utilize the Aptos randomness API to generate uniform distribution numbers initially. Subsequently, math formulas such as Box-Muller and inverse CDF are applied to transform these numbers.

- For frontend development, we employ Aptos-labs/ts-sdk, Next.js, Redux Toolkit, Rechart, and Ant Design.

## Smart contracts



## Installation

To build & test smart contract:
- Go to smart contract folder, e.g. ```cd contracts/ramstack```
- To compile: ```aptos move compile ```
- To test: ```aptos move test```


To run Ramstack frontend application:
- ```cd frontend```
- ```npm i```
- ```npm run dev``` for the dev mode
- ```npm run build``` & ```npm run start``` for the production mode.




