import { Box, Paper, Typography } from "@mui/material";

const Message = ({ text, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'flex-start' } mb-1 px-1  font-family-primary`}>
    <div className={`max-w-[70%] rounded-xl p-3 ${isUser ? 'bg-[#49869626]' : 'bg-[#4986964D]' }`}>
      <p>{text}</p>
    </div>
  </div>
);

export default Message;
