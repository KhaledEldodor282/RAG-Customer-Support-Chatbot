import torch
from transformers import AutoTokenizer, AutoModelForCausalLM


MODEL_NAME = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    dtype=torch.float16 if torch.cuda.is_available() else torch.float32
)

def build_prompt(question, docs):

    context = ""

    for _, row in docs.iterrows():
        context += f"""Customer: {row['question']}
Support: {row['answer']}

"""

    return f"""Context:

{context}

User Question:
{question}

Answer as the customer support agent:
"""


def generate_answer(prompt):

    inputs = tokenizer(
        prompt,
        return_tensors="pt",
        truncation=True,
        max_length=1024
    )

    inputs = {k: v.to(model.device) for k, v in inputs.items()}

    with torch.no_grad():

        outputs = model.generate(
            **inputs,

            max_new_tokens=40,

            do_sample=False,

            repetition_penalty=1.1,

            pad_token_id=tokenizer.eos_token_id,
            eos_token_id=tokenizer.eos_token_id
        )

    generated = outputs[0][inputs["input_ids"].shape[1]:]

    answer = tokenizer.decode(
        generated,
        skip_special_tokens=True
    )

    return answer.strip()