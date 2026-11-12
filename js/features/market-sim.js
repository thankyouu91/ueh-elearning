// Interactive demand & supply simulator: shift curves, add a price ceiling or a tax, read equilibrium.
import { cssVar } from '../ui.js';

const state = {};

export function stopMarketSim() { /* event-driven, nothing to stop */ }

export function marketSimHtml(id = 'market-sim') {
  return `<div class="card" style="box-shadow:none"><div class="card-body">
    <div class="grid" style="gap:16px">
      <div class="span-8"><canvas id="${id}" width="560" height="360" style="width:100%;height:auto" aria-label="Demand and supply diagram"></canvas></div>
      <div class="span-4 stack gap-3">
        <label class="field"><span>Demand shift <b id="${id}-dv">0</b></span><input type="range" min="-40" max="40" value="0" data-sim="${id}" data-k="d"></label>
        <label class="field"><span>Supply shift <b id="${id}-sv">0</b></span><input type="range" min="-40" max="40" value="0" data-sim="${id}" data-k="s"></label>
        <label class="field"><span>Price ceiling <b id="${id}-cv">off</b></span><input type="range" min="0" max="90" value="0" data-sim="${id}" data-k="c"></label>
        <label class="field"><span>Tax per unit <b id="${id}-tv">0</b></span><input type="range" min="0" max="30" value="0" data-sim="${id}" data-k="t"></label>
        <div class="note note-info small" style="display:block;line-height:1.55" id="${id}-out"></div>
      </div>
    </div></div></div>`;
}

export function startMarketSim(id = 'market-sim') {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  state[id] = { d: 0, s: 0, c: 0, t: 0 };
  document.querySelectorAll(`[data-sim="${id}"]`).forEach(inp => inp.addEventListener('input', () => {
    state[id][inp.dataset.k] = Number(inp.value);
    draw(id);
  }));
  draw(id);
}

// Demand: P = 100 + d − Q ; Supply: P = 10 − s + t + 0.8·Q   (Q and P in index units)
function solve({ d, s, t }) {
  const q = (100 + d - (10 - s + t)) / 1.8;
  return { q, pBuyer: 100 + d - q, pSeller: 100 + d - q - t };
}

function draw(id) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const st = state[id];
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, L = 48, B = 36, T = 16, R = 16;
  const x = (q) => L + (q / 100) * (W - L - R);
  const y = (p) => H - B - (p / 140) * (H - B - T);
  const text = cssVar('--text-2') || '#4d5f66', grid = cssVar('--border') || '#e1e5e8';
  const cD = cssVar('--s-ECO') || '#03606a', cS = cssVar('--s-MKT') || '#c35f22', cK = cssVar('--danger') || '#b4282e';
  ctx.clearRect(0, 0, W, H);
  ctx.font = '12px ' + (cssVar('--font') || 'sans-serif');
  // axes
  ctx.strokeStyle = grid; ctx.lineWidth = 1;
  for (let p = 0; p <= 140; p += 20) { ctx.beginPath(); ctx.moveTo(L, y(p)); ctx.lineTo(W - R, y(p)); ctx.stroke(); }
  ctx.fillStyle = text;
  ctx.fillText('Price', 6, T + 8); ctx.fillText('Quantity', W - R - 52, H - 8);
  ctx.strokeStyle = text; ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, H - B); ctx.lineTo(W - R, H - B); ctx.stroke();
  const line = (f, color, label, dash = []) => {
    ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.setLineDash(dash); ctx.beginPath();
    let first = true;
    for (let q = 0; q <= 100; q += 1) { const p = f(q); if (p < 0 || p > 140) continue; if (first) { ctx.moveTo(x(q), y(p)); first = false; } else ctx.lineTo(x(q), y(p)); }
    ctx.stroke(); ctx.setLineDash([]);
    const qL = 92, pL = f(qL); if (pL >= 0 && pL <= 140) { ctx.fillStyle = color; ctx.fillText(label, x(qL) + 4, y(pL) - 6); }
  };
  line(q => 100 - q, cD + '55', 'D₀', [4, 4]);
  line(q => 10 + 0.8 * q, cS + '55', 'S₀', [4, 4]);
  line(q => 100 + st.d - q, cD, 'D');
  line(q => 10 - st.s + 0.8 * q, cS, 'S');
  if (st.t) line(q => 10 - st.s + st.t + 0.8 * q, cS, 'S + tax', [7, 4]);

  const eq = solve(st);
  const out = document.getElementById(`${id}-out`);
  ['d', 's', 't'].forEach(k => { const el = document.getElementById(`${id}-${k}v`); if (el) el.textContent = st[k] > 0 ? `+${st[k]}` : st[k]; });
  const cv = document.getElementById(`${id}-cv`);
  const ceiling = st.c > 0 ? st.c : null;
  if (cv) cv.textContent = ceiling ? ceiling : 'off';

  let msg;
  if (ceiling && ceiling < eq.pBuyer) {
    const qd = 100 + st.d - ceiling, qs = (ceiling - (10 - st.s + st.t)) / 0.8;
    ctx.strokeStyle = cK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(L, y(ceiling)); ctx.lineTo(W - R, y(ceiling)); ctx.stroke();
    ctx.fillStyle = cK; ctx.fillText(`Ceiling ${ceiling}`, L + 4, y(ceiling) - 6);
    ctx.fillStyle = cK + '33'; ctx.fillRect(x(Math.max(0, qs)), y(ceiling) - 4, x(qd) - x(Math.max(0, qs)), 8);
    msg = `<strong>Shortage:</strong> at a price of ${ceiling}, buyers want ${qd.toFixed(0)} units but sellers offer ${Math.max(0, qs).toFixed(0)} — a shortage of ${(qd - Math.max(0, qs)).toFixed(0)} units.`;
  } else {
    ctx.fillStyle = text; ctx.setLineDash([3, 3]); ctx.strokeStyle = text; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(L, y(eq.pBuyer)); ctx.lineTo(x(eq.q), y(eq.pBuyer)); ctx.lineTo(x(eq.q), H - B); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(x(eq.q), y(eq.pBuyer), 5, 0, Math.PI * 2); ctx.fillStyle = cssVar('--text') || '#13252b'; ctx.fill();
    ctx.fillText(`P* ${eq.pBuyer.toFixed(0)}`, 6, y(eq.pBuyer) + 4); ctx.fillText(`Q* ${eq.q.toFixed(0)}`, x(eq.q) - 14, H - B + 16);
    const base = solve({ d: 0, s: 0, t: 0 });
    msg = `Equilibrium price <strong>${eq.pBuyer.toFixed(1)}</strong> (was ${base.pBuyer.toFixed(1)}), quantity <strong>${eq.q.toFixed(1)}</strong> (was ${base.q.toFixed(1)}).`;
    if (st.t) msg += ` With the tax, buyers pay ${eq.pBuyer.toFixed(1)} and sellers keep ${eq.pSeller.toFixed(1)}; government revenue = ${(st.t * eq.q).toFixed(0)}.`;
  }
  if (out) out.innerHTML = msg;
}
