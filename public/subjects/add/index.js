const createSubjectService = async (reqBody) => {
  try {
    const res = await fetch("/api/v1/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    if (res.status === 201) {
      window.location.href = "/subjects";
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return false;
  }
};

const submitName = async () => {
  const inputVal = document.getElementById("search");
  const data = await createSubjectService({
    name: inputVal.value,
    searchKeywords: getKeywords(inputVal.value),
  });
  if (!data) {
    document.getElementById("error").innerText =
      "Oops! Something went wrong while adding your subject. Make sure your subject name is at least 3 characters long.";
  } else if (data && data.error) {
    document.getElementById("error").innerText = data.error;
  }
};

document.getElementById("add-subject-button").addEventListener("click", () => {
  submitName();
});
