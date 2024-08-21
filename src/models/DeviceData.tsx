class DeviceData {
  id: number;
  key: string;
  name: string;
  type: string;
  unit: string;
  access: string;
  lastUpdated: Date;
  value: string;

  constructor(
    id: number,
    key: string,
    name: string,
    type: string,
    unit: string,
    access: string,
    lastUpdated: Date,
    value: string
  ) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.type = type;
    this.unit = unit;
    this.access = access;
    this.lastUpdated = lastUpdated;
    this.value = value;
  }

  static fromObject(data: any) {
    return new DeviceData(
      data.id,
      data.key,
      data.name,
      data.type,
      data.unit,
      data.access,
      new Date(data.last_updated),
      data.value
    );
  }

  static toObject(data: DeviceData) {
    return {
      id: data.id,
      key: data.key,
      name: data.name,
      type: data.type,
      unit: data.unit,
      access: data.access,
      lastUpdated: data.lastUpdated,
      value: parseFloat(data.value),
    };
  }
}

export { DeviceData };
