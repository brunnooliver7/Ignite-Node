import { ICarsImagesRespository } from "@modules/cars/repositories/ICarsImagesRepositoy";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {

  constructor(
    @inject("CarsImagesRepository")
    private carImageRepository: ICarsImagesRespository
  ) { }

  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async image => {
      await this.carImageRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };