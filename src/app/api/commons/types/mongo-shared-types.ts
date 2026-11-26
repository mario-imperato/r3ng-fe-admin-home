export class MongoDate {
  constructor(aDataBean: any) {}
}

export interface IMongoDate {
   value: any;
}

export interface IMongoSysInfoDTO {
  createdatTime: number;
  modifiedatTime: number;
  status: string;
  rtype: string;
  olock: number;
}

export class MongoSysInfoDTO {
  createdat: MongoDate;
  modifiedat: MongoDate;
  status: string;
  rtype: string;
  olock: number;

  constructor(aDataBean: any) {
    this.createdat = aDataBean && aDataBean.createdat && new MongoDate(aDataBean.createdat);
    this.modifiedat = aDataBean && aDataBean.modifiedat && new MongoDate(aDataBean.modifiedat);
    this.status = (aDataBean && aDataBean.status) || null;
    this.rtype = (aDataBean && aDataBean.rtype) || null;
    this.olock = (aDataBean && aDataBean.olock) || null;
  }
}

export interface IMongoLinkDTO {
  linkid: string;
  name: string;
  href: string;
  linktype: string;
}

export class MongoLinkDTO {
  linkid: string;
  name: string;
  href: string;
  linktype: string;

  constructor(aDataBean: any) {
    this.linkid = (aDataBean && aDataBean.linkid) || null;
    this.name = (aDataBean && aDataBean.name) || null;
    this.href = (aDataBean && aDataBean.href) || null;
    this.linktype = (aDataBean && aDataBean.linktype) || null;
  }
}
