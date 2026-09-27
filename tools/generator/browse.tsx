import type { KeyEvent } from '@opentui/core';
import { useKeyboard, useTerminalDimensions } from '@opentui/react';
import { useMemo, useState } from 'react';
import { entryTitle, setFlags, type EntryRecord } from './content';
import { contentTypes, type ContentType } from './fields';
import { theme } from './theme';
import { Badge, Heading, KeyHints, Notice, Panel, Row, Tone, truncate, type ToneName } from './ui';

export interface BrowseProps {
  type: ContentType;
  entries: EntryRecord[];
  notice: { tone: ToneName; text: string } | null;
  onTypeChange: (type: ContentType) => void;
  onCreate: () => void;
  onNotice: (tone: ToneName, text: string) => void;
  onRefresh: () => void;
  onQuit: () => void;
}

type Mode = 'list' | 'filter';

function matches(type: ContentType, entry: EntryRecord, needle: string): boolean {
  if (!needle) return true;
  return `${entry.slug} ${entryTitle(type, entry)}`.toLowerCase().includes(needle);
}

function isChar(key: KeyEvent, char: string): boolean {
  return !key.ctrl && !key.meta && !key.option && (key.name === char || key.sequence === char);
}

export default function Browse({ type, entries, notice, onTypeChange, onCreate, onNotice, onRefresh, onQuit }: BrowseProps) {
  const { width, height } = useTerminalDimensions();
  const [mode, setMode] = useState<Mode>('list');
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(0);

  const visible = useMemo(() => {
    const needle = filter.trim().toLowerCase();
    return entries.filter((entry) => matches(type, entry, needle));
  }, [type, entries, filter]);

  const current = visible[Math.min(selected, Math.max(0, visible.length - 1))];
  const detailWidth = Math.max(36, Math.min(width - 6, 92));
  const summaryWidth = Math.max(30, detailWidth * Math.max(2, Math.floor((height - 16) / 2)));

  useKeyboard((key) => {
    if (mode === 'filter') {
      if (key.name === 'escape' || key.name === 'return') {
        key.preventDefault();
        setMode('list');
      }
      return;
    }

    if (key.name === 'tab') {
      key.preventDefault();
      const step = key.shift ? contentTypes.length - 1 : 1;
      setFilter('');
      setSelected(0);
      onTypeChange(contentTypes[(contentTypes.indexOf(type) + step) % contentTypes.length]);
      return;
    }
    if ((key.ctrl || key.meta) && key.name === 'q') {
      key.preventDefault();
      onQuit();
      return;
    }
    if (isChar(key, '/')) {
      key.preventDefault();
      setMode('filter');
      return;
    }
    if (isChar(key, 'n')) {
      key.preventDefault();
      onCreate();
      return;
    }
    if (isChar(key, 'q')) {
      key.preventDefault();
      onQuit();
      return;
    }
    if (isChar(key, 'p') && current) {
      key.preventDefault();
      const result = setFlags(type, current.slug, { status: current.status === 'published' ? 'draft' : 'published' });
      onNotice(result.ok ? 'success' : 'danger', result.message);
      if (result.ok) onRefresh();
    }
  });

  const published = entries.filter((entry) => entry.status === 'published').length;
  const drafts = entries.length - published;

  return (
    <box flexDirection="column" flexGrow={1} width="100%" backgroundColor={theme.background}>
      <Row flexShrink={0} paddingX={2} paddingY={1} gap={1} backgroundColor={theme.surface}>
        <Heading color={theme.text}>content generator</Heading>
        <Tone name="faint">·</Tone>
        {contentTypes.map((name) => (
          <text
            key={name}
            fg={name === type ? theme.background : theme.muted}
            bg={name === type ? theme.accent : undefined}
          >
            {` ${name} `}
          </text>
        ))}
      </Row>

      <Row flexGrow={1} flexShrink={1} align="stretch" paddingX={2} paddingBottom={1} gap={2}>
        <Panel title={mode === 'filter' ? 'filter' : `${type} · ${entries.length}`} width="56%" flexShrink={1}>
          {mode === 'filter' && (
            <box marginBottom={1}>
              <input
                focused
                value={filter}
                placeholder="match slug or title…"
                onInput={(value) => {
                  setFilter(value);
                  setSelected(0);
                }}
              />
            </box>
          )}
          <select
            focused={mode === 'list'}
            flexGrow={1}
            flexShrink={1}
            flexBasis={2}
            options={visible.map((entry) => ({
              name: entryTitle(type, entry),
              description: `${entry.slug}  ·  ${entry.status}${entry.featured ? '  ·  featured' : ''}`,
              value: entry.slug,
            }))}
            selectedIndex={selected}
            showDescription
            showScrollIndicator
            wrapSelection
            onChange={(index) => setSelected(index)}
          />
          {visible.length === 0 && (
            <Row paddingTop={1}>
              <Tone name="faint">{filter.trim() ? 'nothing matches that filter' : `${type} is empty`}</Tone>
            </Row>
          )}
          {mode === 'list' && (
            <Row flexShrink={0} marginTop={1} gap={2}>
              <Row gap={1}>
                <text fg={theme.background} bg={theme.accent}>
                  {' n '}
                </text>
                <text fg={theme.accent}>{` new ${type.slice(0, -1)}`}</text>
              </Row>
              <Row gap={1}>
                <text fg={theme.background} bg={theme.success}>
                  {' p '}
                </text>
                <text fg={theme.muted}>{` publish ${type.slice(0, -1)}`}</text>
              </Row>
            </Row>
          )}
        </Panel>

        <Panel title="detail" width="44%" flexShrink={1}>
          {!current && <Tone name="faint">nothing selected</Tone>}
          {current && (
            <box flexDirection="column" gap={1}>
              <Heading>{truncate(entryTitle(type, current), detailWidth)}</Heading>
              <Row gap={1}>
                <Badge name={current.status === 'published' ? 'success' : 'draft'}>{current.status}</Badge>
                {current.featured && <Badge name="accent">featured</Badge>}
                <Tone name="faint">{`sort ${current.sort_index}`}</Tone>
              </Row>
              <Tone name="muted">{current.slug}</Tone>
              <Tone name="faint">
                {truncate(
                  current.body
                    .split('\n')
                    .filter((line) => line.trim() && !line.trim().startsWith('#'))
                    .join('  '),
                  summaryWidth,
                )}
              </Tone>
              <Row marginTop={1} gap={1}>
                <text fg={theme.background} bg={theme.success}>
                  {' p '}
                </text>
                <Tone name="muted">
                  {current.status === 'published' ? 'move back to draft' : 'publish this entry'}
                </Tone>
              </Row>
            </box>
          )}
        </Panel>
      </Row>

      <Notice tone={notice?.tone ?? 'faint'}>
        {notice?.text ?? `${published} published · ${drafts} draft${drafts === 1 ? '' : 's'}`}
      </Notice>

      <KeyHints
        width={width}
        items={
          mode === 'filter'
            ? [
                ['type', 'to filter'],
                ['enter', 'done'],
              ]
            : [
                ['n', 'new'],
                ['p', 'publish'],
                ['/', 'filter'],
                ['↑↓', 'move'],
                ['tab', 'collection'],
                ['q', 'quit'],
              ]
        }
      />
    </box>
  );
}
