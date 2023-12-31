function updateIsTypingElement(header) {
  const newTypingText = agentIsTyping(header);
  const typingText = document.querySelector('[data-lp-point="agent_is_typing"]');
  if (typingText && typingText.innerText !== newTypingText && typingText.innerText !== '') {
    typingText.innerText = newTypingText;
  }
}

function agentIsTyping(target) {
  console.log(target.innerText);
  if (
    target.innerText === 'DEV_WEB_PMI_BOT' ||
    target.innerText === 'PMI Virtual Assistant' ||
    target.innerText === 'Message us' ||
    target.innerText === 'PMI Survey Bot'
  ) {
    return 'Virtual assistant is typing';
  }

 return 'Agent is typing';
}

function addMessagingWith(data, eventInfo) {
  if (data && data.state == "interactive" || date.state ==="chatting") {
    const MutationObserver = window.MutationObserver ||
      window.WebKitMutationObserver || window.MozMutationObserver;

    const hdrMax = document.querySelector('[data-lp-point="maximized"] [data-lp-point="headerText"]');
    const hdrMin = document.querySelector('[data-lp-point="minimized"] [data-lp-point="headerText"]');
    const hdrTyping = document.querySelector('[data-lp-point="agent_is_typing"]');
    const observer = new MutationObserver(((mutations) => {
      mutations.forEach((mutation) => {
        updateIsTypingElement(hdrMax);
      });
    }));

    observer.observe(hdrMax, {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true
    });
    observer.observe(hdrMin, {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true,
    });
    observer.observe(hdrTyping, {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true
    });
    updateIsTypingElement(hdrMax);
  } 
}

window.addEventListener("load", () => {
  lpTag.events.bind({
    eventName: "state",
    appName: "lpUnifiedWindow",
    func: addMessagingWith
  })
});
