import { createCliRenderer } from '@opentui/core';
import { createRoot } from '@opentui/react';
import App from './app';
import { theme } from './theme';

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
  clearOnShutdown: true,
  useMouse: false,
  backgroundColor: theme.background,
});

createRoot(renderer).render(<App />);
