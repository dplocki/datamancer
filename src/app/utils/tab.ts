export class Tab {

  public get tabName(): string {
    return this._tabName;
  }

  public get startingQuery(): string {
    return this._startingQuery;
  }

  constructor(private _tabName: string, private _startingQuery: string) {
  }
}
