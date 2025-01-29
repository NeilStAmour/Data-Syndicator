
import { SyndicatorEngine } from "./syndicatorEngine";
import { MarketData } from "./types/marketData";

const syndicatorEngine = new SyndicatorEngine();
const symbol = "RY";

main();

export async function main() {
    syndicatorEngine.marketPrognostication(symbol);
    return;
}
