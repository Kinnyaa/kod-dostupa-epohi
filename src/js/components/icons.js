const iconPaths = {
  'navigation-home': '<path d="M10 56h44M16 52V27l16-14 16 14v25M24 52V38h16v14M13 29h38M19 23h26" fill="none" stroke-width="4"/><path d="M27 21h10" stroke-width="3"/>',
  'navigation-timeline': '<circle cx="32" cy="32" r="22" fill="none" stroke-width="4"/><circle cx="32" cy="32" r="5" fill="currentColor"/><path d="M32 10v12M32 42v12M10 32h12M42 32h12M17 17l8 8M39 39l8 8M47 17l-8 8M25 39l-8 8" fill="none" stroke-width="3"/><path d="M32 32l12-9" fill="none" stroke-width="4"/>',
  'navigation-passport': '<path d="M15 8h34v48H15z" fill="none" stroke-width="4"/><path d="M22 17h20M22 25h20M22 45h12" fill="none" stroke-width="3"/><circle cx="39" cy="38" r="8" fill="none" stroke-width="3"/><path d="M31 38h16M39 30v16" fill="none" stroke-width="2"/>',
  'navigation-results': '<path d="M16 29q16-24 32 0-16 27-32 0z" fill="none" stroke-width="3"/><path d="M32 12v10M20 20l7 7M44 20l-7 7M21 43l-5 9M43 43l5 9M32 47v9" fill="none" stroke-width="4"/><path d="M27 31l4 4 8-10" fill="none" stroke-width="3"/>',
  'navigation-back': '<path d="M52 32H14M27 17L12 32l15 15" fill="none" stroke-width="6"/><path d="M39 17v30" fill="none" stroke-width="3"/>',
  'navigation-forward': '<path d="M12 32h38M37 17l15 15-15 15" fill="none" stroke-width="6"/><path d="M25 17v30" fill="none" stroke-width="3"/>',
  'status-locked': '<rect x="15" y="28" width="34" height="26" rx="3" fill="none" stroke-width="4"/><path d="M23 28V19a9 9 0 0 1 18 0v9" fill="none" stroke-width="4"/><circle cx="32" cy="40" r="3" fill="currentColor"/><path d="M32 43v7" fill="none" stroke-width="3"/>',
  'status-complete': '<circle cx="32" cy="32" r="23" fill="none" stroke-width="4"/><path d="M19 32l8 9 18-20" fill="none" stroke-width="5"/>',
  'status-current': '<circle cx="32" cy="32" r="20" fill="none" stroke-width="3"/><circle cx="32" cy="32" r="9" fill="currentColor"/>',
  'status-hint': '<path d="M22 42q-7-6-7-14a17 17 0 0 1 34 0q0 8-7 14l-2 6H24z" fill="none" stroke-width="4"/><path d="M25 55h14M27 48h10M32 4v6M9 17l7 4M55 17l-7 4" fill="none" stroke-width="3"/>',
  'status-time': '<path d="M22 8h20M22 56h20M22 8q0 13 10 18 10-5 10-18M22 56q0-13 10-18 10 5 10 18" fill="none" stroke-width="4"/><path d="M26 14h12M26 50h12" fill="none" stroke-width="3"/>',
  'status-score': '<circle cx="32" cy="32" r="23" fill="none" stroke-width="4"/><path d="M32 15l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="none" stroke-width="3"/>',
  'status-reward': '<circle cx="32" cy="28" r="17" fill="none" stroke-width="4"/><path d="M22 42l-5 16 15-8 15 8-5-16" fill="none" stroke-width="4"/><path d="M32 18l4 8 9 1-7 6 2 9-8-4-8 4 2-9-7-6 9-1z" fill="none" stroke-width="3"/>',
  'system-help': '<circle cx="32" cy="32" r="23" fill="none" stroke-width="4"/><path d="M24 25a8 8 0 1 1 12 7c-4 2-4 5-4 8M32 48v2" fill="none" stroke-width="4"/>',
};

export const icon = (name, className = '') => `<svg class="ui-icon ${className}" viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || ''}</svg>`;

const artifactPaths = {
  'scroll-researcher': '<path d="M18 13h31c-4 3-4 8 0 11H18c-5 0-7-3-7-6s2-5 7-5Zm0 11v27h28V24M18 51c-5 0-7-3-7-6s2-6 7-6h28"/><path d="m26 34 5 5 10-11M24 45h15"/>',
  'papyrus-number': '<path d="M15 11h35c-4 4-4 8 0 12v30H15c-5 0-7-4-7-7s2-7 7-7V11Z"/><path d="M15 23h35M20 29h24M20 35h24M20 41h24M28 24v22M37 24v22"/>',
  'translation-tablet': '<path d="M15 10h34l5 7v37H10V17l5-7Z"/><path d="M18 22h28M18 31h11M35 31h11M18 40h11M35 40h11M18 49h28"/><path d="m28 28 4 3-4 3M36 37l-4 3 4 3"/>',
  'compatibility-seal': '<circle cx="32" cy="27" r="18"/><path d="m22 42-4 15 14-8 14 8-4-15M23 27l6 6 12-13"/>',
  'time-core-key': '<circle cx="22" cy="25" r="12"/><circle cx="22" cy="25" r="5"/><path d="M31 34l22 22M40 43l6-6M46 49l6-6"/><path d="M22 8v5M5 25h5M34 25h5"/>',
};

export const artifactImage = (name, className = 'artifact-icon') => `<svg class="${className}" viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${artifactPaths[name] || artifactPaths['scroll-researcher']}</svg>`;
