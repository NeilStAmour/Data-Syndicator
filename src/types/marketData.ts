export interface MarketData {
    meta: EntityData,
    values: MarketValues[],
    status: string
}

export interface MarketError {
    code: number,
    message: string,
    status: string,
    meta: EntityData
}

export interface MarketValues {
    datetime: string,
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string
}

export interface EntityData {
    symbol?: string,
    interval?: string,
    currency?: string,
    exchange_timezone?: string,
    exchange?: string,
    mic_code?: string,
    type?: string,
    outputsize?: number
}

export interface MovingAverages {
    [key: number]: number;
}
