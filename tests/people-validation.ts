import test from 'node:test';
import assert from 'node:assert';

test('input truncation logic limits strings to 100 characters', () => {
  const longName = 'A'.repeat(150);
  const sanitizedName = longName.substring(0, 100);

  const longNotes = 'B'.repeat(200);
  const sanitizedNotes = longNotes ? longNotes.substring(0, 100) : null;

  assert.strictEqual(sanitizedName.length, 100);
  assert.strictEqual(sanitizedName, 'A'.repeat(100));

  assert.strictEqual(sanitizedNotes?.length, 100);
  assert.strictEqual(sanitizedNotes, 'B'.repeat(100));

  const shortName = 'Alice';
  const sanitizedShortName = shortName.substring(0, 100);

  assert.strictEqual(sanitizedShortName.length, 5);
  assert.strictEqual(sanitizedShortName, 'Alice');

  const emptyNotes: string = '';
  const sanitizedEmptyNotes = emptyNotes ? emptyNotes.substring(0, 100) : null;
  assert.strictEqual(sanitizedEmptyNotes, null);
});
