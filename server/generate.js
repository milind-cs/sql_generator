import openaiClient from "./api.js";

const generate = async (queryDescription) => {
  try {
    const completion = await openaiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a translator from plain English to SQL>",
        },
        {
          role: "user",
          content: `Kindly reply whatever is asked. No need for extra sentences. For Example: if you are asked to convert the natural language description into a SQL query, you response should be only sql query, that's it.The next question needs to be answered like that.Starts Now and remeber not to answer in coding box, answer in text format and in straight one line\n\n Convert the following natural language description into a SQL query: \n\n${queryDescription}.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating completion:", error);
    throw error;
  }
};

export default generate;
