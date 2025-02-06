export type CardType = {
  TagText: string;
  TagTextColor?: string;
  ContentText: string;
};

export type CardColumnType = {
  columnName: string;
  cards: CardType[] | null;
};

export type CardColumnsType = CardColumnType[];
