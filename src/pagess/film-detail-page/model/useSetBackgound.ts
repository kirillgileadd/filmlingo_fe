import { useEffect } from "react";

export const useSetBackground = (bigPosterPath?: string) => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_API_URL || !bigPosterPath) return;

    const backgroundImage = process.env.NEXT_PUBLIC_API_URL + bigPosterPath; // Замените на путь к вашему изображению

    console.log(backgroundImage, "backgroundImage");

    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "top";
    document.body.style.backgroundRepeat = "no-repeat";

    // Создаем затемняющий слой
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.right = "0";
    overlay.style.bottom = "0";
    overlay.style.backgroundImage =
      "radial-gradient(circle, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 70%)"; // Виньетка
    overlay.style.pointerEvents = "none"; // Позволяет кликам проходить через затемненный слой
    overlay.style.zIndex = "-1"; // Убедитесь, что слой ниже содержимого

    document.body.appendChild(overlay);

    // Убираем стиль при размонтировании компонента
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.removeChild(overlay);
    };
  }, [bigPosterPath]);
};
