export const fetchGroups = async () => {
    try {
      const response = await fetch("http://localhost:5000/due_groups");
      if (!response.ok) throw new Error("Error fetching groups");
      return response.json();
    } catch (error) {
      console.error("Error during fetch:", error);
      return [];
    }
  };
  
  export const createWordGroup = async () => {
    try {
      const response = await fetch("http://localhost:5000/create_word_group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Error creating group");
      return true; // 假設成功就回true，實際可依後端回傳調整
    } catch (error) {
      console.error("Error during fetch:", error);
      return false;
    }
  };