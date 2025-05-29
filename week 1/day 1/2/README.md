# Prompt Playground: Product Description Generator

This project is a configurable prompt playground that generates product descriptions for user-specified items using different OpenAI completion parameters.

## 🧪 Prompt

**Instruction:**  
"Write a compelling product description for the following item: _{item}_"

**Test Item:**  
iPhone

## 🔧 Parameters and Test Values

| Parameter         | Test Values   |
| ----------------- | ------------- |
| temperature       | 0.0, 0.7, 1.2 |
| max_tokens        | 50, 150, 300  |
| presence_penalty  | 0.0, 1.5      |
| frequency_penalty | 0.0, 1.5      |

---

## 📊 Output Grid

| Temperature | Max Tokens | Presence Penalty | Frequency Penalty | Output                                                                                                                                                                                                                                                                                                                                                            |
| ----------- | ---------- | ---------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.0         | 50         | 0.0              | 0.0               | The iPhone is a smartphone developed by Apple. It features a sleek design, powerful hardware, and iOS.                                                                                                                                                                                                                                                            |
| 0.7         | 150        | 0.0              | 0.0               | Experience the future with the iPhone — a seamless blend of elegance and power. Equipped with a stunning display, advanced camera system, and lightning-fast A-series chip, it's designed for those who demand the best in mobile technology.                                                                                                                     |
| 1.2         | 300        | 0.0              | 0.0               | Say hello to the iPhone — not just a phone, but a revolution in your palm. Picture-perfect photography, effortless multitasking, and a design so refined it's practically art. Whether you're capturing moments, streaming 4K content, or exploring new apps, the iPhone delivers a surreal experience powered by cutting-edge innovation and unmatched elegance. |
| 1.2         | 150        | 1.5              | 1.5               | iPhone. Imagine sleek, imagine vibrant, imagine intuitive. The experience redefined — again. Feel the pulse of power and elegance through every swipe and tap. Different? Absolutely.                                                                                                                                                                             |
| 0.7         | 150        | 1.5              | 1.5               | Meet the iPhone — a marvel of innovation and design. From ultra-fast processing to cinematic-quality photos, every detail is engineered for impact. Unique? Unquestionably.                                                                                                                                                                                       |
| 0.0         | 150        | 1.5              | 1.5               | The iPhone is a smartphone developed by Apple. It has a touchscreen, a camera, and connects to the internet.                                                                                                                                                                                                                                                      |
| 0.0         | 300        | 0.0              | 0.0               | The iPhone is a smartphone made by Apple Inc. It features a touchscreen interface, advanced hardware, and a proprietary operating system called iOS. It is known for its user-friendly design and regular software updates.                                                                                                                                       |
| 1.2         | 50         | 0.0              | 0.0               | Dazzling innovation in your pocket — the iPhone thrills with every interaction.                                                                                                                                                                                                                                                                                   |
| 0.7         | 50         | 1.5              | 1.5               | Power. Precision. Elegance. The iPhone delivers more than just features — it’s a statement.                                                                                                                                                                                                                                                                       |

---

## 💬 Reflection

Changing the **temperature** significantly affected creativity. At **0.0**, the outputs were highly factual and repetitive, suitable for technical specs or documentation. Increasing it to **0.7** introduced variation and marketing flair, while **1.2** led to more dramatic, emotionally charged, and less predictable descriptions — ideal for ad copy or storytelling.

Tuning **max_tokens** controlled detail. Short outputs (50 tokens) offered punchy summaries, while 300-token results delivered rich, persuasive narratives. The **presence** and **frequency penalties** altered repetitiveness and originality — higher values promoted varied, unique phrasing and discouraged repetition, leading to more diverse and inventive descriptions even when reusing the same base prompt.
