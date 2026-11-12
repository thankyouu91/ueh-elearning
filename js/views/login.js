import { BRAND } from '../config.js';
import { esc, icon, avatar } from '../ui.js';
import { logoMark } from './shared.js';
import * as S from '../selectors.js';

export function loginView(s) {
  const groups = [
    ['University leadership', s.users.filter(u => u.role === 'provost')],
    ['Deans', s.users.filter(u => u.role === 'director')],
    ['Lecturers', s.users.filter(u => u.role === 'instructor')],
    ['Students (one per class)', s.users.filter(u => u.role === 'student').filter((_, i) => i % 6 === 0)],
    ['Administrator', s.users.filter(u => u.role === 'admin')],
  ];
  return `<div class="login">
    <aside class="login-side">
      <div>${logoMark(true)}</div>
      <div class="hide-sm">
        <h1>${esc(BRAND.product)}</h1>
        <p>${esc(BRAND.tagline)} for ${esc(BRAND.institution)} — course delivery, approvals, assessment and analytics in one place.</p>
      </div>
      <p class="small hide-sm">${esc(s.term.title)} · ${esc(s.framework.title)} · ${s.programs.length} programmes · ${s.sections.length} classes</p>
    </aside>
    <main class="login-main">
      <div class="login-box">
        <div><h2>Sign in</h2><p class="muted mt-2">This is a demo environment. Choose an account to continue — single sign-on with UEH accounts will replace this screen.</p></div>
        ${groups.map(([label, users]) => `<div class="stack gap-2"><div class="small muted" style="font-weight:600">${label}</div>
          ${users.map(u => `<button class="account" data-action="sign-in" data-id="${u.id}">${avatar(u)}<div class="grow"><div style="font-weight:600">${esc(u.name)}</div><div class="small muted">${esc(u.title)}${u.sectionId ? '' : ''}</div></div>${icon('arrow-right')}</button>`).join('')}</div>`).join('')}
        <p class="small faint">Demo week ${s.clock.week} of ${s.term.weeks}. Data is stored only in this browser.</p>
      </div>
    </main>
  </div>`;
}
