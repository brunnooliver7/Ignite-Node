import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DayProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

const mockUser = {
  id: "ABC",
  name: "user",
  email: "email@example.com",
  password: "123",
  driver_license: "ABC"
}

const mockCar1 = {
  id: "123",
  name: "car test 1",
  description: "car test 2",
  daily_rate: 100,
  license_plate: "test 1",
  fine_amount: 40,
  category_id: "1234",
  brand: "brand"
}

const mockCar2 = {
  id: "321",
  name: "car test 2",
  description: "car test 2",
  daily_rate: 100,
  license_plate: "test",
  fine_amount: 40,
  category_id: "1235",
  brand: "brand"
}

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
      usersRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const user = await usersRepositoryInMemory.create(mockUser);
    const car = await carsRepositoryInMemory.create(mockCar1);

    const rental = await createRentalUseCase.execute({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    const user = await usersRepositoryInMemory.create(mockUser);
    const car1 = await carsRepositoryInMemory.create(mockCar1);
    const car2 = await carsRepositoryInMemory.create(mockCar2);

    await createRentalUseCase.execute({
      user_id: user.id,
      car_id: car1.id,
      expected_return_date: dayAdd24Hours
    });

    await expect(createRentalUseCase.execute({
      user_id: user.id,
      car_id: car2.id,
      expected_return_date: dayAdd24Hours
    })
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    const user = await usersRepositoryInMemory.create(mockUser);
    const car = await carsRepositoryInMemory.create(mockCar1);

    await createRentalUseCase.execute({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });

    await expect(
      createRentalUseCase.execute({
        user_id: user.id,
        car_id: car.id,
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return type", async () => {
    const user = await usersRepositoryInMemory.create(mockUser);
    const car = await carsRepositoryInMemory.create(mockCar1);

    await expect(
      createRentalUseCase.execute({
        user_id: user.id,
        car_id: car.id,
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});