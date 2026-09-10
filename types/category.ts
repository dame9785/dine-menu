export interface CategoryDto {
  id?: number;
  name: string;
}

export interface CategoryViewModel {
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
