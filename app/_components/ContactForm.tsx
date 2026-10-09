"use client";

import { site } from "@/data/site";

// 문의 폼이에요.
// 지금은 Submit을 누르면 입력한 내용이 채워진 메일 앱이 열려요.
// 나중에 메일 발송 서비스(Resend, Formspree 등)를 연결하면 바로 전송되게 바꿀 수 있어요.

const fields = [
  { name: "name", label: "Name", type: "text", required: false, autoComplete: "name" },
  { name: "email", label: "E-mail", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone Number", type: "tel", required: true, autoComplete: "tel" },
] as const;

export default function ContactForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const subject = `[프로젝트 문의] ${value("name") || value("email")}`;
    const body = [
      `이름: ${value("name")}`,
      `이메일: ${value("email")}`,
      `연락처: ${value("phone")}`,
      "",
      value("message"),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {fields.map((field) => (
        <label key={field.name} className="block">
          <FieldLabel text={field.label} required={field.required} />
          <input
            name={field.name}
            type={field.type}
            required={field.required}
            autoComplete={field.autoComplete}
            className="w-full border-b border-white/20 bg-transparent py-3 text-base outline-none transition-colors focus:border-white"
          />
        </label>
      ))}

      <label className="block">
        <FieldLabel text="Content" required />
        <textarea
          name="message"
          required
          rows={5}
          placeholder="공간 유형, 위치·면적, 희망 일정, 예산 범위 등을 적어주세요."
          className="w-full resize-y border-b border-white/20 bg-transparent py-3 text-base leading-7 outline-none transition-colors placeholder:text-white/30 focus:border-white"
        />
      </label>

      <button
        type="submit"
        className="mt-2 bg-white py-5 text-xs font-medium tracking-[0.25em] text-ink transition-opacity hover:opacity-80"
      >
        SUBMIT
      </button>
    </form>
  );
}

function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <span className="flex items-center gap-2 text-[11px] tracking-[0.3em] text-white/50">
      {text.toUpperCase()}
      {required && <span className="h-1 w-1 bg-white" aria-label="필수" />}
    </span>
  );
}
