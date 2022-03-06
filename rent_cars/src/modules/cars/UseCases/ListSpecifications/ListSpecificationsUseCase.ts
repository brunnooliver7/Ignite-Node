import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationsUseCase {
  constructor(private SpecificationsRepository: ISpecificationRepository) { }

  execute(): Specification[] {
    const specifications = this.SpecificationsRepository.list();
    return specifications;
  }
}

export { ListSpecificationsUseCase };
