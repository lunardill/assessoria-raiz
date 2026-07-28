import sys
from pathlib import Path
from faster_whisper import WhisperModel


def format_timestamp(seconds: float) -> str:
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    return f"{h:02d}:{m:02d}:{s:02d}"


def transcrever(audio_path: str, model_size: str = "large-v3"):
    audio_path = Path(audio_path)
    output_path = audio_path.with_suffix(".txt")

    model = WhisperModel(model_size, device="cuda", compute_type="float16")
    segments, info = model.transcribe(str(audio_path), language="pt", vad_filter=True)

    with open(output_path, "w", encoding="utf-8") as f:
        for segment in segments:
            line = f"[{format_timestamp(segment.start)}] {segment.text.strip()}"
            print(line)
            f.write(line + "\n")

    print(f"\nTranscrição salva em: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python transcrever.py <caminho_audio> [modelo]")
        sys.exit(1)
    modelo = sys.argv[2] if len(sys.argv) > 2 else "large-v3"
    transcrever(sys.argv[1], modelo)
