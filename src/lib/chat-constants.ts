export const CHAT_ENDPOINT =
  "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/repetidores-chat";

export const OPEN_CHAT_EVENT = "rep-open-chat";

export function openChat(initialPrompt?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(OPEN_CHAT_EVENT, {
      detail: { prompt: initialPrompt || "" },
    })
  );
}
