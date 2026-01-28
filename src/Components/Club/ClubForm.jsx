import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, Plus, ArrowLeft, Loader } from "lucide-react";
import * as clubService from "../../services/clubService";

function ClubForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    club_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.club_name.trim()) {
      setError("Please enter a club name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const createdClub = await clubService.create(formData);

      const clubId = createdClub?._id;
      if (!clubId) {
        navigate("/club");
        return;
      }
      navigate(`/club/${clubId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create club. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-900 text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 shadow-2xl">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-xl">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2">
                Create Your Club
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/80">
                Start your football journey and build your dream team
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="bg-green-600 p-2 sm:p-3 rounded-lg">
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl text-white">Club Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Club Name Input */}
            <div>
              <label
                htmlFor="club_name"
                className="block text-sm sm:text-base text-white mb-2 sm:mb-3"
              >
                Club Name <span className="text-red-400">*</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.club_name}
                type="text"
                name="club_name"
                id="club_name"
                placeholder="Enter your club name..."
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                disabled={loading}
              />
              <p className="mt-2 text-xs sm:text-sm text-white/50">
                Choose a unique name for your football club
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base text-red-300">{error}</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm sm:text-base text-blue-300 mb-1 sm:mb-2">
                    What happens next?
                  </h3>
                  <ul className="space-y-1 text-xs sm:text-sm text-blue-200/80">
                    <li>• You'll become the head coach of your club</li>
                    <li>• You can invite players to join your team</li>
                    <li>• Build your squad and manage your teams</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-lg border-2 border-white/20 text-white hover:bg-white/5 transition-all text-sm sm:text-base"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-6 py-3 sm:py-3.5 rounded-lg transition-all hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    Creating Club...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    Create Club
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-6 sm:mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
          <h3 className="text-base sm:text-lg text-white mb-3 sm:mb-4">
            Getting Started Tips
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-green-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">1</span>
              </div>
              <p className="text-xs sm:text-sm text-white/70">
                Create your club with a memorable name
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">2</span>
              </div>
              <p className="text-xs sm:text-sm text-white/70">
                Scout players from the player market
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">3</span>
              </div>
              <p className="text-xs sm:text-sm text-white/70">
                Build your teams and start competing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubForm;
