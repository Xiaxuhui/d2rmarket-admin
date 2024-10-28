export enum TYPE_ENUM {
  Sundry = 1,
  Armor,
  Weapon,
  Currency,
}

export enum QUALITY_ENUM {
  Common,
  Magic,
  Uncommon,
  Unique,
  Suit,
  Runewords,
  Handmade,
}

export const TYPE_SELECTION = [
  {
    label: 'Sundry',
    value: TYPE_ENUM.Sundry,
    key: '1',
  },
  {
    label: 'Armor',
    value: TYPE_ENUM.Armor,
    key: '2',
  },
  {
    label: 'Weapon',
    value: TYPE_ENUM.Weapon,
    key: '3',
  },
  {
    label: 'Currency',
    value: TYPE_ENUM.Currency,
    key: '4',
  },
];

export const TYPE_TEXT = {
  [TYPE_ENUM.Sundry]: 'Sundry',
  [TYPE_ENUM.Armor]: 'Armor',
  [TYPE_ENUM.Weapon]: 'Weapon',
  [TYPE_ENUM.Currency]: 'Currency',
};

export const QUALITY_SELECTION = [
  {
    label: 'Common',
    value: QUALITY_ENUM.Common,
    key: '1',
  },
  {
    label: 'Magic',
    value: QUALITY_ENUM.Magic,
    key: '2',
  },
  {
    label: 'Uncommon',
    value: QUALITY_ENUM.Uncommon,
    key: '3',
  },
  {
    label: 'Unique',
    value: QUALITY_ENUM.Unique,
    key: '4',
  },
  {
    label: 'Suit',
    value: QUALITY_ENUM.Suit,
    key: '5',
  },
  {
    label: 'Runewords',
    value: QUALITY_ENUM.Runewords,
    key: '6',
  },
  {
    label: 'Handmade',
    value: QUALITY_ENUM.Handmade,
    key: '7',
  },
];

export const QUALITY_TEXT = {
  [QUALITY_ENUM.Common]: 'Common',
  [QUALITY_ENUM.Magic]: 'Magic',
  [QUALITY_ENUM.Uncommon]: 'Uncommon',
  [QUALITY_ENUM.Unique]: 'Unique',
  [QUALITY_ENUM.Suit]: 'Suit',
  [QUALITY_ENUM.Runewords]: 'Runewords',
  [QUALITY_ENUM.Handmade]: 'Handmade',
};
