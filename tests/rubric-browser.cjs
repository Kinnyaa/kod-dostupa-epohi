// Run after npm run build. Requires Playwright (locally or via NODE_PATH).
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const os = require('node:os');
const { once } = require('node:events');
const app = path.resolve(__dirname, '../app');
const key = 'access-code-epochs-state';
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'epochs-rubric-'));
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const file = path.resolve(app, `.${decodeURIComponent(new URL(req.url, 'http://localhost').pathname)}`);
  const target = file === app ? path.join(app, 'index.html') : file;
  if (!target.startsWith(app + path.sep) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.setHeader('Content-Type', mime[path.extname(target)] || 'application/octet-stream');
  fs.createReadStream(target).pipe(res);
});
const stateFor = (stage) => ({ schemaVersion: 3, hasStarted: true, teamName: 'Команда проверки', participants: ['Анна'], currentStage: stage, unlockedStage: stage, score: 0, answers: {}, attempts: {}, completedQuestions: [], openedHints: [], artifacts: [], achievements: [], timers: { expedition: { startedAt: Date.now() } }, activeQuestionByStage: {}, recoveredQuestions: [] });
const texts = {
  1: 'Выбор записи зависел от задач торговли и измерения земли. Для записи использовали доступные материалы и знаки.',
  5: 'Используется другой набор символов. Это одно и то же количество. Пример: 255 = 11111111₂ = CF₂₀.',
};
async function main() {
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
  const errors = [];
  let checks = 0;
  try {
    for (const width of [320, 375, 768, 1280]) {
      for (const stage of [1, 5]) {
        const context = await browser.newContext({ viewport: { width, height: 900 } });
        const page = await context.newPage();
        page.on('pageerror', (error) => errors.push(String(error)));
        const url = `http://127.0.0.1:${server.address().port}/`;
        await page.goto(url);
        await page.evaluate(({ key, state }) => localStorage.setItem(key, JSON.stringify(state)), { key, state: stateFor(stage) });
        await page.reload();
        const form = page.locator('.rubric-form');
        const field = form.locator('textarea');
        const beforeFeedback = await form.locator('.rubric-feedback').innerText();
        await field.fill(texts[stage]);
        assert.equal(await form.locator('.rubric-feedback').innerText(), beforeFeedback, 'Feedback waits for debounce');
        await page.waitForFunction(() => document.querySelector('.rubric-feedback').textContent.includes('готово к проверке'));
        const saved = () => page.evaluate((key) => JSON.parse(localStorage.getItem(key)), key);
        let state = await saved();
        assert.equal(state.score, 0);
        assert.deepEqual(state.attempts, {});
        assert.deepEqual(state.openedHints, []);
        assert.deepEqual(state.completedQuestions, []);
        assert.deepEqual(state.artifacts, []);
        assert.deepEqual(state.achievements, []);
        assert.equal(state.unlockedStage, stage);
        assert.equal(await form.locator('.rubric-feedback').getAttribute('aria-live'), 'polite');
        const liveText = await form.locator('.rubric-feedback').innerText();
        assert.ok(!/11111111|\bCF\b|255/.test(liveText), 'Live feedback must not reveal numeric answers');
        const layout = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, buttons: [...document.querySelectorAll('.rubric-form button')].map((node) => { const box = node.getBoundingClientRect(); return { width: box.width, height: box.height }; }) }));
        assert.equal(layout.overflow, false, `Overflow at ${width}, stage ${stage}`);
        for (const button of layout.buttons) assert.ok(button.height >= 44 && button.width >= 44);
        await form.screenshot({ path: path.join(output, `stage-${stage}-${width}.png`) });
        await form.locator('button[type=submit]').click();
        state = await saved();
        const id = stage === 1 ? 'final-01' : 'final-02';
        assert.equal(state.attempts[id], 1);
        assert.equal(state.score, 5);
        assert.ok(state.completedQuestions.includes(id));
        await page.reload();
        if (stage === 5) await page.locator('[data-question="final-02"]').click();
        assert.equal(await page.locator('.rubric-form textarea').inputValue(), texts[stage]);
        assert.ok(await page.locator('.rubric-form button[type=submit]').isDisabled());
        checks += 1;
        await context.close();
      }
    }
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(String(error)));
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.evaluate(({ key, state }) => localStorage.setItem(key, JSON.stringify(state)), { key, state: stateFor(5) });
    await page.reload();
    const form = page.locator('.rubric-form');
    await form.locator('textarea').fill(texts[5] + ' Но значение числа меняется.');
    await form.locator('button[type=submit]').click();
    let saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), key);
    assert.equal(saved.attempts['final-02'], 1);
    assert.equal(saved.score, 0);
    assert.ok(saved.openedHints.includes('final-02'));
    assert.ok(await form.locator('.hint').isVisible());
    assert.ok((await form.locator('.rubric-feedback').innerText()).includes('Проверьте утверждение'));
    await form.locator('textarea').fill(texts[5]);
    await form.locator('button[type=submit]').click();
    saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), key);
    assert.equal(saved.attempts['final-02'], 2);
    assert.equal(saved.score, 3);
    checks += 1;
    // Keep previously accepted answers accepted, even under stricter new rules.
    const legacy = { ...stateFor(1), completedQuestions: ['final-01'], answers: { 'final-01': 'Старое краткое объяснение' }, score: 5 };
    await page.evaluate(({ key, state }) => localStorage.setItem(key, JSON.stringify(state)), { key, state: legacy });
    await page.reload();
    assert.ok((await page.locator('.rubric-feedback').innerText()).includes('Ответ уже принят'));
    assert.ok(await page.locator('.rubric-form button[type=submit]').isDisabled());
    checks += 1;
    await context.close();
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ passed: checks, widths: [320, 375, 768, 1280], screenshots: output, pageErrors: errors }, null, 2));
  } finally { await browser.close(); }
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => server.close());
