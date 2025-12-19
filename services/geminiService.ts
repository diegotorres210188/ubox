import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

// Initialize the Gemini client only if the key is available
try {
    if (process.env.API_KEY) {
        genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI", error);
}

export const getShoppingAdvice = async (query: string): Promise<string> => {
  if (!genAI) {
    return "Lo siento, no puedo conectarme al servicio de IA en este momento. Por favor verifica tu configuración.";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      Eres el Asistente de Compras Inteligente de Ubox. Tu objetivo es ayudar a usuarios en Paraguay a encontrar los mejores productos para comprar en USA (Miami) e importar.
      
      Guías clave:
      1. Sugiere tiendas populares (Amazon, eBay, Walmart, BestBuy, Carter's, Sephora).
      2. Mantén las respuestas concisas, amigables y formateadas para móvil (párrafos cortos, viñetas).
      3. Enfócate en ofertas, eficiencia de peso (artículos livianos son más baratos de traer), y tendencias.
      4. Si preguntan por precios de envío, recuérdales revisar la calculadora en la app, pero diles que "más liviano es mejor".
      5. Tono: Servicial, moderno, usando un español neutro o con un leve voseo paraguayo/rioplatense si cuadra (ej. "podés", "mirá").
    `;

    const response = await genAI.models.generateContent({
      model: model,
      contents: query,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "No pude generar una recomendación en este momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Disculpa, tuve problemas para pensar en una sugerencia. Intenta de nuevo más tarde.";
  }
};