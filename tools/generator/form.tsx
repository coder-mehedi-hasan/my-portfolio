import type { ScrollBoxRenderable, SelectOption, TextareaRenderable } from '@opentui/core';
import { useKeyboard, useTerminalDimensions } from '@opentui/react';
import { useRef, useState } from 'react';
import { resolveSlug, slugConflict, validate, type FormValues, type SaveResult } from './content';
import type { CollectionFields, FieldSpec } from './fields';
import { theme } from './theme';
import { KeyHints, Notice, Panel, Row, Tone, truncate, type ToneName } from './ui';

export interface FormProps {
  collection: CollectionFields;
  initialValues: FormValues;
  notice: { tone: ToneName; text: string } | null;
  onSubmit: (values: FormValues, body: string) => SaveResult;
  onCancel: () => void;
}

const SLUG_SPEC: FieldSpec = {
  key: 'slug',
  label: 'Slug',
  kind: 'text',
  required: false,
  choices: [],
  placeholder: 'kebab-case-file-name',
  help: 'Becomes the filename and the URL. Filled in from the title until you edit it.',
  fallback: '',
};

const LABEL_WIDTH = 20;
const SUBMIT_BINDING = [{ name: 'return', ctrl: true, action: 'submit' as const }];

export default function Form({ collection, initialValues, notice, onSubmit, onCancel }: FormProps) {
  const { width } = useTerminalDimensions();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [body, setBody] = useState('');
  const [focus, setFocus] = useState(0);
  const [slugTouched, setSlugTouched] = useState(false);
  const [result, setResult] = useState<SaveResult | null>(null);
  const [attempted, setAttempted] = useState(false);
  const bodyRef = useRef<TextareaRenderable>(null);
  const scrollerRef = useRef<ScrollBoxRenderable>(null);

  const rows: FieldSpec[] = [
    SLUG_SPEC,
    ...collection.all,
  ];
  const active = rows[Math.min(focus, rows.length - 1)];
  const paneWidth = Math.floor((width - 6) * 0.58) - 4;
  const controlWidth = Math.max(20, paneWidth - LABEL_WIDTH - 2);
  const slug = resolveSlug(collection.titleKey, values);
  const target = `content/${collection.type}/${slug || '<slug>'}.md`;

  // A blank form has nothing to apologise for, so problems surface on the first save.
  const issues = validate(collection.type, collection.all, values, body, slug);
  const conflict = slugConflict(collection.type, slug);
  if (conflict) issues.slug = conflict;
  const messages = attempted ? issues : {};

  const setValue = (key: string, value: string) => {
    if (key === 'slug') setSlugTouched(true);
    setValues((previous) => {
      const next = { ...previous, [key]: value };
      if (!slugTouched && key === collection.titleKey) next.slug = value;
      return next;
    });
  };

  const focusRow = (index: number) => {
    setFocus(index);
    const row = rows[index];
    if (row.kind === 'body') return;
    setTimeout(() => scrollerRef.current?.scrollChildIntoView(`field-${row.key}`), 0);
  };

  const step = (delta: number) => {
    focusRow(Math.min(rows.length - 1, Math.max(0, focus + delta)));
  };

  const submit = () => {
    setAttempted(true);
    const outcome = onSubmit(values, bodyRef.current?.plainText ?? body);
    setResult(outcome);
    if (outcome.ok) return;
    const blocked = rows.findIndex((row) => outcome.issues[row.key]);
    if (blocked >= 0) focusRow(blocked);
  };

  useKeyboard((key) => {
    if (key.name === 'tab') {
      key.preventDefault();
      step(key.shift ? -1 : 1);
      return;
    }
    if (key.name === 'escape') {
      key.preventDefault();
      onCancel();
      return;
    }
    if ((key.ctrl || key.meta) && (key.name === 's' || key.name === 'enter')) {
      key.preventDefault();
      submit();
      return;
    }
    // Every other key belongs to the focused control, including plain letters.
  });

  return (
    <box flexDirection="column" flexGrow={1} width="100%" backgroundColor={theme.background}>
      <Row flexShrink={0} paddingX={2} paddingY={1} gap={1} backgroundColor={theme.surface}>
        <text fg={theme.accent}>{`new ${collection.type}`}</text>
        <Tone name="faint">·</Tone>
        <Tone name="muted">{truncate(target, Math.max(24, width - 40))}</Tone>
      </Row>

      <Row flexGrow={1} flexShrink={1} align="stretch" paddingX={2} paddingBottom={1} gap={2}>
        <Panel title={`frontmatter · ${focus + 1}/${rows.length}`} width="58%" flexShrink={1}>
          <scrollbox ref={scrollerRef} scrollY>
            {rows.map((spec, index) => {
              const isActive = index === focus;
              const message = messages[spec.key];
              const label = truncate(`${spec.label}${spec.required && spec.kind !== 'body' ? ' *' : ''}`, LABEL_WIDTH);
              return (
                <box key={spec.key} id={`field-${spec.key}`} flexDirection="column" marginBottom={1}>
                  <Row gap={1}>
                    <text fg={isActive ? theme.accent : theme.muted} width={LABEL_WIDTH}>
                      {label}
                    </text>
                    <Control
                      spec={spec}
                      value={values[spec.key] ?? ''}
                      focused={isActive}
                      width={controlWidth}
                      onChange={(value) => setValue(spec.key, value)}
                      onNext={() => step(1)}
                    />
                  </Row>
                  {(message || (isActive && spec.help)) && (
                    <text fg={message ? theme.danger : theme.faint}>
                      {`${' '.repeat(LABEL_WIDTH + 2)}${truncate(message ?? spec.help ?? '', Math.max(20, paneWidth - LABEL_WIDTH - 6))}`}
                    </text>
                  )}
                </box>
              );
            })}
          </scrollbox>
        </Panel>

        <Panel
          title={messages.body ? 'body — needs attention' : 'body (markdown)'}
          titleColor={messages.body ? theme.danger : theme.muted}
          width="42%"
          flexShrink={1}
        >
          <textarea
            ref={bodyRef}
            focused={active?.kind === 'body'}
            initialValue={body}
            placeholder="Markdown body. Required before an entry can be published."
            wrapMode="word"
            keyBindings={SUBMIT_BINDING}
            onContentChange={() => setBody(bodyRef.current?.plainText ?? '')}
            onSubmit={submit}
          />
        </Panel>
      </Row>

      <Notice tone={result ? (result.ok ? 'success' : 'danger') : notice?.tone ?? 'faint'}>
        {truncate(
          result?.message ?? notice?.text ?? `Nothing saved yet — ctrl+s writes ${target}.`,
          Math.max(20, width - 8),
        )}
      </Notice>

      <KeyHints
        width={width}
        items={[
          ['ctrl+s', 'save, back to list'],
          ['tab', 'next field'],
          ['shift+tab', 'previous'],
          ['esc', 'cancel'],
        ]}
      />
    </box>
  );
}

interface ControlProps {
  spec: FieldSpec;
  value: string;
  focused: boolean;
  width: number;
  onChange: (value: string) => void;
  onNext: () => void;
}

function Control({ spec, value, focused, width, onChange, onNext }: ControlProps) {
  const ref = useRef<TextareaRenderable>(null);

  if (spec.kind === 'flag') {
    const options: SelectOption[] = [
      { name: 'no', description: '', value: 'false' },
      { name: 'yes', description: '', value: 'true' },
    ];
    const pick = (_index: number, option: SelectOption | null) => onChange(option?.value === 'true' ? 'true' : 'false');
    return (
      <select
        focused={focused}
        height={options.length}
        width={width}
        showDescription={false}
        options={options}
        selectedIndex={value === 'true' ? 1 : 0}
        onChange={pick}
        onSelect={(index, option) => {
          pick(index, option);
          onNext();
        }}
      />
    );
  }

  if (spec.kind === 'choice') {
    const options: SelectOption[] = spec.choices.map((choice) => ({ name: choice, description: '', value: choice }));
    const pick = (index: number, option: SelectOption | null) => onChange(String(option?.value ?? spec.choices[index] ?? value));
    return (
      <select
        focused={focused}
        height={Math.min(options.length, 3)}
        width={width}
        showDescription={false}
        showScrollIndicator={options.length > 3}
        options={options}
        selectedIndex={Math.max(0, spec.choices.indexOf(value))}
        onChange={pick}
        onSelect={(index, option) => {
          pick(index, option);
          onNext();
        }}
      />
    );
  }

  if (spec.kind === 'long') {
    return (
      <textarea
        ref={ref}
        focused={focused}
        initialValue={value}
        height={3}
        width={width}
        placeholder={spec.placeholder}
        wrapMode="word"
        keyBindings={SUBMIT_BINDING}
        onContentChange={() => onChange(ref.current?.plainText ?? '')}
        onSubmit={onNext}
      />
    );
  }

  return (
    <input
      focused={focused}
      value={value}
      width={width}
      placeholder={truncate(spec.placeholder, width)}
      onInput={onChange}
      onSubmit={onNext}
    />
  );
}
