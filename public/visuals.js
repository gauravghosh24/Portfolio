/* Presentation interactions, separate from the original content and case studies. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const explorer = document.querySelector('.toolkit-explorer');
  const lenses = {
    data: { title: 'Data & developer tools', label: 'Data', color: 'var(--accent)', symbol: '◈', tools: ['SQL', 'NumPy', 'MySQL', 'MongoDB', 'Qdrant', 'Vector Search'], evidence: 'GPU-Accelerated Voronoi Diagram Generation ↗', target: '#research', flow: ['Construct', 'Reduce redundant work', 'Benchmark'], cards: [0, 3] },
    ai: { title: 'Generative AI & ML', label: 'AI', color: 'var(--purple)', symbol: '✳', tools: ['RAG', 'LangChain', 'Hugging Face', 'Qdrant', 'PyTorch', 'scikit-learn'], evidence: 'Enterprise Policy Analyzer · TrafficOps AI ↗', target: '#work', flow: ['Embeddings', 'Vector retrieval', 'Cited answer'], cards: [2] },
    software: { title: 'Backend systems', label: 'Software', color: 'var(--cyan)', symbol: '⌘', tools: ['Java', 'Spring Boot', 'Docker', 'FastAPI', 'REST APIs', 'WebSockets'], evidence: 'Sandboxed Online Compiler ↗', target: '#work', flow: ['Code + input', 'Docker sandbox', 'Result + errors'], cards: [0, 1, 4] }
  };
  const svgNS = 'http://www.w3.org/2000/svg';
  function svgElement(tag, attributes, content) {
    const element = document.createElementNS(svgNS, tag);
    for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
    if (content) element.textContent = content;
    return element;
  }
  function selectLens(key) {
    const lens = lenses[key];
    if (!lens || !explorer) return;
    explorer.style.setProperty('--lens-color', lens.color);
    explorer.dataset.activeLens = key;
    explorer.querySelectorAll('[data-lens]').forEach(button => button.setAttribute('aria-pressed', button.dataset.lens === key));
    document.querySelector('#lens-title').textContent = lens.title;
    document.querySelector('.lens-symbol').textContent = lens.symbol;
    document.querySelector('#lens-tools').textContent = lens.tools.join(' · ');
    const evidence = document.querySelector('#lens-evidence');
    evidence.textContent = lens.evidence;
    evidence.setAttribute('href', lens.target);
    const pipeline = document.querySelector('#lens-pipeline');
    pipeline.replaceChildren();
    lens.flow.forEach((step, index) => {
      if (index) { const arrow = document.createElement('b'); arrow.textContent = '→'; arrow.setAttribute('aria-hidden', 'true'); pipeline.append(arrow); }
      const label = document.createElement('span'); label.textContent = step; pipeline.append(label);
    });
    document.querySelector('#network-description').textContent = `${lens.label} connects ${lens.tools.join(', ')}. These are listed technologies, not proficiency scores.`;
    const links = document.querySelector('#network-links');
    const nodes = document.querySelector('#network-nodes');
    links.replaceChildren(); nodes.replaceChildren();
    nodes.append(svgElement('circle', { cx: 290, cy: 145, r: 66, class: 'network-halo' }));
    const positions = [[113, 53], [290, 32], [467, 53], [113, 237], [290, 258], [467, 237]];
    lens.tools.forEach((tool, index) => {
      const [x, y] = positions[index];
      const d = `M290 145 Q${x} 145 ${x} ${y}`;
      links.append(svgElement('path', { d, class: 'network-link' }));
      const pulse = svgElement('path', { d, class: 'network-pulse' });
      pulse.style.animationDelay = `${index * -1.3}s`; links.append(pulse);
      const group = svgElement('g', { class: 'network-node' });
      group.append(svgElement('circle', { cx: x, cy: y, r: 6 }));
      group.append(svgElement('text', { x, y: y + (y < 145 ? -15 : 25) }, tool));
      nodes.append(group);
    });
    const center = svgElement('g', { class: 'network-core' });
    center.append(svgElement('circle', { cx: 290, cy: 145, r: 47 }));
    center.append(svgElement('text', { x: 290, y: 150, 'text-anchor': 'middle' }, lens.label));
    nodes.append(center);
    document.querySelectorAll('.skill-grid > div').forEach((card, index) => {
      card.classList.toggle('lens-highlight', lens.cards.includes(index));
      card.style.setProperty('--active-color', lens.color);
    });
  }
  explorer?.querySelectorAll('[data-lens]').forEach(button => button.addEventListener('click', () => selectLens(button.dataset.lens)));
  document.querySelector('#lens-evidence')?.addEventListener('click', () => {
    const key = explorer.dataset.activeLens;
    if (key === 'ai' || key === 'software') document.querySelector(`[data-filter="${key === 'ai' ? 'ai' : 'backend'}"]`)?.click();
  });
  document.querySelectorAll('[data-role-link]').forEach(link => link.addEventListener('click', () => selectLens(link.dataset.roleLink)));
  selectLens('data');

  document.querySelectorAll('[data-tilt], .project').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      const x = Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5));
      const y = Math.max(-.5, Math.min(.5, (event.clientY - rect.top) / rect.height - .5));
      card.style.setProperty('--tilt-x', `${-y * 7}deg`);
      card.style.setProperty('--tilt-y', `${x * 9}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--tilt-x'); card.style.removeProperty('--tilt-y');
    });
  });

  const charts = document.querySelectorAll('.academic-chart');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll('.section-heading, .project, .research-title, .research-body, .toolkit-explorer, .about-section > div, .contact-heading').forEach(element => {
      element.classList.add('reveal', 'reveal-pending'); observer.observe(element);
    });
    charts.forEach(chart => { chart.classList.add('chart-motion'); observer.observe(chart); });
    // Hidden filtered projects should reveal as soon as they are selected.
    document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('.project:not([hidden])').forEach(card => card.classList.remove('reveal-pending'));
    }));
  } else {
    charts.forEach(chart => chart.classList.add('in-view'));
  }
  document.addEventListener('visibilitychange', () => {
    document.body.classList.toggle('visuals-paused', document.hidden);
  });
})();
