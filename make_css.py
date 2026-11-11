css_p1 = """/* Modern SaaS / Soft-Glass Aesthetic Matching Screenshot */
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
"""

with open(r'C:/Users/User/Desktop/exam_quiz_site/make_css.py', 'w', encoding='utf-8') as f:
    f.write("css = css_p1\n")
print("wrote p1")
