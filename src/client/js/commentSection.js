import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
let comdelBtns = document.querySelectorAll("#comdelBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const commentDelSpan = document.createElement("span");
  commentDelSpan.innerText = "Delete comment 🪓";
  commentDelSpan.id = "comdelBtn";
  commentDelSpan.className = "video__comment__comdelBtn";
  commentDelSpan.addEventListener("click", handleCommentDelete);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(commentDelSpan);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleCommentDelete = async (event) => {
  const li = event.target.parentElement;
  const {
    dataset: { id: commentId },
  } = li;
  li.remove();
  await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (comdelBtns) {
  comdelBtns.forEach((comdelBtn) => {
    comdelBtn.addEventListener("click", handleCommentDelete);
  });
}
// const deleteComment = async (req, res) => {
//   //코멘트작성자 아이디
//   //로그인유저 아이디
//   //펫치
//   // 비교

// }
