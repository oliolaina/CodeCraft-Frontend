// Определяем интерфейс для ответа от Giphy API
interface GiphyResponse {
  data: {
    images: {
      original: {
        url: string;
      };
    };
  };
}

const GIPHY_API_KEY: string = 'ts64l9BPU34lyu6M7RBG94xyb0e6oXdk';

export const getRandomGif = async (tag: string): Promise<string> => {
  try {
    // Формируем URL запроса. &rating=g - чтобы гифки были без рейтинга 18+
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${tag}&rating=g`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Giphy API error: ${response.status}`);
    }

    // Явно указываем тип для data
    const data: GiphyResponse = await response.json();

    // Возвращаем URL гифки
    return data.data.images.original.url;
  } catch (error) {
    console.error('Failed to fetch Giphy:', error);
    // Возвращаем URL заглушки на случай ошибки
    return 'https://media.giphy.com/media/3o7TKwxYkeW0ZvTqsU/giphy.gif';
  }
};
