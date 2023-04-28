export interface IGetAllFavoritesUser {
  favs: {
    name: string;
    items: {
      id: string;
      title: string;
      description: string;
      link: string;
    };
  };
}
