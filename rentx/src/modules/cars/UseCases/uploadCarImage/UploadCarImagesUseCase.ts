import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsImagesRespository } from "@modules/cars/repositories/ICarsImagesRepositoy";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carImageRepository: ICarsImagesRespository,

    // @inject("CarsRepository")
    // private carsRepository: CarsRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  async execute({ car_id, images_name }: IRequest) {
    // const car = await this.carsRepository.findById(car_id);

    // if (!car) {
    //   throw new AppError("Car does not exists");
    // }

    images_name.map(async image => {
      await this.carImageRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase };