const subjectId = getParamAndValidateObjectId("subject", "/subjects");
const createQuestionService = async (reqBody) => {
  try {
    const res = await fetch("/api/v1/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    if (res.status === 201) {
      const resData = await res.json();
      window.location.href = `/subjects/questions/view/?id=${resData.data.id}`;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const submitQuestion = async () => {
  const inputVal = document.getElementById("search");
  const data = await createQuestionService({
    question: inputVal.value.split("\n").filter((q) => q.length > 0),
    searchKeywords: getKeywords(inputVal.value),
    parentId: subjectId,
  });
  if (!data) {
    document.getElementById("error").innerText =
      "Oops! Something went wrong while adding your question. Make sure your question question is at least 3 characters long.";
  } else if (data && data.error) {
    document.getElementById("error").innerText = data.error;
  }
};

document.getElementById("add-question-button").addEventListener("click", () => {
  submitQuestion();
});
