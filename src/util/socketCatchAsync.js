/**
 * Wraps socket event handlers to catch async errors
 * @param {Function} fn - The socket event handler function
 */
const socketCatchAsync = (fn) => {
  return async (socket, io, payload) => {
    try {
      return await fn(socket, io, payload);
    } catch (error) {
      // সকেট এরর সাধারণত কনসোলে লগ করা হয় কারণ এটি HTTP এরর নয়
      console.error("🔌 Socket Event Error 🔌:", error);
      
      // চাইলে এখানে সকেটের মাধ্যমে ক্লায়েন্টকে এরর মেসেজ পাঠানো যায়
      // socket.emit("error", { message: error.message });
    }
  };
};

export default socketCatchAsync;