import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesRespository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImagesRespository };