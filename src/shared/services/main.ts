import { kinopoiskDevFetch } from '@/shared/api/kinopoiskDevFetch';

const blur =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAMUlEQVR4nGMQlVZkYOPlFBATk1VhEJNVefntX333FB5hCQZRacV3f/9vP3oOyoErAwBFnwyaF1AkJwAAAABJRU5ErkJggg==';

export const mainServices = {
  getPremieres: async () => {
    const month = new Date().getMonth().toString();
    const parse = month.length === 1 ? `0${month}` : month;

    const parameters: ParametersRequest = {
      selectFields: [
        'id',
        'name',
        'premiere.world',
        'poster.url',
        'description',
        'backdrop.url',
      ],
      type: ['movie'],
      'premiere.world': `01.${parse}.2023-01.${Number(parse) + 1}.2023`,
      name: '!null',
      'poster.url': '!null',
    };

    type TResponsePremiere = IResponseMovies<IPremiereMovie>;

    const { docs } = await kinopoiskDevFetch<TResponsePremiere>({
      endpoint: 'movie',
      version: '1.3',
      parameters,
    });

    const result = docs.map((el) => ({
      ...el,
      poster: { src: el.poster.url || '', blur },
      backdrop: { src: el.backdrop.url || '', blur },
    }));

    return result;
  },

  getTopYear: async () => {
    const parameters: ParametersRequest = {
      selectFields: ['id', 'name', 'rating', 'poster.previewUrl'],
      sortField: ['votes.kp'],
      'genres.name': [
        '!документальный',
        '!история',
        '!спорт',
        '!музыка',
        '!биография',
        '!мюзикл',
        '!драма',
      ],
      page: 1,
      limit: 20,
      type: ['movie'],
      'votes.kp': '60000-1000000',
      'premiere.world': '01.01.2022-31.12.2022',
      'poster.previewUrl': '!null',
      name: '!null',
    };

    type TResponseDefault = IResponseMovies<IDefaultSlider>;

    const { docs } = await kinopoiskDevFetch<TResponseDefault>({
      endpoint: 'movie',
      version: '1.3',
      parameters,
    });

    const result = docs.map((el) => ({
      ...el,
      poster: { src: el.poster.previewUrl || '', blur },
    }));
    return result;
  },

  getMovies: async (
    type: TypeMovie,
    countries: string[] | 'all',
    minVotes: number,
    year: 'all' | 'new' = 'all',
  ) => {
    const parameters: ParametersRequest = {
      selectFields: ['id', 'name', 'rating', 'poster.previewUrl'],
      sortField: year === 'all' ? ['votes.kp'] : ['premiere.world'],
      'genres.name': [
        '!документальный',
        '!история',
        '!спорт',
        '!музыка',
        '!биография',
        '!мюзикл',
      ],
      page: 1,
      limit: 20,
      type: [type],
      'countries.name': countries === 'all' ? undefined : countries,
      'rating.kp': '7-10',
      'rating.imdb': '6-10',
      'votes.kp': `${minVotes}-9999999`,
      'premiere.world':
        year === 'all' ? '01.01.2010-31.12.2023' : '01.06.2022-31.12.2023',
      'poster.previewUrl': '!null',
      name: '!null',
    };

    type TResponseDefault = IResponseMovies<IDefaultSlider>;

    const { docs } = await kinopoiskDevFetch<TResponseDefault>({
      endpoint: 'movie',
      version: '1.3',
      parameters,
    });

    const result = docs.map((el) => ({
      ...el,
      poster: { src: el.poster.previewUrl || '', blur },
    }));

    return result;
  },

  getCartoonSlider: async () => {
    const parameters: ParametersRequest = {
      selectFields: ['id', 'name', 'rating', 'poster.previewUrl'],
      sortField: ['votes.await'],
      page: 1,
      limit: 20,
      type: ['cartoon'],
      'rating.kp': '7-10',
      'premiere.world': '01.01.2020-31.12.2022',
      'poster.previewUrl': '!null',
      name: '!null',
    };

    type TResponseDefault = IResponseMovies<IDefaultSlider>;

    const { docs } = await kinopoiskDevFetch<TResponseDefault>({
      endpoint: 'movie',
      version: '1.3',
      parameters,
    });

    const result = docs.map((el) => ({
      ...el,
      poster: { src: el.poster.previewUrl || '', blur },
    }));

    return result;
  },
};
