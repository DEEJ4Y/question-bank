const question = getParam("question");

document.getElementById("question").innerHTML = question;

const questionId = getParamAndValidateObjectId("questionId", "/subjects");
const createAnswerService = async (reqBody) => {
  try {
    const res = await fetch("/api/v1/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    if (res.status === 201) {
      window.location.href = `/subjects/questions/view/?id=${questionId}`;
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return false;
  }
};

const submitAnswer = async () => {
  const inputVal = document.getElementById("search");
  const data = await createAnswerService({
    answer: inputVal.value.split("\n").filter((q) => q.length > 0),
    searchKeywords: getKeywords(inputVal.value),
    parentId: questionId,
  });
  if (!data) {
    document.getElementById("error").innerText =
      "Oops! Something went wrong while adding your anwer. Make sure your answer is at least 3 characters long.";
  } else if (data && data.error) {
    document.getElementById("error").innerText = data.error;
  }
};

document.getElementById("add-answer-button").addEventListener("click", () => {
  submitAnswer();
});
