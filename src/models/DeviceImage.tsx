class DeviceImage {
    id: number;
    name: string;
    imageUrl: string;

    constructor(id: number, name: string, imageUrl: string) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    static fromObject(data: any) {
        return new DeviceImage(data.id, data.name, data.image_url);
    }
}

export { DeviceImage };