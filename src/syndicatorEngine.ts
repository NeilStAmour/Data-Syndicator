
import twelvedata from "twelvedata";
import { config } from "./config/config";
import { EntityData, MarketData, MarketError, MovingAverages } from "./types/marketData";

const interval = "1h";
const outputSize = 5000;
const days = Math.floor(outputSize / 8);

export class SyndicatorEngine {
    private client = twelvedata(config);

    /**
     * 
     * @param   {string} symbol     - The ticker code for the desired stock
     * @param   {string} interval   - The time interval between datapoints, ex: 5min, 1day
     * @param   {number} outputSize - The number of datapoints to get
     * @returns {MarketData}        - A collection of data for the provided stock
     * @throws  {Error}             - If the get operation fails.
     */
    async getData(symbol: string, interval: string, outputSize: number): Promise<MarketData | MarketError> {
        let params: EntityData = {
            symbol: symbol,
            interval: interval,
            outputsize: outputSize,
        };

        let marketData: MarketData | MarketError;

        try {
            marketData = await this.client.timeSeries(params);
            return marketData;
        } catch (error) {
            console.error("Error connecting to Market Entity");
            let marketError: MarketError = {
                code: 400,
                message: "Error",
                status: "error",
                meta: params
            };
            return marketError;
        }
    }

    /**
     * 
     * @param   {MarketData} marketData 
     * @param   {number}     outputSize 
     * @returns {number}
     */
    getAverage(marketData: MarketData, outputSize: number): number {
        let sum: number = 0;
        for (let i = 0; i < outputSize; i++) {
            sum += +marketData.values[i].close;
        }
        const average: number = sum / outputSize;

        return average;
    }

    /**
     * 
     * @param   {MarketData} marketData 
     * @param   {number}    days 
     * @returns {number}
     */
    getMovingAverages(marketData: MarketData): MovingAverages {
        let movingAverages: MovingAverages = {};
        movingAverages[200] = this.getAverage(marketData, 200 * 8);
        movingAverages[50] = this.getAverage(marketData, 50 * 8);
        movingAverages[10] = this.getAverage(marketData, 10 * 8);
        return movingAverages;
    }

    /**
     * Determines whether a given asset should be acquired, liquidated, or held and the certainty level with which is makes the prediction.
     * @param {string} symbol   - The ticker code for the asset
     */
    async marketPrognostication(symbol: string): Promise<MarketError | null> {
        console.log("Establishing connection to Market Entity...")
        const stockData: MarketData | MarketError = await this.getData(symbol, interval, outputSize);
        if ("code" in stockData) {
            console.log("Error establishing connection to Market Entity:")
            console.log(stockData.message)
            return stockData;
        } else {
            console.log("Connection to Market Entity established...")
        }
        console.log("Current asset price: " + stockData.values[0].open);
        const SMA: MovingAverages = this.getMovingAverages(stockData);
        console.log("200SMA of asset [" + symbol + "]: " + SMA[200]);
        console.log("50SMA of asset [" + symbol + "]: " + SMA[50]);
        console.log("10SMA of asset [" + symbol + "]: " + SMA[10]);
        return null;
    }
}
