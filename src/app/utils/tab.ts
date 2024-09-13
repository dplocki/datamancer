export abstract class Tab {
  public get tabName(): string {
    return this._tabName;
  }

  abstract get initializeParamater(): string;

  abstract get tabType(): string;

  constructor(private _tabName: string) {}
}

export class QueryTab extends Tab {
  public override get initializeParamater(): string {
    return this._startingQuery;
  }

  public override get tabType() {
    return 'QUERY';
  }

  constructor(
    _tabName: string,
    private _startingQuery: string,
  ) {
    super(_tabName);
  }
}

export class ImportTab extends Tab {
  public override get tabType(): string {
    return 'IMPORT';
  }

  public override get initializeParamater(): string {
    return '';
  }
}
