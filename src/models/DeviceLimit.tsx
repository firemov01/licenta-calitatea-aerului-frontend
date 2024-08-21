class DeviceLimit {
  id: number;
  name: string;
  lowValue: number;
  highValue: number;
  unit: string;
  imageUrl: string;

  constructor(
    id: number,
    name: string,
    lowValue: number,
    highValue: number,
    unit: string,
    imageUrl: string
  ) {
    this.id = id;
    this.name = name;
    this.lowValue = lowValue;
    this.highValue = highValue;
    this.unit = unit;
    this.imageUrl = imageUrl;
  }

  static fromObject(data: any) {
    return new DeviceLimit(
      data.id,
      data.name,
      data.low_value,
      data.high_value,
      data.unit,
      data.image_url
    );
  }

  static fromArray(data: any) {
    return data.map(DeviceLimit.fromObject);
  }

  static toObject(data: DeviceLimit) {
    return {
      id: data.id,
      name: data.name,
      low_value: data.lowValue,
      high_value: data.highValue,
      unit: data.unit,
      image_url: data.imageUrl,
    };
  }
}

export { DeviceLimit };
