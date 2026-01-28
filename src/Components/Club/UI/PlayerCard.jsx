import {
  CheckCircle,
  Clock,
  User,
  XCircle,
  BadgeCheck,
  Mail,
} from "lucide-react";

export function PlayerCard({ player, status }) {
  const getStatusInfo = (status) => {
    const s = (status || "").toLowerCase();

    switch (s) {
      case "approved":
        return { color: "bg-green-500", icon: BadgeCheck, text: "Club Player" };

      case "invited":
        return { color: "bg-yellow-500", icon: Mail, text: "Invited" };

      case "active":
        return { color: "bg-green-500", icon: CheckCircle, text: "Active" };

      case "inactive":
        return { color: "bg-gray-500", icon: XCircle, text: "Inactive" };

      case "pending":
        return { color: "bg-yellow-500", icon: Clock, text: "Pending" };

      case "free_agent":
      case "free":
        return { color: "bg-blue-500", icon: User, text: "Free Agent" };

      default:
        return { color: "bg-blue-500", icon: User, text: status || "Unknown" };
    }
  };

  const statusInfo = getStatusInfo(status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-2xl">
      <div className="flex items-start gap-4">
        <div
          className={`${statusInfo.color} text-white rounded-lg p-3 flex items-center justify-center`}
        >
          <User className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white truncate mb-2">{player.username}</h3>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <StatusIcon className="w-4 h-4" />
            <span>{statusInfo.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
