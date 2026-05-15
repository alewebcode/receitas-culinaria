import { CategoriesRepository } from "../repositories/categories-repository";

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute() {
    const categories = await this.categoriesRepository.findCategories();

    return categories;
  }
}
