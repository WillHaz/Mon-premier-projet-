(() => {
  const NativeMutationObserver = window.MutationObserver;
  if (!NativeMutationObserver || window.__TADAMB_MUTATION_GUARD__) return;
  window.__TADAMB_MUTATION_GUARD__ = true;

  const isInternalRenderMutation = mutation => {
    const target = mutation.target?.nodeType === Node.ELEMENT_NODE
      ? mutation.target
      : mutation.target?.parentElement;
    if (!target || typeof target.closest !== 'function') return false;
    return Boolean(target.closest('#detailedReport, #combinationAnalysis, .pdf-export-wrap'));
  };

  window.MutationObserver = class TadambMutationObserver extends NativeMutationObserver {
    constructor(callback) {
      super((mutations, observer) => {
        const meaningfulMutations = mutations.filter(m => !isInternalRenderMutation(m));
        if (meaningfulMutations.length) callback(meaningfulMutations, observer);
      });
    }
  };
})();