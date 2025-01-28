
import twelvedata from "twelvedata";
import { config } from "./config/config";
import { MarketData } from "./types/marketData";

// Define an interface for the function's return type
interface stockValues {
    greeting: string;
    ageInFiveYears: number;
    status: string;
}

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
    async getData(symbol: string, interval: string, outputSize: number): Promise<MarketData | Error> {
        let params = {
            symbol: symbol,
            interval: interval,
            outputsize: outputSize,
        };

        let data;

        try {
            data = await this.client.timeSeries(params);
            return data;
        } catch (error) {
            return new Error((error as Error).message)
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
}
