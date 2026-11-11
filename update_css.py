with open(r'C:/Users/User/Desktop/exam_quiz_site/style.css', 'w', encoding='utf-8') as f:
    f.write('''/* Modern SaaS / Soft-Glass Aesthetic Matching Screenshot */
:root {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --bg-gradient: linear-gradient(135deg, #eef3fa 0%, #e2ebf7 100%);
  --bg-main: #f8fafc;
  --card-bg: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --primary-light: #eef2ff;
  --primary-border: #c7d2fe;
  --success: #16a34a;
  --success-bg: #f0fdf4;
  --success-border: #86efac;
  --danger: #dc2626;
  --danger-bg: #fef2f2;
  --danger-border: #fca5a5;
  --warning: #d97706;
  --warning-bg: #fffbeb;
  --border: #e2e8f0;
  --shadow-card: 0 20px 40px -10px rgba(15, 23, 42, 0.07), 0 1px 3px 0 rgba(15, 23, 42, 0.04);
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --radius-lg: 24px;
  --radius-md: 16px;
  --radius-sm: 10px;
  --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
  --bg-gradient: linear-gradient(135deg, #090d16 0%, #0f172a 100%);
  --bg-main: #0b0f19;
  --card-bg: #1e293b;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --primary: #6366f1;
  --primary-hover: #818cf8;
  --primary-light: #1e1b4b;
  --primary-border: #312e81;
  --success: #22c55e;
  --success-bg: #052e16;
  --success-border: #166534;
  --danger: #ef4444;
  --danger-bg: #450a0a;
  --danger-border: #991b1b;
  --warning: #f59e0b;
  --warning-bg: #451a03;
  --border: #334155;
  --shadow-card: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-family);
  background: var(--bg-gradient);
  color: var(--text-main);
  min-height: 100vh;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  transition: background 0.3s ease, color 0.3s ease;
}

.app-header {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.header-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.9rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-main);
  cursor: pointer;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.logo-text h1 { font-size: 1.05rem; font-weight: 700; line-height: 1.2; }
.logo-text span { font-size: 0.78rem; color: var(--text-muted); }

.header-actions { display: flex; align-items: center; gap: 0.75rem; }

.btn-circle-icon {
  background: var(--card-bg);
  border: 1px solid var(--border);
  color: var(--text-main);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.btn-circle-icon:hover {
  border-color: var(--primary);
  background: var(--primary-light);
  transform: translateY(-1px);
}

.theme-icon-orb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0f172a 50%, #f59e0b 50%);
  display: inline-block;
}

.main-wrapper {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
  width: 100%;
  flex: 1;
}

.screen { display: none; animation: fadeIn 0.25s ease-out; }
.screen.active { display: block; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
with open(r'C:/Users/User/Desktop/exam_quiz_site/style.css', 'a', encoding='utf-8') as f:
    f.write('''
.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  background: var(--primary-light);
  color: var(--primary);
  border: 1px solid var(--primary-border);
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}

.badge-sparkle { font-size: 1rem; }

.hero-title {
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.6rem;
  letter-spacing: -0.025em;
  line-height: 1.25;
}

.hero-subtitle {
  color: var(--text-muted);
  font-size: 1.02rem;
  max-width: 750px;
  margin-bottom: 2.25rem;
  line-height: 1.5;
}

.mode-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.mode-card {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #e4ecfe 0%, #f0f4fe 100%);
  border: 2px solid transparent;
  border-radius: 20px;
  cursor: pointer;
  transition: var(--transition);
}

[data-theme="dark"] .mode-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-color: var(--border);
}

.mode-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.1);
}

.mode-card.selected {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.mode-card-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.25);
}

.bulb-icon { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); }
.timer-icon { background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); }

.mode-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.35rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mode-card-desc {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.45;
}

[data-theme="dark"] .mode-card-desc { color: var(--text-muted); }

.bottom-section {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: flex-end;
  border-top: 1px solid var(--border);
  padding-top: 2rem;
}

@media (max-width: 768px) {
  .bottom-section { grid-template-columns: 1fr; }
}

.settings-column { display: flex; flex-direction: column; gap: 1rem; }
.settings-title { font-size: 1.1rem; font-weight: 700; color: var(--text-main); }

.count-selector-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.count-label { font-size: 0.92rem; font-weight: 600; color: var(--text-main); }

.custom-select-wrapper { position: relative; min-width: 240px; }

.custom-select {
  width: 100%;
  padding: 0.7rem 2.5rem 0.7rem 1rem;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background: var(--card-bg);
  color: var(--text-main);
  font-size: 0.95rem;
  font-weight: 500;
  appearance: none;
  cursor: pointer;
  outline: none;
  transition: var(--transition);
}

.custom-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.select-chevron {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-muted);
}

.checkbox-list { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.25rem; }

.custom-checkbox-row {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  font-size: 0.92rem;
  color: var(--text-main);
}

.custom-checkbox-row input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.custom-checkbox-box {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid #cbd5e1;
  background: var(--card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  color: white;
}

.custom-checkbox-row input:checked ~ .custom-checkbox-box {
  background: var(--primary);
  border-color: var(--primary);
}

.custom-checkbox-box svg {
  opacity: 0;
  transform: scale(0.6);
  transition: var(--transition);
}

.custom-checkbox-row input:checked ~ .custom-checkbox-box svg {
  opacity: 1;
  transform: scale(1);
}

.actions-column { display: flex; flex-direction: column; gap: 0.75rem; min-width: 230px; }

.btn-primary-gradient {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.9rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-decoration: none;
  outline: none;
}

.btn-primary-gradient:hover {
  background: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(79, 70, 229, 0.45);
}

.btn-secondary-outline {
  background: transparent;
  color: var(--primary);
  border: 1.5px solid #818cf8;
  padding: 0.85rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
}

.btn-secondary-outline:hover {
  background: var(--primary-light);
  border-color: var(--primary);
}
''')
print("Part 2 written")

  to { opacity: 1; transform: translateY(0); }
}

.main-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2.75rem;
  box-shadow: var(--shadow-card);
  transition: var(--transition);
}
''')
print("Base written")
