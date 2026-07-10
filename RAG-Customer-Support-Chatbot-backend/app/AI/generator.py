import re
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM


MODEL_NAME = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    dtype=torch.float16 if torch.cuda.is_available() else torch.float32
)


def build_prompt(question, docs):
    if len(docs) > 0:
        reference_reply = str(docs.iloc[0]["answer"]).strip()
    else:
        reference_reply = ""

    system_msg = (
        "You are a live-chat customer support agent replying in real time on a "
        "chat widget. Reply like a person, not a letter.\n\n"
        "STRICT RULES:\n"
        "- Reply in 1 to 2 short sentences only. Never write a full paragraph.\n"
        "- Never start with 'Dear', 'Hello team', or any greeting header.\n"
        "- Never sign off with 'Best regards', 'Sincerely', 'Thank you for choosing us', etc.\n"
        "- Never use bracketed placeholders like [Customer], [Your Name], "
        "[Company Name], [Contact Information].\n"
        "- Never claim you attached, sent, or shared anything.\n"
        "- Never invent additional customer messages or list examples.\n"
        "- If you need more info, ask ONE short question at the end."
    )

    if reference_reply:
        system_msg += (
            f"\n\nA similar past reply for tone reference only (do not copy): {reference_reply}"
        )

    messages = [
        {"role": "system", "content": system_msg},
        {"role": "user", "content": question},
    ]

    return tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True,
    )


# Cuts on any label the model might use to continue a fake dialogue
_HALLUCINATED_TURN = re.compile(
    r"(?:^|\n)\s*(?:"
    r"\[(?:example|customer|agent|user|question|answer)[^\]]*\]"
    r"|(?:customer(?:\s+message)?|agent(?:\s+reply)?|question|user|assistant|example\s*\d+|q|a)\s*[:\-]"
    r")",
    re.IGNORECASE,
)

_LEAKED_TAGS = ("<|user|>", "<|system|>", "<|assistant|>", "</s>", "<s>")

_SIGNOFF = re.compile(
    r"\b(?:best regards|sincerely|kind regards|yours (?:sincerely|truly)|"
    r"thank you for choosing|thanks for choosing|regards,)",
    re.IGNORECASE,
)

_PLACEHOLDER = re.compile(r"\[[^\]\n]{1,40}\]")


def _clean_answer(text: str) -> str:
    match = _HALLUCINATED_TURN.search(text)
    if match:
        text = text[: match.start()]

    for marker in _LEAKED_TAGS:
        idx = text.find(marker)
        if idx != -1:
            text = text[:idx]

    signoff = _SIGNOFF.search(text)
    if signoff:
        text = text[: signoff.start()]

    text = _PLACEHOLDER.sub("", text)

    if text.lstrip().lower().startswith("dear "):
        parts = text.split("\n", 1)
        text = parts[1] if len(parts) > 1 else ""

    lines = text.splitlines()
    trimmed = []
    for line in lines:
        stripped = line.lstrip()
        if trimmed and stripped.startswith(("- ", "* ", "• ")):
            break
        trimmed.append(line)
    text = "\n".join(trimmed)

    return re.sub(r"\s+", " ", text).strip()


def generate_answer(prompt):
    inputs = tokenizer(
        prompt,
        return_tensors="pt",
        truncation=True,
        max_length=2048,
    )

    inputs = {k: v.to(model.device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=80,
            do_sample=False,
            repetition_penalty=1.2,
            pad_token_id=tokenizer.eos_token_id,
            eos_token_id=tokenizer.eos_token_id,
        )

    generated = outputs[0][inputs["input_ids"].shape[1]:]

    answer = tokenizer.decode(
        generated,
        skip_special_tokens=True,
    )

    return _clean_answer(answer)
