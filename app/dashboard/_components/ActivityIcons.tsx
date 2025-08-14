import { JSX } from "react";
import { FaCheck, FaComment, FaEdit, FaPaperclip, FaPlus, FaTrash, FaUserPlus, FaUserEdit, FaUndo, FaBan, FaPlay, FaFlag, FaArchive, FaCalendarAlt } from "react-icons/fa";

export const activityActionIcon: Record<string, { icon: JSX.Element; color: string }> = {
  add:        { icon: <FaPlus className="w-3 h-3" />, color: "text-blue-600" },
  attach:     { icon: <FaPaperclip className="w-3 h-3" />, color: "text-indigo-600" },
  edit:       { icon: <FaEdit className="w-3 h-3" />, color: "text-yellow-600" },
  remove:     { icon: <FaTrash className="w-3 h-3" />, color: "text-red-600" },
  comment:    { icon: <FaComment className="w-3 h-3" />, color: "text-gray-600" },
  finish:     { icon: <FaCheck className="w-3 h-3" />, color: "text-green-600" },
  invite:     { icon: <FaUserPlus className="w-3 h-3" />, color: "text-purple-600" },
  assign:     { icon: <FaUserEdit className="w-3 h-3" />, color: "text-teal-600" },
  unassign:   { icon: <FaUndo className="w-3 h-3" />, color: "text-pink-600" },
  reopen:     { icon: <FaUndo className="w-3 h-3" />, color: "text-orange-600" },
  block:      { icon: <FaBan className="w-3 h-3" />, color: "text-red-400" },
  start:      { icon: <FaPlay className="w-3 h-3" />, color: "text-green-400" },
  complete:   { icon: <FaFlag className="w-3 h-3" />, color: "text-green-700" },
  archive:    { icon: <FaArchive className="w-3 h-3" />, color: "text-gray-500" },
  reschedule: { icon: <FaCalendarAlt className="w-3 h-3" />, color: "text-yellow-500" },
  cancel:     { icon: <FaBan className="w-3 h-3" />, color: "text-red-500" },
};
