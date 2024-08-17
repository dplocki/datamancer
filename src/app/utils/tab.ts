export abstract class Tab {

  public get tabName(): string {
    return this._tabName;
  }

  abstract get initializeParamater(): string;

  constructor(private _tabName: string) {
  }
}

export class QueryTab extends Tab {

  public override get initializeParamater(): string {
    return this._startingQuery;
  }

  constructor(_tabName: string, private _startingQuery: string) {
    super(_tabName);
  }

}