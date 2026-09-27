import { useKeyboard, useRenderer } from '@opentui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Browse from './browse';
import {
  blankValues,
  createDraft,
  loadEntries,
  type EntryRecord,
  type FormValues,
  type SaveResult,
} from './content';
import { fieldsFor, slugify, type ContentType } from './fields';
import Form from './form';
import type { ToneName } from './ui';

export interface Notice {
  tone: ToneName;
  text: string;
}

type View = { name: 'browse' } | { name: 'form' };

const INITIAL_TYPE: ContentType = 'experiences';

export default function App() {
  const renderer = useRenderer();
  const [type, setType] = useState<ContentType>(INITIAL_TYPE);
  const [entries, setEntries] = useState<EntryRecord[]>([]);
  const [view, setView] = useState<View>({ name: 'browse' });
  const [notice, setNotice] = useState<Notice | null>(null);

  const collection = useMemo(() => fieldsFor(type), [type]);
  const refresh = useCallback(() => setEntries(loadEntries(type)), [type]);

  useEffect(() => {
    setNotice(null);
    refresh();
  }, [refresh]);

  useKeyboard((key) => {
    if (view.name !== 'browse') return;
    if ((key.ctrl || key.meta) && key.name === 'r') {
      key.preventDefault();
      refresh();
      setNotice({ tone: 'muted', text: `Reloaded ${type}` });
    }
  });

  const changeType = (next: ContentType) => {
    setType(next);
    setView({ name: 'browse' });
  };

  const startCreate = () => {
    setNotice(null);
    setView({ name: 'form' });
  };

  const submit = (values: FormValues, body: string): SaveResult => {
    if (view.name !== 'form') return { ok: false, message: 'Nothing is open', issues: {} };
    const result = createNew(values, body);
    if (result.ok) {
      setNotice({ tone: 'success', text: result.message });
      setView({ name: 'browse' });
      refresh();
    }
    return result;
  };

  const createNew = (values: FormValues, body: string): SaveResult => {
    const requested = (values.slug ?? '').trim() || slugify(String(values[collection.titleKey] ?? ''));
    if (!requested) {
      return { ok: false, message: 'A slug is required before an entry can be created.', issues: { slug: 'Use kebab-case, or fill in the title first.' } };
    }
    return createDraft(type, requested, collection.all, values, body);
  };

  if (view.name === 'form') {
    return (
      <Form
        key={`${type}:new`}
        collection={collection}
        initialValues={{ ...blankValues(collection.all), slug: '' }}
        notice={notice}
        onSubmit={submit}
        onCancel={() => setView({ name: 'browse' })}
      />
    );
  }

  return (
    <Browse
      type={type}
      entries={entries}
      notice={notice}
      onTypeChange={changeType}
      onCreate={startCreate}
      onNotice={(tone, text) => setNotice({ tone, text })}
      onRefresh={refresh}
      onQuit={() => renderer.destroy()}
    />
  );
}
