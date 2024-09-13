import {
  setDecreaseLike,
  setIncreaseLike,
} from "@src/store/Listing/listingSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import likeStyling from "./likeComponent.module.scss";

export interface ILikeComponent {
  likes: number;
  id: string;
}

export default function LikeComponent({ likes, id }: ILikeComponent) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const updateLikesOnServer = async (newLikes: number) => {
    await fetch(`http://localhost:8000/advertisements/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: newLikes }),
    });
  };

  const handleLikeClick = () => {
    const newLikeCount = liked ? likeCount - 1 : likeCount + 1;

    setLikeCount(newLikeCount);
    setLiked(!liked);

    if (liked) {
      dispatch(setDecreaseLike(1));
    } else {
      dispatch(setIncreaseLike(1));
    }

    updateLikesOnServer(newLikeCount);
  };

  return (
    <div className={likeStyling.likes}>
      <svg
        onClick={handleLikeClick}
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        style={{ cursor: "pointer", fill: liked ? "red" : "#484283" }}
      >
        <path
          fillRule="evenodd"
          d="m12.012 5.572l-1.087-1.087a5.5 5.5 0 1 0-7.778 7.778l8.839 8.839l.002-.002l.026.026l8.839-8.839a5.5 5.5 0 1 0-7.778-7.778zm-.024 12.7l4.936-4.937l1.45-1.4h.002l1.063-1.062a3.5 3.5 0 1 0-4.95-4.95L12.013 8.4l-.007-.007h-.001L9.511 5.9a3.5 3.5 0 1 0-4.95 4.95l2.54 2.54l.001-.003z"
          clipRule="evenodd"
        />
      </svg>
      {likeCount}
    </div>
  );
}
