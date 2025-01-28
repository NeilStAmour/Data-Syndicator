
import { SyndicatorEngine } from "./syndicatorEngine";
import { MarketData } from "./types/marketData";

const syndicatorEngine = new SyndicatorEngine();
const symbol = "AAPL";
const interval = "1day";
const outputSize = 5;

main();

export async function main() {
    console.log("Establishing connection to Market Entity...")
    const stockData: MarketData | Error = await syndicatorEngine.getData(symbol, interval, outputSize);
    if (stockData instanceof Error) {
        console.log("Error establishing connection to Market Entity:")
        console.log(Error)
    } else {
        console.log("Connection to Market Entity established...")
        const average: number = syndicatorEngine.getAverage(stockData, outputSize);
        console.log("Average stock price over last " + outputSize + " days: " + average);
    }
    return;
}