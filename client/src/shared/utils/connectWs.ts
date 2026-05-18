export interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
}

type OnPriceUpdate = (prices: Map<string, CryptoPrice>) => void;

export const connectCryptoWebSocket = (onUpdate: OnPriceUpdate) => {
  const symbols = [
    'btcusdt', // Bitcoin
    'ethusdt', // Ethereum
    'solusdt', // Solana
    'xrpusdt', // XRP
    'dogeusdt', // Dogecoin
    'bnbusdt', // BNB
    'suiusdt', // Sui
    'adausdt', // Cardano
    'dotusdt', // Polkadot
    'linkusdt', // Chainlink
    'avaxusdt', // Avalanche
    'trxusdt', // TRON
    'tonusdt', // Toncoin
    'shibusdt', // Shiba Inu
    'pepeusdt', // Pepe
    'ltcusdt', // Litecoin
    'atomusdt', // Cosmos
    'aptusdt', // Aptos
    'arbusdt', // Arbitrum
    'opusdt', // Optimism
    'nearusdt', // NEAR Protocol
    'injusdt', // Injective
  ];
  const streams = symbols.map((s) => `${s}@ticker`).join('/');
  const url = `${import.meta.env.VITE_BINANCE_WS}/stream?streams=${streams}`;

  let ws: WebSocket | null = null;
  let prices = new Map<string, CryptoPrice>();
  let reconnectTimeout: ReturnType<typeof setTimeout>;

  const connect = () => {
    ws = new WebSocket(url);

    ws.onopen = () => console.log('Connected');

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const { data } = msg;
        const symbol = data.s;

        const price = parseFloat(data.c);
        const change24h = parseFloat(data.P);

        prices.set(symbol, { symbol, price, change24h });
        onUpdate(new Map(prices));
      } catch (err) {
        console.warn('Parse error:', err);
      }
    };

    ws.onclose = () => {
      ws!.onopen = () => console.log('Disconnected');
      reconnectTimeout = setTimeout(connect, 3000);
    };

    ws.onerror = (err) => {
      console.error('Error:', err);
      ws?.close();
    };
  }

  connect();

  return () => {
    clearTimeout(reconnectTimeout);
    ws?.close();
  };
}
