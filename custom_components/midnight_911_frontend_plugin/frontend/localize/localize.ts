import * as en from './languages/en.json';

import IntlMessageFormat from 'intl-messageformat';

// Only English ships today - the other 20 language files inherited from
// Alarmo were stale relative to this panel's trimmed/rebuilt key structure
// (missing every key added for the new adapter, still referencing removed
// MQTT/automations concepts) and were dropped rather than left misleading.
// localize() already falls back to English for any language not present
// here, so this degrades gracefully if re-added later.
var languages: any = {
  en: en,
};

export function localize(string: string, language: string, ...args: any[]): string {
  const lang = language.replace(/['"]+/g, '');

  var translated: string;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i], languages['en']);

  if (!args.length) return translated;

  const argObject = {};
  for (let i = 0; i < args.length; i += 2) {
    let key = args[i];
    key = key.replace(/^{([^}]+)?}$/, '$1');
    argObject[key] = args[i + 1];
  }

  try {
    const message = new IntlMessageFormat(translated, language);
    return message.format(argObject) as string;
  } catch (err) {
    return 'Translation ' + err;
  }
}
