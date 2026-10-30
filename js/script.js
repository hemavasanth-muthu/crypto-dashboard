
/**
 * Aperture — Crypto Research Dashboard Logic
 * Full working functionality across all 4 screens, modals, dropdowns, filters, charts, and exports.
 * Pure Vanilla JavaScript (ES6+), zero dependencies.
 */

(function () {
  'use strict';

  // --- Master Dataset matching Figma designs ---
  const COINS = [
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      rank: 1,
      price: 97842.60,
      change24h: 2.34,
      change7d: 1.82,
      volume24h: '$34.82B',
      volumeRaw: 34820000000,
      marketCap: '$1.94T',
      marketCapRaw: 1940000000000,
      fdv: '$2.05T',
      volCapRatio: '1.79%',
      circSupply: '19.82M BTC',
      maxSupply: '21.00M BTC',
      totalSupply: '19.82M BTC',
      consensus: 'Proof of work',
      genesisDate: '03 Jan 2009',
      ath: '$108,786.00',
      athDate: '20 Jan 2025',
      athChange: '-10.06%',
      atl: '$67.81',
      color: '#f7931a',
      category: 'Layer 1',
      tagline: 'The original decentralized currency',
      description: 'Bitcoin is a decentralized monetary network with a fixed supply of 21 million coins. Transactions are secured by a global proof-of-work network.',
      range24h: '$95,325.10 — $98,104.00',
      dominance: '58.9%',
      turnover: '1.79% of market cap',
      sparkline: [96200, 96500, 96800, 96400, 97100, 97400, 97200, 97600, 97842.60],
      isTrending: true,
      isNew: false
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      rank: 2,
      price: 2746.18,
      change24h: 1.67,
      change7d: -3.24,
      volume24h: '$18.46B',
      volumeRaw: 18460000000,
      marketCap: '$331.00B',
      marketCapRaw: 331000000000,
      fdv: '$331.00B',
      volCapRatio: '5.58%',
      circSupply: '120.53M ETH',
      maxSupply: 'No fixed cap',
      totalSupply: '120.53M ETH',
      consensus: 'Proof of stake',
      genesisDate: '30 Jul 2015',
      ath: '$4,878.26',
      athDate: '10 Nov 2021',
      athChange: '-43.7%',
      atl: '$0.43',
      color: '#475569',
      category: 'Layer 1',
      tagline: 'The leading programmable smart contract platform',
      description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.',
      range24h: '$2,680.00 — $2,780.00',
      dominance: '14.8%',
      turnover: '5.58% of market cap',
      sparkline: [2840, 2820, 2790, 2770, 2760, 2730, 2710, 2730, 2746.18],
      isTrending: true,
      isNew: false
    },
    {
      id: 'solana',
      symbol: 'SOL',
      name: 'Solana',
      rank: 5,
      price: 198.42,
      change24h: -0.82,
      change7d: 4.16,
      volume24h: '$4.23B',
      volumeRaw: 4230000000,
      marketCap: '$96.99B',
      marketCapRaw: 96990000000,
      fdv: '$117.60B',
      volCapRatio: '4.36%',
      circSupply: '488.88M SOL',
      maxSupply: 'No fixed cap',
      totalSupply: '585.00M SOL',
      consensus: 'Proof of stake',
      genesisDate: '16 Mar 2020',
      ath: '$293.31',
      athDate: '19 Jan 2025',
      athChange: '-32.3%',
      atl: '$0.50',
      color: '#0f172a',
      category: 'Layer 1',
      tagline: 'High-speed layer 1 blockchain built for mass adoption',
      description: 'Solana is a decentralized blockchain built to enable scalable, user-friendly apps for the world with low transaction fees.',
      range24h: '$194.50 — $204.00',
      dominance: '3.1%',
      turnover: '4.36% of market cap',
      sparkline: [190, 192, 194, 193, 196, 197, 195, 197, 198.42],
      isTrending: true,
      isNew: false
    },
    {
      id: 'bnb',
      symbol: 'BNB',
      name: 'BNB',
      rank: 6,
      price: 654.12,
      change24h: 0.92,
      change7d: 2.41,
      volume24h: '$1.48B',
      volumeRaw: 1480000000,
      marketCap: '$93.24B',
      marketCapRaw: 93240000000,
      fdv: '$93.24B',
      volCapRatio: '1.58%',
      circSupply: '145.80M BNB',
      maxSupply: '200.00M BNB',
      totalSupply: '145.80M BNB',
      consensus: 'Proof of stake authority',
      genesisDate: '08 Jul 2017',
      ath: '$717.48',
      athDate: '06 Jun 2024',
      athChange: '-8.8%',
      atl: '$0.039',
      color: '#d97706',
      category: 'Layer 1',
      tagline: 'Fueling transactions on the BNB Chain ecosystem',
      description: 'BNB is the cryptocurrency coin that powers the BNB Chain ecosystem, burned quarterly via auto-burn mechanisms.',
      range24h: '$644.00 — $658.00',
      dominance: '2.9%',
      turnover: '1.58% of market cap',
      sparkline: [638, 640, 644, 642, 648, 650, 649, 652, 654.12],
      isTrending: false,
      isNew: false
    },
    {
      id: 'cardano',
      symbol: 'ADA',
      name: 'Cardano',
      rank: 9,
      price: 0.7824,
      change24h: 3.12,
      change7d: 5.38,
      volume24h: '$682.40M',
      volumeRaw: 682400000,
      marketCap: '$27.52B',
      marketCapRaw: 27520000000,
      fdv: '$35.20B',
      volCapRatio: '2.48%',
      circSupply: '35.77B ADA',
      maxSupply: '45.00B ADA',
      totalSupply: '36.50B ADA',
      consensus: 'Ouroboros PoS',
      genesisDate: '29 Sep 2017',
      ath: '$3.10',
      athDate: '02 Sep 2021',
      athChange: '-74.7%',
      atl: '$0.019',
      color: '#2563eb',
      category: 'Layer 1',
      tagline: 'Evidence-based blockchain platform for changemakers',
      description: 'Cardano is a proof-of-stake blockchain platform designed to bring about positive global change.',
      range24h: '$0.7510 — $0.7920',
      dominance: '0.85%',
      turnover: '2.48% of market cap',
      sparkline: [0.74, 0.745, 0.75, 0.76, 0.755, 0.77, 0.768, 0.775, 0.7824],
      isTrending: false,
      isNew: false
    },
    {
      id: 'chainlink',
      symbol: 'LINK',
      name: 'Chainlink',
      rank: 12,
      price: 18.24,
      change24h: -1.26,
      change7d: -2.18,
      volume24h: '$512.80M',
      volumeRaw: 512800000,
      marketCap: '$11.64B',
      marketCapRaw: 11640000000,
      fdv: '$18.24B',
      volCapRatio: '4.40%',
      circSupply: '608.10M LINK',
      maxSupply: '1.00B LINK',
      totalSupply: '1.00B LINK',
      consensus: 'Oracle Network',
      genesisDate: '19 Sep 2017',
      ath: '$52.88',
      athDate: '09 May 2021',
      athChange: '-65.5%',
      atl: '$0.148',
      color: '#1d4ed8',
      category: 'Infrastructure',
      tagline: 'Industry-standard Web3 services platform connecting blockchains',
      description: 'Chainlink connects real-world data and external computation to blockchains.',
      range24h: '$17.90 — $18.80',
      dominance: '0.36%',
      turnover: '4.40% of market cap',
      sparkline: [18.8, 18.7, 18.5, 18.4, 18.6, 18.3, 18.1, 18.3, 18.24],
      isTrending: false,
      isNew: false
    },
    {
      id: 'avalanche',
      symbol: 'AVAX',
      name: 'Avalanche',
      rank: 13,
      price: 25.63,
      change24h: 4.28,
      change7d: 6.72,
      volume24h: '$438.20M',
      volumeRaw: 438200000,
      marketCap: '$10.60B',
      marketCapRaw: 10600000000,
      fdv: '$18.45B',
      volCapRatio: '4.13%',
      circSupply: '408.50M AVAX',
      maxSupply: '720.00M AVAX',
      totalSupply: '445.00M AVAX',
      consensus: 'Avalanche Consensus',
      genesisDate: '21 Sep 2020',
      ath: '$146.22',
      athDate: '21 Nov 2021',
      athChange: '-82.4%',
      atl: '$2.80',
      color: '#e11d48',
      category: 'Layer 1',
      tagline: 'High-speed smart contracts platform built for subnets',
      description: 'Avalanche is a future-proof, highly scalable smart contract platform with sub-second finality.',
      range24h: '$24.20 — $26.10',
      dominance: '0.33%',
      turnover: '4.13% of market cap',
      sparkline: [23.8, 24.1, 24.0, 24.5, 24.8, 25.0, 24.9, 25.4, 25.63],
      isTrending: true,
      isNew: false
    },
    {
      id: 'sui',
      symbol: 'SUI',
      name: 'Sui',
      rank: 14,
      price: 3.420,
      change24h: 5.61,
      change7d: 9.42,
      volume24h: '$946.30M',
      volumeRaw: 946300000,
      marketCap: '$10.57B',
      marketCapRaw: 10570000000,
      fdv: '$34.20B',
      volCapRatio: '8.95%',
      circSupply: '3.09B SUI',
      maxSupply: '10.00B SUI',
      totalSupply: '10.00B SUI',
      consensus: 'Mysten Narwhal/Bullshark',
      genesisDate: '03 May 2023',
      ath: '$3.92',
      athDate: '15 Jan 2025',
      athChange: '-12.7%',
      atl: '$0.364',
      color: '#38bdf8',
      category: 'Layer 1',
      tagline: 'Object-centric layer 1 blockchain powered by Move',
      description: 'Sui is a layer 1 blockchain designed from the ground up for high throughput and sub-second finality.',
      range24h: '$3.18 — $3.48',
      dominance: '0.32%',
      turnover: '8.95% of market cap',
      sparkline: [3.10, 3.15, 3.20, 3.18, 3.25, 3.30, 3.34, 3.38, 3.42],
      isTrending: true,
      isNew: true
    },
    {
      id: 'polkadot',
      symbol: 'DOT',
      name: 'Polkadot',
      rank: 21,
      price: 4.826,
      change24h: 1.14,
      change7d: -1.76,
      volume24h: '$189.60M',
      volumeRaw: 189600000,
      marketCap: '$7.48B',
      marketCapRaw: 7480000000,
      fdv: '$7.48B',
      volCapRatio: '2.53%',
      circSupply: '1.45B DOT',
      maxSupply: 'No fixed cap',
      totalSupply: '1.45B DOT',
      consensus: 'Nominated Proof-of-Stake',
      genesisDate: '26 May 2020',
      ath: '$55.00',
      athDate: '04 Nov 2021',
      athChange: '-91.2%',
      atl: '$2.70',
      color: '#e11d48',
      category: 'Layer 1',
      tagline: 'Sharded multichain protocol connecting public blockchains',
      description: 'Polkadot connects and secures a network of specialized blockchains.',
      range24h: '$4.72 — $4.91',
      dominance: '0.23%',
      turnover: '2.53% of market cap',
      sparkline: [4.92, 4.89, 4.85, 4.82, 4.84, 4.80, 4.79, 4.81, 4.826],
      isTrending: false,
      isNew: false
    }
  ];

  // --- Application State ---
  let currentCoinId = 'bitcoin';
  let watchlistIds = ['bitcoin', 'ethereum', 'solana', 'chainlink', 'avalanche', 'sui'];
  let compareCoinIds = ['bitcoin', 'ethereum', 'solana'];
  let currentCurrency = 'USD';
  let chartMode = 'price'; // 'price' or 'mcap'
  let currentTf = '1D';
  let chartIndicators = { ma: true, ema: false, vol: true, bb: false };
  let marketFilter = { search: 'Layer 1', category: 'l1', mcap: '5b', vol: '100m', sort: 'mcap_desc', tab: 'all' };

  // Helper DOM selectors
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // --- Toast Notification Engine ---
  window.showToast = function (message, duration = 3000) {
    const container = $('#toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOutToast 0.2s forwards';
      setTimeout(() => toast.remove(), 200);
    }, duration);
  };

  // --- CSV Exporter Helper ---
  function downloadCsv(filename, rows) {
    const processRow = (row) =>
      row
        .map((val) => {
          let str = (val === null || val === undefined ? '' : val).toString();
          if (str.search(/("|,|\n)/g) >= 0) str = `"${str.replace(/"/g, '""')}"`;
          return str;
        })
        .join(',');

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(processRow).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.showToast(`Downloaded ${filename}`);
  }

  // --- Format Currency ---
  function formatCurrency(val) {
    const prefix = currentCurrency === 'EUR' ? '€' : currentCurrency === 'GBP' ? '£' : currentCurrency === 'BTC' ? '₿' : '$';
    if (val >= 1000) {
      return `${prefix}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${prefix}${val.toFixed(val < 1 ? 4 : 2)}`;
  }

  // --- Vector Brand SVG Icon Resolver ---
  function getCoinIconSvg(symbol, size = 16) {
    const s = (symbol || '').toUpperCase();
    if (s === 'BTC') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><text x="12" y="17" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="16" fill="#ffffff">₿</text></svg>`;
    }
    if (s === 'ETH') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><path d="M12 2L5 13.5L12 17.5L19 13.5L12 2Z" fill="#ffffff" fill-opacity="0.95"/><path d="M12 2L5 13.5L12 10V2Z" fill="#ffffff" fill-opacity="0.6"/><path d="M12 18.5L5 14.5L12 22L19 14.5L12 18.5Z" fill="#ffffff" fill-opacity="0.95"/><path d="M12 18.5L5 14.5L12 22V18.5Z" fill="#ffffff" fill-opacity="0.6"/></svg>`;
    }
    if (s === 'SOL') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><path d="M4.5 7.2L6.8 4.8H19.5L17.2 7.2H4.5Z" fill="#ffffff"/><path d="M19.5 12L17.2 14.4H4.5L6.8 12H19.5Z" fill="#ffffff"/><path d="M4.5 19.2L6.8 16.8H19.5L17.2 19.2H4.5Z" fill="#ffffff"/></svg>`;
    }
    if (s === 'BNB') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><path d="M12 3L15.5 6.5L12 10L8.5 6.5L12 3Z" fill="#ffffff"/><path d="M6.5 8.5L10 12L6.5 15.5L3 12L6.5 8.5Z" fill="#ffffff"/><path d="M17.5 8.5L21 12L17.5 15.5L14 12L17.5 8.5Z" fill="#ffffff"/><path d="M12 14L15.5 17.5L12 21L8.5 17.5L12 14Z" fill="#ffffff"/><path d="M12 10.2L13.8 12L12 13.8L10.2 12L12 10.2Z" fill="#ffffff"/></svg>`;
    }
    if (s === 'ADA') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3.5" fill="#ffffff"/><circle cx="12" cy="4" r="1.5" fill="#ffffff"/><circle cx="12" cy="20" r="1.5" fill="#ffffff"/><circle cx="4" cy="12" r="1.5" fill="#ffffff"/><circle cx="20" cy="12" r="1.5" fill="#ffffff"/><circle cx="6.3" cy="6.3" r="1.2" fill="#ffffff"/><circle cx="17.7" cy="17.7" r="1.2" fill="#ffffff"/><circle cx="6.3" cy="17.7" r="1.2" fill="#ffffff"/><circle cx="17.7" cy="6.3" r="1.2" fill="#ffffff"/></svg>`;
    }
    if (s === 'AVAX') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><path d="M12 3L4 19H8.5L12 12L15.5 19H20L12 3Z" fill="#ffffff"/><polygon points="12,14.5 10.5,17.5 13.5,17.5" fill="#e84142"/></svg>`;
    }
    if (s === 'SUI') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><path d="M12 3C12 3 6 10.5 6 15C6 18.3 8.7 21 12 21C15.3 21 18 18.3 18 15C18 10.5 12 3 12 3Z" fill="#ffffff"/></svg>`;
    }
    if (s === 'DOT') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="7.5" fill="none" stroke="#ffffff" stroke-width="2.5"/><circle cx="12" cy="12" r="3" fill="#ffffff"/></svg>`;
    }
    if (s === 'LINK') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6.5V17.5L12 22L20 17.5V6.5L12 2Z" fill="none" stroke="#ffffff" stroke-width="2.2"/><path d="M12 7L7.5 9.5V14.5L12 17L16.5 14.5V9.5L12 7Z" fill="#ffffff"/></svg>`;
    }
    return `<span style="font-size:${Math.round(size * 0.75)}px;font-weight:700;color:#ffffff">${s.slice(0, 1)}</span>`;
  }

  // --- View Switching ---
  window.switchTab = function (tabId) {
    $$('.view-panel').forEach((p) => p.classList.remove('active'));
    $$('.nav-link-btn').forEach((b) => b.classList.remove('active'));
    $$('.mobile-nav-btn').forEach((b) => b.classList.remove('active'));

    const targetPanel = $('#' + tabId);
    if (targetPanel) targetPanel.classList.add('active');

    const navBtn = $(`.nav-link-btn[data-target="${tabId}"]`);
    if (navBtn) navBtn.classList.add('active');

    const mobBtn = $(`.mobile-nav-btn[data-target="${tabId}"]`);
    if (mobBtn) mobBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tabId === 'view-overview') renderOverview(currentCoinId);
    else if (tabId === 'view-markets') renderMarketTable();
    else if (tabId === 'view-watchlist') renderWatchlistTable();
    else if (tabId === 'view-compare') renderCompareView();
  };

  // --- Sparkline SVG Generator ---
  function createSparkline(data, isPositive, width = 110, height = 30) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = 3;
    const innerH = height - padding * 2;

    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - padding - ((val - min) / range) * innerH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    const color = isPositive ? '#10b981' : '#ef4444';
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="sparkline-svg">
      <polyline fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" points="${points.join(' ')}" />
    </svg>`;
  }

  // --- Screen 1: Render Overview ---
  function renderOverview(coinId) {
    const coin = COINS.find((c) => c.id === coinId) || COINS[0];
    currentCoinId = coin.id;

    // Breadcrumb
    const bc = $('#bcCoinName');
    if (bc) bc.textContent = coin.name;

    // Logo & Header
    const logoWrapper = $('#coinLogoWrapper');
    if (logoWrapper) {
      logoWrapper.style.backgroundColor = coin.color;
      logoWrapper.innerHTML = getCoinIconSvg(coin.symbol, 28);
    }
    if ($('#coinMainName')) $('#coinMainName').textContent = coin.name;
    if ($('#coinMainSymbol')) $('#coinMainSymbol').textContent = coin.symbol;
    if ($('#coinMainRank')) $('#coinMainRank').textContent = `Rank #${coin.rank}`;
    if ($('#coinMainTagline')) $('#coinMainTagline').textContent = coin.tagline;

    // Watchlist Button
    const isWatched = watchlistIds.includes(coin.id);
    const starSvg = $('#starIconCurrentSvg');
    if (starSvg) {
      starSvg.setAttribute('fill', isWatched ? '#f59e0b' : 'none');
      starSvg.setAttribute('stroke', isWatched ? '#f59e0b' : 'currentColor');
    }
    if ($('#starTextCurrent')) $('#starTextCurrent').textContent = isWatched ? 'In watchlist' : 'Add to watchlist';

    // 4 Metric Cards
    if ($('#heroPriceLabel')) $('#heroPriceLabel').textContent = `${coin.name} price · ${currentCurrency}`;
    if ($('#heroPriceDisplay')) $('#heroPriceDisplay').textContent = formatCurrency(coin.price);
    if ($('#heroDelta24h')) {
      $('#heroDelta24h').textContent = `${coin.change24h >= 0 ? '+' : ''}${coin.change24h.toFixed(2)}%`;
      $('#heroDelta24h').className = `delta-badge ${coin.change24h >= 0 ? 'badge-up' : 'badge-down'}`;
    }
    if ($('#heroRangeText')) $('#heroRangeText').textContent = `24h range ${coin.range24h}`;
    if ($('#heroMarketCapDisplay')) $('#heroMarketCapDisplay').textContent = coin.marketCap;
    if ($('#heroDominanceCaption')) $('#heroDominanceCaption').textContent = `${coin.dominance} market dominance`;
    if ($('#heroVolumeDisplay')) $('#heroVolumeDisplay').textContent = coin.volume24h;
    if ($('#heroTurnoverText')) $('#heroTurnoverText').textContent = coin.turnover;
    if ($('#heroSupplyDisplay')) $('#heroSupplyDisplay').textContent = coin.circSupply.split(' ')[0];
    if ($('#heroSupplyText')) $('#heroSupplyText').textContent = `94.38% of ${coin.maxSupply}`;

    // Sidebar Info
    if ($('#sideRankVal')) $('#sideRankVal').textContent = `#${coin.rank}`;
    if ($('#sideAthVal')) $('#sideAthVal').innerHTML = `${coin.ath} <span class="stat-delta-red">${coin.athChange}</span>`;
    if ($('#sideAthDate')) $('#sideAthDate').textContent = coin.athDate;
    if ($('#sideAtlVal')) $('#sideAtlVal').textContent = coin.atl;
    if ($('#sideConsensusVal')) $('#sideConsensusVal').textContent = coin.consensus;
    if ($('#sideGenesisVal')) $('#sideGenesisVal').textContent = coin.genesisDate;
    if ($('#sideCircSupply')) $('#sideCircSupply').textContent = coin.circSupply;
    if ($('#sideTotalSupply')) $('#sideTotalSupply').textContent = coin.totalSupply;
    if ($('#sideMaxSupply')) $('#sideMaxSupply').textContent = coin.maxSupply;
    if ($('#sideFdvVal')) $('#sideFdvVal').textContent = coin.fdv;
    if ($('#sideAboutTitle')) $('#sideAboutTitle').textContent = `About ${coin.name}`;
    if ($('#sideAboutParagraph')) $('#sideAboutParagraph').textContent = coin.description;

    // Render Chart
    renderMainChart(coin);

    // Populate Subtabs
    renderSubtabMarkets(coin);
    renderSubtabHistory(coin);
    renderSubtabNews(coin);
  }

  // --- Screen 1: Render Interactive Chart ---
  function renderMainChart(coin) {
    const svg = $('#mainCandleChartSvg');
    if (!svg) return;

    const width = 840;
    const height = 360;
    const padR = 60;
    const padB = 40;
    const chartW = width - padR;
    const chartH = height - padB;

    let svgHtml = '';

    if (chartMode === 'mcap') {
      // Market Cap Area View
      const points = [1.88, 1.89, 1.91, 1.90, 1.92, 1.93, 1.91, 1.94];
      const pts = points.map((p, i) => {
        const x = (i / (points.length - 1)) * chartW;
        const y = chartH - ((p - 1.85) / 0.12) * chartH;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });
      const areaPts = `0,${chartH} ${pts.join(' ')} ${chartW},${chartH}`;
      svgHtml += `<polygon points="${areaPts}" fill="#3b82f6" opacity="0.1" />`;
      svgHtml += `<polyline points="${pts.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="2.5" />`;
      svgHtml += `<line x1="0" y1="${chartH / 2}" x2="${chartW}" y2="${chartH / 2}" stroke="#f1f5f9" />`;
      svgHtml += `<text x="${chartW + 8}" y="${chartH / 2 + 4}" fill="#94a3b8" font-size="10.5">1.94T</text>`;
    } else {
      // Candlestick View with 25 candles
      const candles = [
        { o: 95400, h: 95800, l: 95200, c: 95700, v: 420 },
        { o: 95700, h: 96100, l: 95500, c: 95900, v: 510 },
        { o: 95900, h: 96300, l: 95800, c: 96150, v: 480 },
        { o: 96150, h: 96500, l: 96000, c: 96300, v: 530 },
        { o: 96300, h: 96600, l: 96100, c: 96200, v: 390 },
        { o: 96200, h: 96800, l: 96150, c: 96700, v: 620 },
        { o: 96700, h: 97100, l: 96500, c: 96900, v: 710 },
        { o: 96900, h: 97300, l: 96700, c: 96800, v: 580 },
        { o: 96800, h: 97400, l: 96750, c: 97250, v: 640 },
        { o: 97250, h: 97500, l: 97000, c: 97100, v: 590 },
        { o: 97100, h: 97350, l: 96600, c: 96750, v: 680 },
        { o: 96750, h: 96900, l: 96200, c: 96350, v: 820 },
        { o: 96350, h: 96500, l: 95900, c: 96100, v: 910 },
        { o: 96100, h: 96800, l: 96050, c: 96650, v: 760 },
        { o: 96650, h: 97200, l: 96500, c: 97100, v: 830 },
        { o: 97100, h: 97450, l: 96900, c: 97300, v: 690 },
        { o: 97300, h: 97800, l: 97200, c: 97650, v: 920 },
        { o: 97650, h: 98100, l: 97500, c: 97950, v: 1040 },
        { o: 97950, h: 98250, l: 97700, c: 97800, v: 880 },
        { o: 97800, h: 98050, l: 97500, c: 97700, v: 710 },
        { o: 97700, h: 98150, l: 97600, c: 98050, v: 840 },
        { o: 98050, h: 98300, l: 97800, c: 98150, v: 990 },
        { o: 98150, h: 98250, l: 97600, c: 97750, v: 780 },
        { o: 97750, h: 97900, l: 97300, c: 97450, v: 650 },
        { o: 97450, h: 98104, l: 97325, c: coin.price, v: 1284 }
      ];

      const minP = 95200;
      const maxP = 98600;
      const pRange = maxP - minP;
      const stepX = chartW / candles.length;
      const candleW = Math.max(8, stepX * 0.65);
      const maxV = Math.max(...candles.map((c) => c.v));

      // Guidelines & Y-labels
      [98500, 97500, 96500, 95500].forEach((p) => {
        const y = chartH - ((p - minP) / pRange) * chartH;
        svgHtml += `<line x1="0" y1="${y}" x2="${chartW}" y2="${y}" stroke="#f1f5f9" stroke-width="1" />`;
        svgHtml += `<text x="${chartW + 8}" y="${y + 4}" fill="#94a3b8" font-size="10.5">${(p / 1000).toFixed(1)}k</text>`;
      });

      // Horizontal dashed price guideline
      const currentY = chartH - ((coin.price - minP) / pRange) * chartH;
      svgHtml += `<line x1="0" y1="${currentY}" x2="${chartW}" y2="${currentY}" stroke="#10b981" stroke-dasharray="3,3" stroke-width="1" />`;
      svgHtml += `<rect x="${chartW + 2}" y="${currentY - 10}" width="54" height="18" rx="3" fill="#10b981" />`;
      svgHtml += `<text x="${chartW + 6}" y="${currentY + 3}" fill="#ffffff" font-size="9.5" font-weight="700">${coin.price.toFixed(0)}</text>`;

      const maPoints = [];
      const emaPoints = [];

      candles.forEach((c, i) => {
        const cx = i * stepX + stepX / 2;
        const isUp = c.c >= c.o;
        const color = isUp ? '#10b981' : '#ef4444';

        // Volume bar
        if (chartIndicators.vol) {
          const vH = (c.v / maxV) * 55;
          svgHtml += `<rect x="${cx - candleW / 2}" y="${height - vH}" width="${candleW}" height="${vH}" fill="${color}" opacity="0.25" rx="1" />`;
        }

        // Candle Wick
        const yH = chartH - ((c.h - minP) / pRange) * chartH;
        const yL = chartH - ((c.l - minP) / pRange) * chartH;
        svgHtml += `<line x1="${cx}" y1="${yH}" x2="${cx}" y2="${yL}" stroke="${color}" stroke-width="1.5" />`;

        // Candle Body
        const yO = chartH - ((c.o - minP) / pRange) * chartH;
        const yC = chartH - ((c.c - minP) / pRange) * chartH;
        svgHtml += `<rect x="${cx - candleW / 2}" y="${Math.min(yO, yC)}" width="${candleW}" height="${Math.max(2, Math.abs(yC - yO))}" fill="${color}" rx="1" />`;

        // Indicator lines
        const maVal = c.c * 0.993 + (i / candles.length) * 50;
        maPoints.push(`${cx.toFixed(1)},${(chartH - ((maVal - minP) / pRange) * chartH).toFixed(1)}`);
        const emaVal = c.c * 0.996 - (i / candles.length) * 30;
        emaPoints.push(`${cx.toFixed(1)},${(chartH - ((emaVal - minP) / pRange) * chartH).toFixed(1)}`);
      });

      if (chartIndicators.ma) {
        svgHtml += `<polyline fill="none" stroke="#3b82f6" stroke-width="1.4" opacity="0.8" points="${maPoints.join(' ')}" />`;
      }
      if (chartIndicators.ema) {
        svgHtml += `<polyline fill="none" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="2,2" opacity="0.8" points="${emaPoints.join(' ')}" />`;
      }
    }

    // Time Axis Labels
    ['20 Feb', '20:30', '02:30', '08:30', '14:30'].forEach((t, idx) => {
      const tx = (idx / 4) * (chartW - 40) + 10;
      svgHtml += `<text x="${tx}" y="${height - 6}" fill="#94a3b8" font-size="10">${t}</text>`;
    });

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.innerHTML = svgHtml;
  }

  // --- Subtab Renderers ---
  function renderSubtabMarkets(coin) {
    const tbody = $('#subtabMarketsTbody');
    if (!tbody) return;
    const pairs = [
      { ex: 'Binance', pair: `${coin.symbol}/USDT`, price: coin.price, vol: '$12.42B', depth: '$48.2M', conf: 'High' },
      { ex: 'Coinbase', pair: `${coin.symbol}/USD`, price: coin.price + 0.8, vol: '$6.85B', depth: '$32.1M', conf: 'High' },
      { ex: 'Bybit', pair: `${coin.symbol}/USDT`, price: coin.price - 0.4, vol: '$5.10B', depth: '$24.6M', conf: 'High' },
      { ex: 'Kraken', pair: `${coin.symbol}/USD`, price: coin.price + 0.2, vol: '$3.40B', depth: '$18.9M', conf: 'High' },
      { ex: 'OKX', pair: `${coin.symbol}/USDT`, price: coin.price - 0.1, vol: '$2.90B', depth: '$15.2M', conf: 'High' }
    ];
    tbody.innerHTML = pairs
      .map(
        (p, i) => `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${p.ex}</strong></td>
        <td>${p.pair}</td>
        <td style="text-align:right;font-weight:600">${formatCurrency(p.price)}</td>
        <td style="text-align:right">${p.vol}</td>
        <td style="text-align:right">${p.depth}</td>
        <td style="text-align:right"><span class="badge-subtle" style="color:var(--green)">${p.conf}</span></td>
      </tr>
    `
      )
      .join('');
  }

  function renderSubtabHistory(coin) {
    const tbody = $('#subtabHistoryTbody');
    if (!tbody) return;
    const history = [
      { date: '21 Feb 2025', o: 97480, h: 98104, l: 97325, c: 97842, v: '$34.82B', chg: '+2.34%' },
      { date: '20 Feb 2025', o: 96120, h: 97650, l: 95890, c: 97480, v: '$31.40B', chg: '+1.41%' },
      { date: '19 Feb 2025', o: 95400, h: 96800, l: 94900, c: 96120, v: '$28.90B', chg: '+0.75%' },
      { date: '18 Feb 2025', o: 94800, h: 95900, l: 94200, c: 95400, v: '$26.50B', chg: '+0.63%' },
      { date: '17 Feb 2025', o: 95200, h: 95600, l: 94100, c: 94800, v: '$24.10B', chg: '-0.42%' }
    ];
    tbody.innerHTML = history
      .map(
        (h) => `
      <tr>
        <td><strong>${h.date}</strong></td>
        <td style="text-align:right">${formatCurrency(h.o)}</td>
        <td style="text-align:right">${formatCurrency(h.h)}</td>
        <td style="text-align:right">${formatCurrency(h.l)}</td>
        <td style="text-align:right;font-weight:600">${formatCurrency(h.c)}</td>
        <td style="text-align:right">${h.v}</td>
        <td style="text-align:right" class="${h.chg.startsWith('+') ? 'trend-up' : 'trend-down'}">${h.chg}</td>
      </tr>
    `
      )
      .join('');
  }

  function renderSubtabNews(coin) {
    const list = $('#subtabNewsList');
    if (!list) return;
    const news = [
      { title: `${coin.name} Spot ETF Net Inflows Exceed $1.2B in Weekly Record`, src: 'Bloomberg Crypto', time: '18m ago' },
      { title: `Macro Outlook: Federal Reserve Liquidity Injection Boosts Decentralized Assets`, src: 'CoinDesk', time: '1h ago' },
      { title: `On-chain Analysis: Long-term Holders Accumulating Near Historical Highs`, src: 'Glassnode Insight', time: '3h ago' }
    ];
    list.innerHTML = news
      .map(
        (n) => `
      <div class="news-item">
        <a href="#" class="news-title" onclick="window.showToast('Opening article: ' + this.textContent.trim());return false;">${n.title}</a>
        <span class="news-meta">${n.src} · ${n.time}</span>
      </div>
    `
      )
      .join('');
  }

  // --- Screen 2: Market Explorer Table ---
  function renderMarketTable() {
    const tbody = $('#marketTableBody');
    if (!tbody) return;

    let list = [...COINS];

    // Filter by Search
    const searchTerm = (marketFilter.search || '').trim().toLowerCase();
    if (searchTerm && searchTerm !== 'layer 1') {
      list = list.filter((c) => c.name.toLowerCase().includes(searchTerm) || c.symbol.toLowerCase().includes(searchTerm));
    }

    // Filter by Category
    if (marketFilter.category === 'l1') list = list.filter((c) => c.category === 'Layer 1');
    else if (marketFilter.category === 'defi') list = list.filter((c) => c.category === 'DeFi');
    else if (marketFilter.category === 'infra') list = list.filter((c) => c.category === 'Infrastructure');

    // Filter by Tab
    if (marketFilter.tab === 'trending') list = list.filter((c) => c.isTrending);
    else if (marketFilter.tab === 'new') list = list.filter((c) => c.isNew || c.rank > 10);

    // Filter by Mcap
    if (marketFilter.mcap === '5b') list = list.filter((c) => c.marketCapRaw >= 5000000000);
    else if (marketFilter.mcap === '1b') list = list.filter((c) => c.marketCapRaw >= 1000000000);

    // Filter by Volume
    if (marketFilter.vol === '100m') list = list.filter((c) => c.volumeRaw >= 100000000);
    else if (marketFilter.vol === '10m') list = list.filter((c) => c.volumeRaw >= 10000000);

    // Sorting
    const sortVal = marketFilter.sort;
    if (sortVal === 'mcap_desc') list.sort((a, b) => b.marketCapRaw - a.marketCapRaw);
    else if (sortVal === 'mcap_asc') list.sort((a, b) => a.marketCapRaw - b.marketCapRaw);
    else if (sortVal === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sortVal === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sortVal === 'change_desc') list.sort((a, b) => b.change24h - a.change24h);
    else if (sortVal === 'change_asc') list.sort((a, b) => a.change24h - b.change24h);
    else if (sortVal === 'vol_desc') list.sort((a, b) => b.volumeRaw - a.volumeRaw);

    // Update Result Counters
    if ($('#resultsCountDisplay')) $('#resultsCountDisplay').textContent = `${list.length} results`;
    if ($('#paginationInfoText')) $('#paginationInfoText').textContent = `Showing 1–${list.length} of ${list.length} assets`;

    // Render Table Rows
    tbody.innerHTML = list
      .map((coin) => {
        const isWatched = watchlistIds.includes(coin.id);
        const isUp24 = coin.change24h >= 0;
        const isUp7d = coin.change7d >= 0;

        return `
        <tr data-coin-id="${coin.id}">
          <td style="width:36px;text-align:center">
            <span class="star-cell-btn ${isWatched ? 'starred' : ''}" data-id="${coin.id}">${isWatched ? '★' : '☆'}</span>
          </td>
          <td style="width:40px;color:var(--text-muted)">${coin.rank}</td>
          <td>
            <div class="coin-cell-flex">
              <div class="coin-icon-small" style="background:${coin.color}">
                ${getCoinIconSvg(coin.symbol, 16)}
              </div>
              <div>
                <div class="coin-name-bold">${coin.name}</div>
                <div class="coin-symbol-sub">${coin.symbol}</div>
              </div>
            </div>
          </td>
          <td style="text-align:right;font-weight:600">${formatCurrency(coin.price)}</td>
          <td style="text-align:right" class="${isUp24 ? 'trend-up' : 'trend-down'}">${isUp24 ? '+' : ''}${coin.change24h.toFixed(2)}%</td>
          <td style="text-align:right" class="${isUp7d ? 'trend-up' : 'trend-down'}">${isUp7d ? '+' : ''}${coin.change7d.toFixed(2)}%</td>
          <td style="text-align:right">${coin.marketCap}</td>
          <td style="text-align:right">${coin.volume24h}</td>
          <td style="text-align:right">
            ${createSparkline(coin.sparkline, isUp7d, 105, 26)}
          </td>
        </tr>
      `;
      })
      .join('');

    // Attach Row Click
    tbody.querySelectorAll('tr').forEach((row) => {
      row.addEventListener('click', (e) => {
        if (e.target.classList.contains('star-cell-btn')) return;
        const id = row.getAttribute('data-coin-id');
        if (id) {
          renderOverview(id);
          window.switchTab('view-overview');
        }
      });
    });

    // Attach Star Toggle
    tbody.querySelectorAll('.star-cell-btn').forEach((star) => {
      star.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = star.getAttribute('data-id');
        toggleWatchlist(id);
      });
    });
  }

  // --- Sort Helper for Headers ---
  window.sortMarketBy = function (field) {
    if (field === 'rank') marketFilter.sort = 'mcap_desc';
    else if (field === 'price') marketFilter.sort = marketFilter.sort === 'price_desc' ? 'price_asc' : 'price_desc';
    else if (field === 'change24h') marketFilter.sort = marketFilter.sort === 'change_desc' ? 'change_asc' : 'change_desc';
    else if (field === 'change7d') marketFilter.sort = 'change_desc';
    else if (field === 'marketCap') marketFilter.sort = marketFilter.sort === 'mcap_desc' ? 'mcap_asc' : 'mcap_desc';
    else if (field === 'volume') marketFilter.sort = 'vol_desc';

    if ($('#marketSortSelect')) $('#marketSortSelect').value = marketFilter.sort;
    renderMarketTable();
  };

  // --- Screen 3: Watchlist Table ---
  function renderWatchlistTable() {
    const tbody = $('#watchlistTableBody');
    if (!tbody) return;

    const watchedCoins = COINS.filter((c) => watchlistIds.includes(c.id));

    // Update Watchlist Metrics
    const avgChange = watchedCoins.length ? (watchedCoins.reduce((acc, c) => acc + c.change24h, 0) / watchedCoins.length).toFixed(2) : '0.00';
    const advCount = watchedCoins.filter((c) => c.change24h >= 0).length;
    const decCount = watchedCoins.length - advCount;

    if ($('#wlAvgChange')) $('#wlAvgChange').textContent = `${avgChange >= 0 ? '+' : ''}${avgChange}%`;
    if ($('#wlWeightCaption')) $('#wlWeightCaption').textContent = `Equal-weighted · ${watchedCoins.length} assets`;
    if ($('#wlAdvCount')) $('#wlAdvCount').textContent = advCount;
    if ($('#wlDecCount')) $('#wlDecCount').textContent = decCount;
    if ($('#wlListCountText')) $('#wlListCountText').textContent = `${watchedCoins.length} assets`;
    if ($('#wlMainCountBadge')) $('#wlMainCountBadge').textContent = watchedCoins.length;
    if ($('#wlPaginationInfo')) $('#wlPaginationInfo').textContent = `${watchedCoins.length} assets · Main watchlist`;

    // Render Table Rows
    tbody.innerHTML = watchedCoins
      .map((coin) => {
        const isUp24 = coin.change24h >= 0;
        const isUp7d = coin.change7d >= 0;

        return `
        <tr data-coin-id="${coin.id}">
          <td style="width:36px;text-align:center">
            <span class="star-cell-btn starred" data-id="${coin.id}" title="Remove from watchlist">★</span>
          </td>
          <td style="width:40px;color:var(--text-muted)">${coin.rank}</td>
          <td>
            <div class="coin-cell-flex">
              <div class="coin-icon-small" style="background:${coin.color}">
                ${getCoinIconSvg(coin.symbol, 16)}
              </div>
              <div>
                <div class="coin-name-bold">${coin.name}</div>
                <div class="coin-symbol-sub">${coin.symbol}</div>
              </div>
            </div>
          </td>
          <td style="text-align:right;font-weight:600">${formatCurrency(coin.price)}</td>
          <td style="text-align:right" class="${isUp24 ? 'trend-up' : 'trend-down'}">${isUp24 ? '+' : ''}${coin.change24h.toFixed(2)}%</td>
          <td style="text-align:right" class="${isUp7d ? 'trend-up' : 'trend-down'}">${isUp7d ? '+' : ''}${coin.change7d.toFixed(2)}%</td>
          <td style="text-align:right">${coin.marketCap}</td>
          <td style="text-align:right">${coin.volume24h}</td>
          <td style="text-align:right">
            ${createSparkline(coin.sparkline, isUp7d, 105, 26)}
          </td>
        </tr>
      `;
      })
      .join('');

    tbody.querySelectorAll('tr').forEach((row) => {
      row.addEventListener('click', (e) => {
        if (e.target.classList.contains('star-cell-btn')) return;
        const id = row.getAttribute('data-coin-id');
        if (id) {
          renderOverview(id);
          window.switchTab('view-overview');
        }
      });
    });

    tbody.querySelectorAll('.star-cell-btn').forEach((star) => {
      star.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = star.getAttribute('data-id');
        toggleWatchlist(id);
      });
    });
  }

  // --- Toggle Watchlist Helper ---
  function toggleWatchlist(coinId) {
    const coin = COINS.find((c) => c.id === coinId);
    const coinName = coin ? coin.name : coinId;

    if (watchlistIds.includes(coinId)) {
      watchlistIds = watchlistIds.filter((id) => id !== coinId);
      window.showToast(`Removed ${coinName} from watchlist`);
    } else {
      watchlistIds.push(coinId);
      window.showToast(`Added ${coinName} to watchlist`);
    }

    renderOverview(currentCoinId);
    renderMarketTable();
    renderWatchlistTable();
  }

  // --- Screen 4: Render Compare View ---
  function renderCompareView() {
    const selected = COINS.filter((c) => compareCoinIds.includes(c.id));

    // Render Asset Chips
    const chipsContainer = $('#compareSelectorCards');
    if (chipsContainer) {
      chipsContainer.innerHTML = selected
        .map(
          (coin) => `
        <div class="compare-asset-chip">
          <div class="compare-chip-left">
            <div class="coin-icon-small" style="background:${coin.color}">
              ${getCoinIconSvg(coin.symbol, 16)}
            </div>
            <div>
              <div class="compare-chip-title">${coin.name} <span style="font-weight:400;color:var(--text-muted);font-size:12px">${coin.symbol}</span></div>
              <div class="compare-chip-sub">Rank #${coin.rank} · ${coin.category}</div>
            </div>
          </div>
          <span class="compare-chip-close" data-remove-id="${coin.id}" title="Remove asset">✕</span>
        </div>
      `
        )
        .join('');

      chipsContainer.querySelectorAll('.compare-chip-close').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-remove-id');
          if (compareCoinIds.length <= 2) {
            window.showToast('Comparison requires at least 2 assets');
            return;
          }
          compareCoinIds = compareCoinIds.filter((cid) => cid !== id);
          renderCompareView();
        });
      });
    }

    if ($('#compareSelectedCountText')) {
      $('#compareSelectedCountText').textContent = `${selected.length} of 3 assets selected · Replace any asset to update your research set`;
    }

    // Render Multi-line Chart
    renderCompareChart(selected);

    // Render Matrix Table
    renderCompareMatrix(selected);
  }

  // --- Compare Chart Multi-Line Renderer ---
  function renderCompareChart(selectedCoins) {
    const svg = $('#compareChartSvg');
    const legendRow = $('#compareLegendRow');
    if (!svg) return;

    const width = 840;
    const height = 280;
    const padR = 45;
    const padB = 30;
    const chartW = width - padR;
    const chartH = height - padB;

    const colors = ['#0f172a', '#475569', '#3b82f6', '#f59e0b'];
    const minVal = -5;
    const maxVal = 5;
    const valRange = maxVal - minVal;

    let svgHtml = '';

    // Guidelines
    [4, 2, 0, -2, -4].forEach((lvl) => {
      const y = chartH - ((lvl - minVal) / valRange) * chartH;
      const isZero = lvl === 0;
      svgHtml += `<line x1="0" y1="${y}" x2="${chartW}" y2="${y}" stroke="${isZero ? '#cbd5e1' : '#f1f5f9'}" stroke-width="${isZero ? 1.5 : 1}" />`;
      svgHtml += `<text x="${chartW + 8}" y="${y + 4}" fill="#94a3b8" font-size="10.5">${lvl >= 0 ? '+' : ''}${lvl}%</text>`;
    });

    const series = selectedCoins.map((coin, idx) => {
      const sign = coin.change7d >= 0 ? 1 : -1;
      const points = [0, 0.4 * sign, 0.8 * sign, 0.6 * sign, 1.4 * sign, 1.2 * sign, 2.1 * sign, 1.8 * sign, coin.change7d];
      return { coin, color: colors[idx % colors.length], points };
    });

    series.forEach((s) => {
      const pts = s.points.map((val, i) => {
        const x = (i / (s.points.length - 1)) * chartW;
        const y = chartH - ((val - minVal) / valRange) * chartH;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });
      svgHtml += `<polyline fill="none" stroke="${s.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="${pts.join(' ')}" />`;
    });

    ['15 Feb', '17 Feb', '19 Feb', '21 Feb'].forEach((d, idx) => {
      const dx = (idx / 3) * (chartW - 40) + 10;
      svgHtml += `<text x="${dx}" y="${height - 6}" fill="#94a3b8" font-size="10">${d}</text>`;
    });

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.innerHTML = svgHtml;

    if (legendRow) {
      legendRow.innerHTML = series
        .map(
          (s) => `
        <div class="legend-item">
          <span class="legend-line" style="background:${s.color}"></span>
          <span>${s.coin.symbol}</span>
          <span style="color:${s.coin.change7d >= 0 ? 'var(--green)' : 'var(--red)'}">${s.coin.change7d >= 0 ? '+' : ''}${s.coin.change7d.toFixed(2)}%</span>
        </div>
      `
        )
        .join('');
    }
  }

  // --- Compare Fundamentals Matrix Table ---
  function renderCompareMatrix(coins) {
    const table = $('#compareMatrixTable');
    if (!table || !coins.length) return;

    let headersHtml = `<tr><th style="width:25%">Research metric</th>` + coins.map((c) => `<th style="text-align:right">${c.name}</th>`).join('') + `</tr>`;

    let rowsHtml = `
      <thead>${headersHtml}</thead>
      <tbody>
        <tr class="matrix-section-row"><td colspan="${coins.length + 1}">Valuation & liquidity</td></tr>
        <tr><td>Price</td>${coins.map((c) => `<td style="font-weight:600">${formatCurrency(c.price)}</td>`).join('')}</tr>
        <tr><td>24h change</td>${coins.map((c) => `<td class="${c.change24h >= 0 ? 'trend-up' : 'trend-down'}">${c.change24h >= 0 ? '+' : ''}${c.change24h.toFixed(2)}%</td>`).join('')}</tr>
        <tr><td>Market cap</td>${coins.map((c) => `<td>${c.marketCap}</td>`).join('')}</tr>
        <tr><td>Volume (24h)</td>${coins.map((c) => `<td>${c.volume24h}</td>`).join('')}</tr>
        <tr><td>Volume / cap</td>${coins.map((c) => `<td>${c.volCapRatio}</td>`).join('')}</tr>
        <tr><td>Fully diluted value</td>${coins.map((c) => `<td>${c.fdv}</td>`).join('')}</tr>

        <tr class="matrix-section-row"><td colspan="${coins.length + 1}">Network & supply</td></tr>
        <tr><td>Circulating supply</td>${coins.map((c) => `<td>${c.circSupply}</td>`).join('')}</tr>
        <tr><td>Maximum supply</td>${coins.map((c) => `<td>${c.maxSupply}</td>`).join('')}</tr>
        <tr><td>Consensus</td>${coins.map((c) => `<td>${c.consensus}</td>`).join('')}</tr>
        <tr><td>All-time high</td>${coins.map((c) => `<td>${c.ath}</td>`).join('')}</tr>
      </tbody>
    `;

    table.innerHTML = rowsHtml;
  }

  // --- Global Search Modal (⌘K) ---
  window.openSearchModal = function () {
    const modal = $('#searchModal');
    if (modal) {
      modal.classList.add('open');
      const input = $('#modalSearchField');
      if (input) {
        input.value = '';
        input.focus();
        renderSearchResults('');
      }
    }
  };

  window.closeSearchModal = function () {
    const modal = $('#searchModal');
    if (modal) modal.classList.remove('open');
  };

  function renderSearchResults(query) {
    const container = $('#modalSearchResults');
    if (!container) return;

    const q = query.toLowerCase().trim();
    const matches = COINS.filter((c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));

    container.innerHTML = matches
      .map(
        (coin) => `
      <div class="search-item-row" data-id="${coin.id}">
        <div class="coin-cell-flex">
          <div class="coin-icon-small" style="background:${coin.color}">
            ${getCoinIconSvg(coin.symbol, 16)}
          </div>
          <div>
            <div class="coin-name-bold">${coin.name}</div>
            <div class="coin-symbol-sub">${coin.symbol} · Rank #${coin.rank}</div>
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:600">${formatCurrency(coin.price)}</div>
          <div class="${coin.change24h >= 0 ? 'trend-up' : 'trend-down'}" style="font-size:11px">
            ${coin.change24h >= 0 ? '+' : ''}${coin.change24h.toFixed(2)}%
          </div>
        </div>
      </div>
    `
      )
      .join('');

    container.querySelectorAll('.search-item-row').forEach((row) => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-id');
        if (id) {
          renderOverview(id);
          window.switchTab('view-overview');
          window.closeSearchModal();
        }
      });
    });
  }

  // --- Setup All Interactive Listeners ---
  function setupListeners() {
    // 1. Navigation Tabs
    $$('.nav-link-btn, .mobile-nav-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        if (target) window.switchTab(target);
      });
    });
    if ($('#navBrandLogo')) {
      $('#navBrandLogo').addEventListener('click', () => window.switchTab('view-overview'));
    }

    // 2. Global Dropdowns (Currency, Notifications, User)
    const setupDropdown = (btnId, menuId) => {
      const btn = $('#' + btnId);
      const menu = $('#' + menuId);
      if (btn && menu) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          $$('.dropdown-menu').forEach((m) => {
            if (m !== menu) m.classList.remove('open');
          });
          menu.classList.toggle('open');
        });
      }
    };

    setupDropdown('currencyBtn', 'currencyMenu');
    setupDropdown('notifBtn', 'notifMenu');
    setupDropdown('userAvatarBtn', 'userMenu');
    setupDropdown('btnIndicators', 'indicatorsMenu');
    setupDropdown('btnColumnsPicker', 'columnsMenu');

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown-wrapper')) {
        $$('.dropdown-menu').forEach((m) => m.classList.remove('open'));
      }
    });

    // Currency Switcher items
    $$('#currencyMenu .dropdown-item').forEach((item) => {
      item.addEventListener('click', () => {
        const cur = item.getAttribute('data-currency');
        if (cur) {
          currentCurrency = cur;
          if ($('#currentCurrencyLabel')) $('#currentCurrencyLabel').textContent = cur;
          if ($('#chartCurBtn')) $('#chartCurBtn').textContent = `${cur} ▾`;
          $$('#currencyMenu .dropdown-item').forEach((i) => i.classList.remove('active'));
          item.classList.add('active');
          window.showToast(`Currency changed to ${cur}`);
          renderOverview(currentCoinId);
          renderMarketTable();
          renderWatchlistTable();
        }
      });
    });

    // 3. Search Modal Trigger & Shortcuts
    if ($('#globalSearchTrigger')) $('#globalSearchTrigger').addEventListener('click', window.openSearchModal);
    if ($('#modalCloseBtn')) $('#modalCloseBtn').addEventListener('click', window.closeSearchModal);
    if ($('#modalSearchField')) $('#modalSearchField').addEventListener('input', (e) => renderSearchResults(e.target.value));

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.openSearchModal();
      }
      if (e.key === 'Escape') {
        window.closeSearchModal();
        if ($('#setAlertModal')) $('#setAlertModal').classList.remove('open');
        if ($('#manageListsModal')) $('#manageListsModal').classList.remove('open');
        $$('.dropdown-menu').forEach((m) => m.classList.remove('open'));
      }
    });

    // 4. Screen 1: Sub-tabs
    $$('#researchSubTabs .sub-tab-btn').forEach((tab) => {
      tab.addEventListener('click', () => {
        $$('#researchSubTabs .sub-tab-btn').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const sub = tab.getAttribute('data-subtab');
        ['overview', 'markets', 'historical', 'onchain', 'news'].forEach((s) => {
          const el = $('#subtab-content-' + s);
          if (el) el.style.display = s === sub ? 'block' : 'none';
        });
      });
    });

    // 5. Screen 1: Chart Mode & Timeframes
    if ($('#btnModePrice')) {
      $('#btnModePrice').addEventListener('click', () => {
        chartMode = 'price';
        $('#btnModePrice').classList.add('active');
        if ($('#btnModeMcap')) $('#btnModeMcap').classList.remove('active');
        renderMainChart(COINS.find((c) => c.id === currentCoinId));
      });
    }
    if ($('#btnModeMcap')) {
      $('#btnModeMcap').addEventListener('click', () => {
        chartMode = 'mcap';
        $('#btnModeMcap').classList.add('active');
        if ($('#btnModePrice')) $('#btnModePrice').classList.remove('active');
        renderMainChart(COINS.find((c) => c.id === currentCoinId));
      });
    }

    $$('#chartTimeframes .tf-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('#chartTimeframes .tf-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentTf = btn.getAttribute('data-tf');
        renderMainChart(COINS.find((c) => c.id === currentCoinId));
        window.showToast(`Timeframe set to ${currentTf}`);
      });
    });

    // Chart Fullscreen Toggle
    if ($('#btnFullscreenChart')) {
      $('#btnFullscreenChart').addEventListener('click', () => {
        const card = $('#mainChartCard');
        if (card) {
          card.classList.toggle('fullscreen-mode');
          renderMainChart(COINS.find((c) => c.id === currentCoinId));
        }
      });
    }

    // Chart Indicators Checkboxes
    ['chkMA', 'chkEMA', 'chkVol', 'chkBB'].forEach((chkId) => {
      const chk = $('#' + chkId);
      if (chk) {
        chk.addEventListener('change', () => {
          if (chkId === 'chkMA') chartIndicators.ma = chk.checked;
          if (chkId === 'chkEMA') chartIndicators.ema = chk.checked;
          if (chkId === 'chkVol') chartIndicators.vol = chk.checked;
          renderMainChart(COINS.find((c) => c.id === currentCoinId));
        });
      }
    });

    // Token Supply Refresh
    if ($('#btnRefreshSupply')) {
      $('#btnRefreshSupply').addEventListener('click', () => {
        const icon = $('#btnRefreshSupply');
        icon.style.transform = 'rotate(360deg)';
        icon.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
          icon.style.transform = 'none';
          icon.style.transition = 'none';
          window.showToast('Token supply verified from RPC node');
        }, 500);
      });
    }

    // Star Watchlist Current Coin
    if ($('#btnToggleWatchlistCurrent')) {
      $('#btnToggleWatchlistCurrent').addEventListener('click', () => {
        toggleWatchlist(currentCoinId);
      });
    }

    // Compare Current Coin
    if ($('#btnCompareCurrent')) {
      $('#btnCompareCurrent').addEventListener('click', () => {
        if (!compareCoinIds.includes(currentCoinId)) {
          compareCoinIds[0] = currentCoinId;
        }
        window.switchTab('view-compare');
      });
    }

    // Set Alert Modal
    if ($('#btnOpenSetAlert')) {
      $('#btnOpenSetAlert').addEventListener('click', () => {
        const modal = $('#setAlertModal');
        const sel = $('#alertCoinSelect');
        if (sel) {
          sel.innerHTML = COINS.map((c) => `<option value="${c.id}" ${c.id === currentCoinId ? 'selected' : ''}>${c.name} (${c.symbol})</option>`).join('');
        }
        if (modal) modal.classList.add('open');
      });
    }
    if ($('#btnCloseAlertModal')) {
      $('#btnCloseAlertModal').addEventListener('click', () => {
        if ($('#setAlertModal')) $('#setAlertModal').classList.remove('open');
      });
    }
    if ($('#btnSubmitCreateAlert')) {
      $('#btnSubmitCreateAlert').addEventListener('click', () => {
        const coinSelect = $('#alertCoinSelect');
        const condSelect = $('#alertConditionSelect');
        const priceInput = $('#alertPriceInput');
        const coin = COINS.find((c) => c.id === (coinSelect ? coinSelect.value : 'bitcoin')) || COINS[0];
        const price = priceInput ? priceInput.value : '100000';
        const cond = condSelect ? condSelect.value : 'above';

        const list = $('#activeAlertsList');
        if (list) {
          const item = document.createElement('div');
          item.className = 'alert-item';
          item.innerHTML = `
            <div class="alert-info">
              <div class="alert-icon-dot" style="background:${coin.color}">${getCoinIconSvg(coin.symbol, 14)}</div>
              <div>
                <strong>${coin.name} ${cond} $${Number(price).toLocaleString()}</strong>
                <span>New custom alert · Email notification</span>
              </div>
            </div>
            <span class="alert-status-badge">Watching</span>
          `;
          list.prepend(item);
        }

        if ($('#setAlertModal')) $('#setAlertModal').classList.remove('open');
        window.showToast(`Alert created: ${coin.name} ${cond} $${Number(price).toLocaleString()}`);
      });
    }

    // 6. Screen 2: Filters & Search
    if ($('#marketTableSearchInput')) {
      $('#marketTableSearchInput').addEventListener('input', (e) => {
        marketFilter.search = e.target.value;
        renderMarketTable();
      });
    }
    if ($('#searchClearBtn')) {
      $('#searchClearBtn').addEventListener('click', () => {
        if ($('#marketTableSearchInput')) $('#marketTableSearchInput').value = '';
        marketFilter.search = '';
        renderMarketTable();
      });
    }
    if ($('#btnToggleFiltersRow')) {
      $('#btnToggleFiltersRow').addEventListener('click', () => {
        const row = $('#filterDropdownsRow');
        if (row) row.style.display = row.style.display === 'none' ? 'flex' : 'none';
      });
    }
    if ($('#marketCategorySelect')) {
      $('#marketCategorySelect').addEventListener('change', (e) => {
        marketFilter.category = e.target.value;
        renderMarketTable();
      });
    }
    if ($('#marketMcapFilter')) {
      $('#marketMcapFilter').addEventListener('change', (e) => {
        marketFilter.mcap = e.target.value;
        renderMarketTable();
      });
    }
    if ($('#marketVolFilter')) {
      $('#marketVolFilter').addEventListener('change', (e) => {
        marketFilter.vol = e.target.value;
        renderMarketTable();
      });
    }
    if ($('#marketSortSelect')) {
      $('#marketSortSelect').addEventListener('change', (e) => {
        marketFilter.sort = e.target.value;
        renderMarketTable();
      });
    }
    if ($('#btnResetAllFilters')) {
      $('#btnResetAllFilters').addEventListener('click', () => {
        marketFilter = { search: '', category: 'all', mcap: 'all', vol: 'all', sort: 'mcap_desc', tab: 'all' };
        if ($('#marketTableSearchInput')) $('#marketTableSearchInput').value = '';
        if ($('#marketCategorySelect')) $('#marketCategorySelect').value = 'all';
        if ($('#marketMcapFilter')) $('#marketMcapFilter').value = 'all';
        if ($('#marketVolFilter')) $('#marketVolFilter').value = 'all';
        if ($('#marketSortSelect')) $('#marketSortSelect').value = 'mcap_desc';
        renderMarketTable();
        window.showToast('All filters reset');
      });
    }

    // Category Pills in Market Explorer
    $$('#marketCategoryTabs .cat-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        $$('#marketCategoryTabs .cat-pill').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        marketFilter.tab = pill.getAttribute('data-cat');
        renderMarketTable();
      });
    });

    // 7. Screen 3: Watchlist Actions
    if ($('#btnManageWatchlists')) {
      $('#btnManageWatchlists').addEventListener('click', () => {
        if ($('#manageListsModal')) $('#manageListsModal').classList.add('open');
      });
    }
    if ($('#btnCloseListsModal')) {
      $('#btnCloseListsModal').addEventListener('click', () => {
        if ($('#manageListsModal')) $('#manageListsModal').classList.remove('open');
      });
    }
    if ($('#btnConfirmCreateList')) {
      $('#btnConfirmCreateList').addEventListener('click', () => {
        const input = $('#newListNameInput');
        const name = input ? input.value.trim() : '';
        if (name) {
          const tabGroup = $('#watchlistTabGroup');
          if (tabGroup) {
            const btn = document.createElement('button');
            btn.className = 'wl-tab';
            btn.textContent = `${name} · 0`;
            btn.addEventListener('click', () => {
              $$('#watchlistTabGroup .wl-tab').forEach((t) => t.classList.remove('active'));
              btn.classList.add('active');
              window.showToast(`Switched to list: ${name}`);
            });
            tabGroup.insertBefore(btn, $('#btnCreateNewList'));
          }
          if ($('#manageListsModal')) $('#manageListsModal').classList.remove('open');
          input.value = '';
          window.showToast(`Created watchlist: ${name}`);
        }
      });
    }

    // Compare Watchlist button
    if ($('#btnCompareWatchlistAssets')) {
      $('#btnCompareWatchlistAssets').addEventListener('click', () => {
        compareCoinIds = watchlistIds.slice(0, 3);
        window.switchTab('view-compare');
      });
    }

    // Research Notebook Editable Mode
    if ($('#btnEditNote')) {
      $('#btnEditNote').addEventListener('click', () => {
        const display = $('#notesDisplayBody');
        const form = $('#notesEditForm');
        const h = $('#noteHeadingText');
        const p = $('#noteParagraphText');
        const inH = $('#editNoteHeading');
        const inC = $('#editNoteContent');

        if (display && form && inH && inC && h && p) {
          inH.value = h.textContent;
          inC.value = p.textContent.trim();
          display.style.display = 'none';
          form.style.display = 'block';
        }
      });
    }
    if ($('#btnCancelNote')) {
      $('#btnCancelNote').addEventListener('click', () => {
        if ($('#notesDisplayBody')) $('#notesDisplayBody').style.display = 'block';
        if ($('#notesEditForm')) $('#notesEditForm').style.display = 'none';
      });
    }
    if ($('#btnSaveNote')) {
      $('#btnSaveNote').addEventListener('click', () => {
        const inH = $('#editNoteHeading');
        const inC = $('#editNoteContent');
        const h = $('#noteHeadingText');
        const p = $('#noteParagraphText');
        if (inH && inC && h && p) {
          h.textContent = inH.value;
          p.textContent = inC.value;
          if ($('#noteTimestampText')) $('#noteTimestampText').textContent = `Personal note · Updated Just now`;
          if ($('#notesDisplayBody')) $('#notesDisplayBody').style.display = 'block';
          if ($('#notesEditForm')) $('#notesEditForm').style.display = 'none';
          window.showToast('Research note saved');
        }
      });
    }

    // 8. Screen 4: Compare Actions
    if ($('#btnShareCompare')) {
      $('#btnShareCompare').addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          window.showToast('Shareable link copied to clipboard!');
        } else {
          window.showToast('Link ready to share: ' + window.location.href);
        }
      });
    }

    $$('#compareTimeframes .tf-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('#compareTimeframes .tf-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderCompareChart(COINS.filter((c) => compareCoinIds.includes(c.id)));
        window.showToast(`Comparison timeframe: ${btn.getAttribute('data-tf')}`);
      });
    });

    // 9. CSV Exports
    if ($('#btnExportMarketCsv')) {
      $('#btnExportMarketCsv').addEventListener('click', () => {
        const rows = [
          ['Rank', 'Name', 'Symbol', 'Price (USD)', '24h Change (%)', '7d Change (%)', 'Market Cap (USD)', '24h Volume (USD)'],
          ...COINS.map((c) => [c.rank, c.name, c.symbol, c.price, c.change24h, c.change7d, c.marketCap, c.volume24h])
        ];
        downloadCsv('aperture_market_data.csv', rows);
      });
    }

    if ($('#btnExportWatchlistCsv')) {
      $('#btnExportWatchlistCsv').addEventListener('click', () => {
        const watched = COINS.filter((c) => watchlistIds.includes(c.id));
        const rows = [
          ['Rank', 'Name', 'Symbol', 'Price (USD)', '24h Change (%)', '7d Change (%)', 'Market Cap (USD)', '24h Volume (USD)'],
          ...watched.map((c) => [c.rank, c.name, c.symbol, c.price, c.change24h, c.change7d, c.marketCap, c.volume24h])
        ];
        downloadCsv('aperture_watchlist.csv', rows);
      });
    }

    if ($('#btnExportCompareCsv')) {
      $('#btnExportCompareCsv').addEventListener('click', () => {
        const selected = COINS.filter((c) => compareCoinIds.includes(c.id));
        const rows = [
          ['Research Metric', ...selected.map((c) => c.name)],
          ['Price (USD)', ...selected.map((c) => c.price)],
          ['24h Change (%)', ...selected.map((c) => c.change24h)],
          ['Market Cap', ...selected.map((c) => c.marketCap)],
          ['24h Volume', ...selected.map((c) => c.volume24h)],
          ['Circulating Supply', ...selected.map((c) => c.circSupply)],
          ['Max Supply', ...selected.map((c) => c.maxSupply)],
          ['Consensus', ...selected.map((c) => c.consensus)],
          ['All-time High', ...selected.map((c) => c.ath)]
        ];
        downloadCsv('aperture_comparison_matrix.csv', rows);
      });
    }

    if ($('#btnExportFullData')) {
      $('#btnExportFullData').addEventListener('click', () => {
        const rows = [
          ['Rank', 'Name', 'Symbol', 'Price', '24h %', '7d %', 'Market Cap', 'Volume 24h', 'FDV', 'Circulating Supply', 'Consensus'],
          ...COINS.map((c) => [c.rank, c.name, c.symbol, c.price, c.change24h, c.change7d, c.marketCap, c.volume24h, c.fdv, c.circSupply, c.consensus])
        ];
        downloadCsv('aperture_full_cryptocurrency_dataset.csv', rows);
      });
    }

    if ($('#btnExportHistoryCsv')) {
      $('#btnExportHistoryCsv').addEventListener('click', () => {
        const rows = [
          ['Date', 'Open', 'High', 'Low', 'Close', 'Volume'],
          ['21 Feb 2025', 97480, 98104, 97325, 97842, '$34.82B'],
          ['20 Feb 2025', 96120, 97650, 95890, 97480, '$31.40B'],
          ['19 Feb 2025', 95400, 96800, 94900, 96120, '$28.90B'],
          ['18 Feb 2025', 94800, 95900, 94200, 95400, '$26.50B']
        ];
        downloadCsv('bitcoin_historical_data.csv', rows);
      });
    }

    // 10. Interactive Chart Crosshair Engine
    const canvasWrap = $('#chartCanvasWrapper');
    if (canvasWrap) {
      const lineX = $('#chartCrosshairX');
      const lineY = $('#chartCrosshairY');
      const labelY = $('#chartCrosshairLabelY');
      const labelX = $('#chartCrosshairLabelX');

      canvasWrap.addEventListener('mousemove', (e) => {
        const rect = canvasWrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x <= rect.width - 60 && y >= 0 && y <= rect.height - 40) {
          if (lineX) {
            lineX.style.display = 'block';
            lineX.style.left = `${x}px`;
          }
          if (lineY) {
            lineY.style.display = 'block';
            lineY.style.top = `${y}px`;
          }
          if (labelY) {
            const relY = 1 - y / (rect.height - 40);
            const interpPrice = 95200 + relY * 3400;
            labelY.style.display = 'block';
            labelY.style.top = `${y}px`;
            labelY.textContent = `$${interpPrice.toFixed(0)}`;
          }
          if (labelX) {
            labelX.style.display = 'block';
            labelX.style.left = `${x}px`;
            labelX.textContent = '14:30';
          }
        }
      });

      canvasWrap.addEventListener('mouseleave', () => {
        if (lineX) lineX.style.display = 'none';
        if (lineY) lineY.style.display = 'none';
        if (labelY) labelY.style.display = 'none';
        if (labelX) labelX.style.display = 'none';
      });
    }
  }

  // --- Initializer ---
  function init() {
    setupListeners();

    // Default to Screen 1: Research (Bitcoin)
    renderOverview('bitcoin');
    renderMarketTable();
    renderWatchlistTable();
    renderCompareView();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
