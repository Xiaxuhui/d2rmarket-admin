export enum TYPE_ENUM {
  MISC = 1,
  Armor,
  Weapon,
  Currency,
}

export enum QUALITY_ENUM {
  UNDEFINED,
  Normal,
  Magic,
  Rare,
  Unique,
  Suit,
  Runewords,
  Handmade,
}

export enum ORDER_STATUS {
  CANCEL = -1,
  OVERTIME = -2,
  DELETE = -10,
  UNPAID = 1,
  PAID = 5,
  BE_SENDING = 10,
  DONE = 15,
}

export const ORDER_STATUS_GROUP = [
  ORDER_STATUS.OVERTIME,
  ORDER_STATUS.BE_SENDING,
  ORDER_STATUS.PAID,
  ORDER_STATUS.DONE,
];

export enum ROLE_ENUM {
  Amazon = 1,
  Assassin,
  Barbarian,
  Druid,
  Paladin,
  Necro,
  Sorceress,
}

export enum TAGS_ENUM {
  Ethereal = 1,
  Unidentified,
  Knockback,
  Indestructible,
  Prevent_Monster_Healing,
  Ignore_Targets_Defense,
  Half_Freeze_Duration,
}

export enum RUNE_WORDS {
  SPIRIT = 1,
  INFINITY,
  ENIGMA,
  FORTITUDE,
  GRIEF,
  CALL_TO_ARMS,
  MOSIC,
  METAMORPHOSIS,
  PLAGUE,
  MIST,
  DELIRIUM,
  CURE,
  HEART_OF_THE_OAK,
  DEATH,
  EXILE,
  HONOR,
  FAITH,
  PHOENIX,
  DOOM,
  BEAST,
}

export const TAGS_TEXT = {
  [TAGS_ENUM.Ethereal]: 'Ethereal',
  [TAGS_ENUM.Unidentified]: 'Unidentified',
  [TAGS_ENUM.Knockback]: 'Knockback',
  [TAGS_ENUM.Indestructible]: 'Indestructible',
  [TAGS_ENUM.Prevent_Monster_Healing]: 'Prevent Monster Healing',
  [TAGS_ENUM.Ignore_Targets_Defense]: "Ignore Target's Defense",
  [TAGS_ENUM.Half_Freeze_Duration]: 'Half Freeze Duration',
};

export const TAGS_OPTIONS = [
  {
    label: TAGS_TEXT[TAGS_ENUM.Ethereal],
    value: TAGS_ENUM.Ethereal,
  },
  {
    label: TAGS_TEXT[TAGS_ENUM.Unidentified],
    value: TAGS_ENUM.Unidentified,
  },
  {
    label: TAGS_TEXT[TAGS_ENUM.Knockback],
    value: TAGS_ENUM.Knockback,
  },
  {
    label: TAGS_TEXT[TAGS_ENUM.Indestructible],
    value: TAGS_ENUM.Indestructible,
  },
  {
    label: TAGS_TEXT[TAGS_ENUM.Prevent_Monster_Healing],
    value: TAGS_ENUM.Prevent_Monster_Healing,
  },
  {
    label: TAGS_TEXT[TAGS_ENUM.Ignore_Targets_Defense],
    value: TAGS_ENUM.Ignore_Targets_Defense,
  },
  {
    label: TAGS_TEXT[TAGS_ENUM.Half_Freeze_Duration],
    value: TAGS_ENUM.Half_Freeze_Duration,
  },
];

export const ROLE_TEXT = {
  [ROLE_ENUM.Amazon]: 'Amazon',
  [ROLE_ENUM.Assassin]: 'Assassin',
  [ROLE_ENUM.Barbarian]: 'Barbarian',
  [ROLE_ENUM.Druid]: 'Druid',
  [ROLE_ENUM.Paladin]: 'Paladin',
  [ROLE_ENUM.Necro]: 'Necro',
  [ROLE_ENUM.Sorceress]: 'Sorceress',
};

export const ROLE_SKILL_SELECTION = {
  [ROLE_ENUM.Sorceress]: [
    {
      label: 'Cold',
      value: 1,
    },
    {
      label: 'Lightning',
      value: 2,
    },
    {
      label: 'Fire',
      value: 3,
    },
  ],
  [ROLE_ENUM.Amazon]: [
    {
      label: 'Javelin and Spear',
      value: 1,
    },
    {
      label: 'Passive and Magic',
      value: 2,
    },
    {
      label: 'Bow and Crossbow',
      value: 3,
    },
  ],
  [ROLE_ENUM.Assassin]: [
    {
      label: 'Martial Arts',
      value: 1,
    },
    {
      label: 'Shadow Disciplines',
      value: 2,
    },
    {
      label: 'Traps',
      value: 3,
    },
  ],
  [ROLE_ENUM.Barbarian]: [
    {
      label: 'Combat',
      value: 1,
    },
    {
      label: 'Combat Masteries',
      value: 2,
    },
    {
      label: 'Warcry',
      value: 3,
    },
  ],
  [ROLE_ENUM.Druid]: [
    {
      label: 'Elemental',
      value: 1,
    },
    {
      label: 'Shapeshifting',
      value: 2,
    },
    {
      label: 'Summoning',
      value: 3,
    },
  ],
  [ROLE_ENUM.Paladin]: [
    {
      label: 'Defensive Auras',
      value: 1,
    },
    {
      label: 'Offensive Auras',
      value: 2,
    },
    {
      label: 'Combat',
      value: 3,
    },
  ],
  [ROLE_ENUM.Necro]: [
    {
      label: 'Summoning',
      value: 1,
    },
    {
      label: 'Poison and Bone Spells',
      value: 2,
    },
    {
      label: 'Curses',
      value: 3,
    },
  ],
};

export const ORDER_TEXT = {
  [ORDER_STATUS.CANCEL]: 'cancel(取消)',
  [ORDER_STATUS.UNPAID]: 'unpaid(待支付)',
  [ORDER_STATUS.PAID]: 'paid(已支付)',
  [ORDER_STATUS.BE_SENDING]: 'sent(已发送)',
  [ORDER_STATUS.DONE]: 'sent(已发送)',
  [ORDER_STATUS.OVERTIME]: 'overtime(超时)',
};

export const ORDER_SELECTION = [
  {
    label: ORDER_TEXT[ORDER_STATUS.PAID],
    value: ORDER_STATUS.PAID,
  },
  {
    label: ORDER_TEXT[ORDER_STATUS.OVERTIME],
    value: ORDER_STATUS.OVERTIME,
  },
  {
    label: ORDER_TEXT[ORDER_STATUS.DONE],
    value: `${ORDER_STATUS.DONE},${ORDER_STATUS.BE_SENDING}`,
  },
];

const RUNE_WORDS_TEXT = {
  [RUNE_WORDS.SPIRIT]: 'Spirit',
  [RUNE_WORDS.INFINITY]: 'Infinity',
  [RUNE_WORDS.ENIGMA]: 'Enigma',
  [RUNE_WORDS.FORTITUDE]: 'Fortitude',
  [RUNE_WORDS.GRIEF]: 'Grief',
  [RUNE_WORDS.CALL_TO_ARMS]: 'Call To Arms',
  [RUNE_WORDS.MOSIC]: 'Mosic',
  [RUNE_WORDS.METAMORPHOSIS]: 'Metamorphosis',
  [RUNE_WORDS.PLAGUE]: 'Plague',
  [RUNE_WORDS.MIST]: 'Mist',
  [RUNE_WORDS.DELIRIUM]: 'Delirium',
  [RUNE_WORDS.CURE]: 'Cure',
  [RUNE_WORDS.HEART_OF_THE_OAK]: 'Heart Of The Oak',
  [RUNE_WORDS.DEATH]: 'Death',
  [RUNE_WORDS.EXILE]: 'Exile',
  [RUNE_WORDS.HONOR]: 'Honor',
  [RUNE_WORDS.FAITH]: 'Faith',
  [RUNE_WORDS.PHOENIX]: 'Phoenix',
  [RUNE_WORDS.DOOM]: 'Doom',
  [RUNE_WORDS.BEAST]: 'Beast',
};

export const RUNE_WORDS_SELECTION = [
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.SPIRIT],
    value: RUNE_WORDS.SPIRIT,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.INFINITY],
    value: RUNE_WORDS.INFINITY,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.ENIGMA],
    value: RUNE_WORDS.ENIGMA,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.FORTITUDE],
    value: RUNE_WORDS.FORTITUDE,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.GRIEF],
    value: RUNE_WORDS.GRIEF,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.CALL_TO_ARMS],
    value: RUNE_WORDS.CALL_TO_ARMS,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.MOSIC],
    value: RUNE_WORDS.MOSIC,
  },

  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.METAMORPHOSIS],
    value: RUNE_WORDS.METAMORPHOSIS,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.PLAGUE],
    value: RUNE_WORDS.PLAGUE,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.MIST],
    value: RUNE_WORDS.MIST,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.DELIRIUM],
    value: RUNE_WORDS.DELIRIUM,
  },

  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.CURE],
    value: RUNE_WORDS.CURE,
  },

  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.HEART_OF_THE_OAK],
    value: RUNE_WORDS.HEART_OF_THE_OAK,
  },

  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.DEATH],
    value: RUNE_WORDS.DEATH,
  },

  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.EXILE],
    value: RUNE_WORDS.EXILE,
  },

  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.HONOR],
    value: RUNE_WORDS.HONOR,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.FAITH],
    value: RUNE_WORDS.FAITH,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.PHOENIX],
    value: RUNE_WORDS.PHOENIX,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.DOOM],
    value: RUNE_WORDS.DOOM,
  },
  {
    label: RUNE_WORDS_TEXT[RUNE_WORDS.BEAST],
    value: RUNE_WORDS.BEAST,
  },
];

export const ROLE_SELECTION = [
  {
    label: ROLE_TEXT[ROLE_ENUM.Amazon],
    value: ROLE_ENUM.Amazon,
    key: ROLE_ENUM.Amazon,
  },
  {
    label: ROLE_TEXT[ROLE_ENUM.Assassin],
    value: ROLE_ENUM.Assassin,
    key: ROLE_ENUM.Assassin,
  },
  {
    label: ROLE_TEXT[ROLE_ENUM.Barbarian],
    value: ROLE_ENUM.Barbarian,
    key: ROLE_ENUM.Barbarian,
  },
  {
    label: ROLE_TEXT[ROLE_ENUM.Druid],
    value: ROLE_ENUM.Druid,
    key: ROLE_ENUM.Druid,
  },
  {
    label: ROLE_TEXT[ROLE_ENUM.Paladin],
    value: ROLE_ENUM.Paladin,
    key: ROLE_ENUM.Paladin,
  },
  {
    label: ROLE_TEXT[ROLE_ENUM.Necro],
    value: ROLE_ENUM.Necro,
    key: ROLE_ENUM.Necro,
  },
  {
    label: ROLE_TEXT[ROLE_ENUM.Sorceress],
    value: ROLE_ENUM.Sorceress,
    key: ROLE_ENUM.Sorceress,
  },
];

export const TYPE_SELECTION = [
  {
    label: 'MISC(杂项)',
    value: TYPE_ENUM.MISC,
    key: '1',
  },
  {
    label: 'Armor(护甲)',
    value: TYPE_ENUM.Armor,
    key: '2',
  },
  {
    label: 'Weapon（武器）',
    value: TYPE_ENUM.Weapon,
    key: '3',
  },
  {
    label: 'Currency(通货)',
    value: TYPE_ENUM.Currency,
    key: '4',
  },
];

export const TYPE_TEXT = {
  [TYPE_ENUM.MISC]: 'MISC',
  [TYPE_ENUM.Armor]: 'Armor',
  [TYPE_ENUM.Weapon]: 'Weapon',
  [TYPE_ENUM.Currency]: 'Currency',
};

export const QUALITY_SELECTION = [
  {
    label: 'Normal',
    value: QUALITY_ENUM.Normal,
    key: '1',
  },
  {
    label: 'Magic',
    value: QUALITY_ENUM.Magic,
    key: '2',
  },
  {
    label: 'Rare',
    value: QUALITY_ENUM.Rare,
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
  [QUALITY_ENUM.Normal]: 'Normal',
  [QUALITY_ENUM.Magic]: 'Magic',
  [QUALITY_ENUM.Rare]: 'Rare',
  [QUALITY_ENUM.Unique]: 'Unique',
  [QUALITY_ENUM.Suit]: 'Suit',
  [QUALITY_ENUM.Runewords]: 'Runewords',
  [QUALITY_ENUM.Handmade]: 'Handmade',
};

export enum GOODS_STATE {
  Init,
  Publish,
  Unpublish,
  Delete = 9,
}

export const STATUS_TEXT = {
  [GOODS_STATE.Init]: 'Unpublished',
  [GOODS_STATE.Publish]: 'Published',
  [GOODS_STATE.Unpublish]: 'Unpublished',
  [GOODS_STATE.Delete]: 'Deleted',
};

export const UNLIMITED_INVENTORY = 99999;

export const ERROR_IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==';
