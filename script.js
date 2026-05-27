// 질문 리스트
const questions = [
  "친구 이름은 무엇인가요?",
  "관계 기간은 얼마나 되나요?",
  "서로의 첫인상은 어땠나요?",
  "함께 여행 가고 싶은 곳은 어디인가요?",
  "마지막으로 꼭 전하고 싶은 말은 무엇인가요?"
];

let currentIndex = 0;
let answers = [];

// 카드 표시 함수
function showQuestion(index) {
  const cardContainer = document.getElementById("card-container");
  if (cardContainer) {
    cardContainer.innerHTML = `
      <div class="card">
        <p>${questions[index]}</p>
        <input type="text" id="answer${index}" placeholder="답변을 입력하세요">
      </div>
    `;
  }
}

// 다음 버튼 이벤트
const nextBtn = document.getElementById("next-btn");
if (nextBtn) {
  nextBtn.addEventListener("click", function() {
    const input = document.getElementById(`answer${currentIndex}`);
    if (input) answers[currentIndex] = input.value;

    if (currentIndex < questions.length - 1) {
      currentIndex++;
      showQuestion(currentIndex);
    } else {
      generateMessage();
    }
  });
}

// AI 멘트 생성 (간단 버전)
function generateMessage() {
  const friendName = answers[0] || "친구";
  const duration = answers[1] || "짧지 않은 시간";
  const impression = answers[2] || "좋은 인상";
  const travel = answers[3] || "어딘가";
  const finalWords = answers[4] || "고마워";

  const message = `${friendName}와의 ${duration} 동안 ${impression}을 받았고, 
  함께 ${travel}에 가고 싶어. 마지막으로 꼭 하고 싶은 말은 "${finalWords}"야.`;

  const aiMessage = document.getElementById("aiMessage");
  if (aiMessage) aiMessage.innerText = message;
}

// 첫 질문 표시
showQuestion(currentIndex);
