import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey:
    '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',
  dangerouslyAllowBrowser: true
});

export async function checkTask(task: string, code: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'Ты эксперт по проверке заданий на программирование, пишешь только на русском языке'
      },
      {
        role: 'user',
        content: `Дана следующая задача: ${task} \n проверь это решение на правильность: ${code} \n Если задача в целом решена верно, напиши "Задача решена верно!". Если нет, но напиши 5-10 слов о том, в чём ошибка`
      }
    ],
    model: 'deepseek/deepseek-chat-v3-0324:free'
  });

  return completion.choices[0].message.content;
}

//sk-638345cc39de48788ba13b3c0e84422b

//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
