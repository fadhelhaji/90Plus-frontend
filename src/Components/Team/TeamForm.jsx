import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as clubService from "../../services/clubService";
import { Shield, ArrowLeft, Save } from "lucide-react";

function TeamForm() {
  const { id: clubId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    team_name: "",
    formation: "",
    players: [],
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await clubService.createTeam(clubId, formData);
      navigate(`/club/${clubId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-900 text-white py-3 sm:py-4 px-4 sm:px-6 shadow-2xl flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 sm:p-3 rounded-full shadow-xl">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl">Create Team</h1>
            </div>

            <button
              type="button"
              onClick={() => navigate(`/club/${clubId}`)}
              className="bg-white/15 hover:bg-white/20 border border-white/25 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-1.5 text-xs sm:text-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form Content - Centered */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-xl space-y-4 sm:space-y-6"
          >
            {/* Team Name Field */}
            <div className="space-y-2">
              <label className="text-white text-sm sm:text-base block">
                Team Name
              </label>
              <input
                type="text"
                name="team_name"
                value={formData.team_name}
                onChange={handleChange}
                required
                className="w-full border border-white/20 bg-white/10 text-white p-2.5 sm:p-3 rounded-lg outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 placeholder-white/40 text-sm sm:text-base"
                placeholder="Enter team name"
              />
            </div>

            {/* Formation Field
            <div className="space-y-2">
              <label className="text-white text-sm sm:text-base block">
                Formation
              </label>
              <input
                type="text"
                name="formation"
                value={formData.formation}
                onChange={handleChange}
                required
                className="w-full border border-white/20 bg-white/10 text-white p-2.5 sm:p-3 rounded-lg outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 placeholder-white/40 text-sm sm:text-base"
                placeholder="e.g. 4-4-2, 4-3-3"
              />
            </div> */}

            {/* Submit Button */}
            <div className="pt-2 sm:pt-4">
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors shadow-lg"
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                Create Team
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeamForm;
