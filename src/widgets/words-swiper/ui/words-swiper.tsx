"use client";

import { Button } from "@/src/shared/components/ui/button";
import { motion, PanInfo } from "framer-motion";
import { CheckIcon, LanguagesIcon, LightbulbIcon, XIcon } from "lucide-react";
import { FC, useState } from "react";

type Card = {
  id: number;
  title: string;
  description: string;
};

const cards: Card[] = [
  { id: 1, title: "Card 1", description: "This is card 1" },
  { id: 2, title: "Card 2", description: "This is card 2" },
  { id: 3, title: "Card 3", description: "This is card 3" },
];

type WordsSwiperProps = {
  className?: string;
};

export const WordsSwiper: FC<WordsSwiperProps> = ({}) => {
  const [cardList, setCardList] = useState(cards);
  const [rotate, setRotate] = useState<boolean>(false); // Состояние для поворота

  const handleSwipe = (cardId: number, direction: "left" | "right") => {
    console.log(`Card ${cardId} swiped ${direction}`);
    setRotate(false);
    setCardList((prev) => prev.filter((card) => card.id !== cardId));
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    cardId: number
  ) => {
    if (info.offset.x > 150) {
      handleSwipe(cardId, "right");
    } else if (info.offset.x < -150) {
      handleSwipe(cardId, "left");
    }
  };

  const handleDrag = () => {};

  const handleReturnAnimationComplete = () => {};

  const handleRotateClick = () => {
    setRotate((prev) => !prev); // Переключаем состояние для поворота
  };

  return (
    <div className="relative flex items-center justify-center h-[500px]">
      {cardList.map((card, index) => (
        <motion.div
          key={card.id}
          onDragEnd={(event, info) => handleDragEnd(event, info, card.id)}
          onDrag={() => handleDrag()}
          initial={{ scale: 1, rotateY: 0, x: 0 }}
          style={{
            zIndex: cardList.length - index,
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          animate={{
            scale: index === cardList.length - 1 ? 1 : 0.95,
            opacity: 1,
          }}
          whileDrag={{
            scale: 1.05,
            opacity: 0.8,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            rotateY: 10,
            x: 0,
          }}
          transition={{
            rotateY: { type: "spring", stiffness: 300, damping: 20 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
            x: { type: "spring", stiffness: 300, damping: 30 },
          }}
          className="absolute w-80 h-96 bg-card shadow-lg rounded-xl flex flex-col items-center justify-center p-3 border"
          onAnimationComplete={handleReturnAnimationComplete}
        >
          <Button
            className="p-6 ml-auto align-top [&_svg]:w-6 [&_svg]:h-6"
            size="icon"
            variant="outline"
            onClick={handleRotateClick}
          >
            <LanguagesIcon />
          </Button>
          <motion.div
            className="absolute flex justify-center items-center p-3"
            style={{
              transform:
                rotate && index === 0 ? "rotateY(360deg)" : "rotateY(0deg)", // Анимация поворота
              transition: "transform 0.5s",
            }}
          >
            {rotate && index === 0 ? (
              <p className="text-2xl font-bold text-foreground">
                {card.description}
              </p>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">
                  {card.title}
                </h2>
              </div>
            )}
          </motion.div>
          <div className="flex justify-between w-full mt-auto items-center">
            <Button
              className="[&_svg]:w-8 [&_svg]:h-8"
              onClick={() => handleSwipe(card.id, "left")}
              size="circle"
            >
              <XIcon className="flex-shrink-0" size={30} />
            </Button>
            <Button
              className="[&_svg]:w-8 [&_svg]:h-8"
              size="circle"
              variant="accent"
            >
              <LightbulbIcon size={30} />
            </Button>
            <Button
              className="[&_svg]:w-8 [&_svg]:h-8"
              onClick={() => handleSwipe(card.id, "right")}
              size="circle"
            >
              <CheckIcon size={30} />
            </Button>
          </div>
        </motion.div>
      ))}
      <div>Конец, ералаш</div>
    </div>
  );
};
