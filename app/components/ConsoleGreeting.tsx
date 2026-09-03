'use client';

import { useEffect, useRef } from 'react';

export default function ConsoleGreeting() {
  const hasLogged = useRef(false);

  useEffect(() => {
    if (hasLogged.current) return;
    hasLogged.current = true;

    console.log(
      `%cHey 🫩\nInterested in working together?\n\nLet's build something amazing.\nContact \n📧 likhithmanakala@gmail.com`,
      'color: #00ff00; font-family: monospace; font-size: 13px;'
    );
  }, []);

  return null;
}
