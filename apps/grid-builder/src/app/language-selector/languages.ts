const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const languageToFlag = new Map<string, string>([
  ['en', getFlagEmoji('gb')],
  ['de', getFlagEmoji('de')],
]);

export const toFlag = (language: string) =>
  languageToFlag.get(language) ?? getFlagEmoji('gb');
