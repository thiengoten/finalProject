import OpenAi from 'openai'

export const openai = new OpenAi({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: import.meta.env.VITE_OPENAI_ORGANIZATION_ID,
  dangerouslyAllowBrowser: true,
})
