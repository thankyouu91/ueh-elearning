import { BRAND } from '../config.js';
import { esc, icon, avatar } from '../ui.js';
import { logoMark } from './shared.js';
import * as S from '../selectors.js';

/** Product preview on the sign-in page: a cropped desktop dashboard and the same to-do list on a phone. Decorative. */
function showcase() {
  const task = (lv, kicker, title, meta, pct, i) => `<div class="sc-task lv-${lv}" style="--i:${i}"><div class="grow"><div class="task-kicker">${kicker}</div><b>${title}</b><span>${meta}</span>${pct ? `<div class="sc-bar"><i style="--p:${pct / 100}"></i></div>` : ''}</div></div>`;
  const tasks = task('urgent', 'Do now', 'Midterm Examination', 'Assessment open', 0, 0) + task('soon', 'This week', 'Elasticity & Government Intervention', "This week's lesson", 25, 1) + task('catchup', 'Catch up', 'Entrepreneurship & New Venture Creation', 'Week 8', 75, 2);
  return `<div class="showcase" aria-hidden="true">
    <div class="sc-browser">
      <div class="sc-chrome"><i></i><i></i><i></i><span data-no-i18n>ueh-learning</span></div>
      <div class="sc-app">
        <div class="sc-nav"><b class="on">${icon('layout-dashboard')}<span>Dashboard</span></b><b>${icon('book-open')}<span>My course</span></b><b>${icon('clipboard-check')}<span>Assessments</span></b><b>${icon('chart-column')}<span>Grades</span></b><b>${icon('notebook-pen')}<span>Workbook</span></b></div>
        <div class="sc-main">
          <div class="sc-kpis"><div><span>Course grade</span><b data-no-i18n>8.8</b></div><div><span>Engagement</span><b data-no-i18n>89%</b></div><div><span>Workbook</span><b data-no-i18n>27/33</b></div></div>
          <div class="sc-card"><div class="sc-card-h"><em data-no-i18n>3</em><span>What to do now</span></div>${tasks}</div>
        </div>
      </div>
    </div>
    <div class="sc-phone"><div class="sc-screen">
      <div class="sc-card-h"><em data-no-i18n>3</em><span>What to do now</span></div>${tasks}
      <div class="sc-btn"><span>Resume</span> ${icon('arrow-right')}</div>
    </div></div>
    <div class="sc-chip">${icon('circle-check')}<span>Correct!</span></div>
  </div>`;
}

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
      ${showcase()}
      <div class="hide-sm">
        <h1>${esc(BRAND.product)}</h1>
        <p>${esc(BRAND.tagline)} for ${esc(BRAND.institution)} — course delivery, approvals, assessment and analytics in one place.</p>
      </div>
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
