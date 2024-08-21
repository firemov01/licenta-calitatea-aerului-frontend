import { DeviceImage } from "./DeviceImage";

class AutomatedDevice {
    id?: number;
    name: string;
    description: string;
    endpoint: string;
    enabled: boolean;
    image: DeviceImage | null;

    constructor(id: number | undefined, name: string, description: string, endpoint: string, enabled: boolean, image: DeviceImage | null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.endpoint = endpoint;
        this.enabled = enabled;
        this.image = image;
    }

    static fromObject(data: any) {
        return new AutomatedDevice(data.id, data.name, data.description, data.endpoint, data.enabled, DeviceImage.fromObject(data.image));
    }
}

export { AutomatedDevice };