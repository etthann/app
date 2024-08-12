/* eslint-disable prettier/prettier */

interface navProps {
  navigation: {
    navigate: (routeName: string, params?: any) => void;
  };
}

interface Movie {
  image_url: string;
  title: string;
  actors: string;
  genres: string;
  plot: string;
  imdb: string;
  handleDescriptionLayout: (event: any) => void;
  isOverflowed: any;
  descriptionRef: any;
  id: number;
  setModalVisible: (event: any) => void;

}

interface MovieCardProps {
  movies: Movie[];
}

export type { navProps, Movie, MovieCardProps };
