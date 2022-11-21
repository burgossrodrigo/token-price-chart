import { ethers } from "ethers";
import pool from './pool.json'
import token from './token.json'

const provider = new ethers.providers.JsonRpcProvider(
    'YOUR HTTPS PROVIDER'
    )
const poolV2 = new ethers.Contract(
    '0xEEf611894CeaE652979C9D0DaE1dEb597790C6eE',
    pool,
    provider
    )

export const data = async () => {
    const sync = await poolV2.filters.Sync()
    const block = await provider.getBlock('latest')
    let _data = []
    for(let i = 0; i < 500; i++){
        try {
            console.log(i, 'index')
            const result = await poolV2.queryFilter(sync, block.number - i, block.number)
            if(result.length > 0){
                const price = Number(result[0].args?.reserve0._hex) / Number(result[0].args?.reserve1._hex)
                const time = await provider.getBlock(block.number - i)
                _data.push({
                    price: price,
                    time: time.timestamp
                })
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }
    return _data
}

export const getTokenSymbols = async () => {
    try {
        const token0 = await poolV2.token0()
        const token1 = await poolV2.token1()
        const token0Contract = new ethers.Contract(token0, token, provider)
        const token1Contract = new ethers.Contract(token1, token, provider)
        const token0Symbol = await token0Contract.symbol()
        const token1Symbol = await token1Contract.symbol()
        const result = { token0Symbol, token1Symbol }
        return result
    } catch (error) {
        console.log(error, 'getTokenSymbol')
    }
}