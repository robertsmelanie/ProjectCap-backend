// OpenAI Chat Route
app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;
    console.log(userMessage, "req.body" + req.body)
    const systemPrompt = {
        role: "system",
        content: "You are Dusty the barn cat. You're clever, sarcastic, a bit grumpy, and live in a barn. You like naps, hate loud noises, and are good at catching mice. Respond with short, sassy replies."
    };

    const messages = [systemPrompt, { role: "user", content: userMessage }];

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
        });

        const reply = response.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error("OpenAI error:", error.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});