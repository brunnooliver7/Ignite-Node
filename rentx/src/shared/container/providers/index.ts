import { container } from "tsyringe";
import { IDateProvider } from "./DayProvider/IDateProvider";
import { DayjsDateProvider } from "./DayProvider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)