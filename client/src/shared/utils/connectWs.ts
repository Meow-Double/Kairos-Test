// src/services/cryptoWebSocket.ts
export interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
}

type OnPriceUpdate = (prices: Map<string, CryptoPrice>) => void;

export function connectCryptoWebSocket(onUpdate: OnPriceUpdate) {
  const symbols = [
    // Ваши текущие (исправленные)
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
  const url = `wss://stream.binance.com:9443/stream?streams=${streams}`;

  let ws: WebSocket | null = null;
  let prices = new Map<string, CryptoPrice>();
  let reconnectTimeout: NodeJS.Timeout;

  function connect() {
    ws = new WebSocket(url);

    ws.onopen = () => console.log('[CryptoWS] Connected');

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const { stream, data } = msg;
        const symbol = data.s; // BTCUSDT\

        const price = parseFloat(data.c);
        const change24h = parseFloat(data.P);

        prices.set(symbol, { symbol, price, change24h });
        onUpdate(new Map(prices));
      } catch (err) {
        console.warn('[CryptoWS] Parse error:', err);
      }
    };

    ws.onclose = () => {
      console.warn('[CryptoWS] Disconnected. Reconnecting in 3s...');
      reconnectTimeout = setTimeout(connect, 3000);
    };

    ws.onerror = (err) => {
      console.error('[CryptoWS] Error:', err);
      ws?.close();
    };
  }

  connect();

  // Возвращаем функцию для корректного отключения
  return () => {
    clearTimeout(reconnectTimeout);
    ws?.close();
  };
}
