import { ChevronRight, Users } from "lucide-react";
import { Link } from "react-router";

export function TeamCard({ team, clubId }) {
  return (
    <Link to={`/club/${clubId}/teams/${team._id}`}>
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-2xl group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="bg-purple-500 text-white rounded-lg p-3 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white truncate">{team.team_name}</h3>
              <p className="text-white/60 text-sm">View team details</p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors flex-shrink-0" />
        </div>
      </div>
    </Link>
  );
}
