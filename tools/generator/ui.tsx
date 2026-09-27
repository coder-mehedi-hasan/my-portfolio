import type { ReactNode } from 'react';
import { theme } from './theme';

export type ToneName = 'muted' | 'faint' | 'accent' | 'success' | 'warning' | 'danger' | 'draft' | 'text';

const tones: Record<ToneName, string> = {
  muted: theme.muted,
  faint: theme.faint,
  accent: theme.accent,
  success: theme.success,
  warning: theme.warning,
  danger: theme.danger,
  draft: theme.draft,
  text: theme.text,
};

export function Tone({ name, children }: { name: ToneName; children: ReactNode }) {
  return <text fg={tones[name]}>{children}</text>;
}

export function Badge({ name, children }: { name: ToneName; children: ReactNode }) {
  return (
    <text fg={tones[name]} bg={theme.raised}>
      {' '}
      {children}{' '}
    </text>
  );
}

export function Row({
  children,
  gap,
  align = 'center',
  ...rest
}: { children: ReactNode; gap?: number; align?: 'center' | 'stretch' | 'flex-start' } & Record<string, unknown>) {
  return (
    <box flexDirection="row" alignItems={align} gap={gap} {...rest}>
      {children}
    </box>
  );
}

export function Column({ children, gap, ...rest }: { children: ReactNode; gap?: number } & Record<string, unknown>) {
  return (
    <box flexDirection="column" gap={gap} {...rest}>
      {children}
    </box>
  );
}

export function Panel({
  title,
  children,
  ...rest
}: { title?: string; children: ReactNode } & Record<string, unknown>) {
  return (
    <box
      title={title}
      titleColor={theme.muted}
      borderStyle="rounded"
      borderColor={theme.border}
      backgroundColor={theme.surface}
      flexDirection="column"
      paddingX={1}
      {...rest}
    >
      {children}
    </box>
  );
}

const SEPARATOR = '  ·  ';
const MORE = ['…', 'more'] as const;

function hintCost([key, label]: ReadonlyArray<string>, first: boolean): number {
  return key.length + label.length + 1 + (first ? 0 : SEPARATOR.length);
}

/**
 * Hints are listed most important first, so a narrow terminal drops the tail
 * instead of cutting a line in half and hiding keys in the middle.
 */
export function KeyHints({ items, width }: { items: Array<[string, string]>; width: number }) {
  const budget = width - 2;
  const all = items.reduce((total, item, index) => total + hintCost(item, index === 0), 0);
  const reserve = all <= budget ? 0 : hintCost(MORE, items.length > 1) + SEPARATOR.length;
  const shown: Array<[string, string]> = [];
  let used = 0;
  for (const item of items) {
    const cost = hintCost(item, shown.length === 0);
    if (used + cost + reserve > budget) break;
    shown.push(item);
    used += cost;
  }
  if (shown.length < items.length) shown.push([...MORE]);
  return (
    <box height={1} flexShrink={0} paddingX={1} backgroundColor={theme.surface}>
      <text wrapMode="none" truncate fg={theme.muted}>
        {shown.map(([key, label], index) => (
          <span key={key}>
            {index > 0 ? SEPARATOR : ''}
            <span fg={theme.accent}>{key}</span>
            <span>{` ${label}`}</span>
          </span>
        ))}
      </text>
    </box>
  );
}

export function Notice({ tone: name, children }: { tone: ToneName; children: ReactNode }) {
  return (
    <Row height={1} flexShrink={0} paddingX={1}>
      <text fg={tones[name]} bg={theme.raised}>
        {` ${children} `}
      </text>
    </Row>
  );
}

export function Heading({ children, color = theme.text }: { children: ReactNode; color?: string }) {
  return (
    <text fg={color}>
      <b>{children}</b>
    </text>
  );
}

export function truncate(value: string, width: number): string {
  const flat = value.replace(/\s+/g, ' ').trim();
  if (width <= 1) return '';
  return flat.length <= width ? flat : `${flat.slice(0, width - 1)}…`;
}
