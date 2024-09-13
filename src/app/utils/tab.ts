import { TabType } from './tabs.type';

export abstract class Tab {
  public get name(): string {
    return this.tabName;
  }

  abstract get initializeParamater(): string;

  abstract get type(): string;

  constructor(private tabName: string) {}
}

export class QueryTab extends Tab {
  public override get initializeParamater(): string {
    return this.startingQuery;
  }

  public override get type() {
    return TabType.SQLQuery;
  }

  constructor(
    tabName: string,
    private startingQuery: string,
  ) {
    super(tabName);
  }
}

export class ImportTab extends Tab {
  private static readonly ImportInitParamater: string = '';

  public override get type(): string {
    return TabType.ImportData;
  }

  public override get initializeParamater(): string {
    return ImportTab.ImportInitParamater;
  }
}
